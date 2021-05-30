import { Table, Tag, Space, Button } from 'antd';
import axiosInst from '../initAxios.js';
import React, { useEffect, useState } from 'react';
import EditModal from './EditModal.jsx';


const MovieTable = () => {
  const [movies, setmovies] = useState([]);

  const requestMoviesInfo = () => {
    axiosInst
      .get("/movies")
      .then((res) => {
        let moviesList = res;
        moviesList = moviesList.map((curMovie) => {
          // 处理 date 类型，截取前10位
          curMovie.date = curMovie.date.slice(0, 10);
          // 将 type 字符串类型按空格转换为字符串数组
          curMovie.type = curMovie.type.split(' ');   
          return curMovie;
        })
        setmovies(moviesList);
      })
  }

  useEffect(() => {
    requestMoviesInfo();
  }, [])

  const handleDelete = (id) => {
    axiosInst
      .delete(`/movies/delete/${id}`)
      .then(() => {
        requestMoviesInfo();
      })
  }

  const columns = [
    {
      title: '电影名称',
      dataIndex: 'name',
      key: 'name',
      // render: text => <a>{text}</a>,
    },
    {
      title: '上映日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '国家地区',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '导演',
      dataIndex: 'director',
      key: 'director',
    },
    {
      title: '主演',
      dataIndex: 'starring',
      key: 'starring',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          {/* <a>Invite {record.name}</a>
          <a>Delete</a> */}
          {/* <Button type="primary">编辑</Button> */}
          <EditModal />
          <Button type="primary" onClick={() => handleDelete(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];
  

  return (
    <Table 
      columns={columns} 
      dataSource={movies} 
      pagination={{position: ["topLeft"], pageSize: 10, showQuickJumper: true}} 
      rowKey="id" 
    />
  )
}

export default MovieTable;