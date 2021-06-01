import { Table, Tag, Space, Button } from 'antd';
import axiosInst from '../initAxios.js';
import React, { useEffect, useState } from 'react';
import EditModal from './EditModal.jsx';
import SearchForm from './SearchForm.jsx';


const MovieTable = ({ operation }) => {
  const [movies, setmovies] = useState([]);

  /**
   * get 请求获取所有电影信息
   */
  const requestMoviesInfo = () => {
    axiosInst
      .get("/movies")
      .then((res) => {
        let moviesList = res;
        moviesList = moviesList.map((curMovie) => {
          // 将 type 字符串类型按空格转换为字符串数组
          curMovie.type = curMovie.type.split(' ');  
          // 为表格的每一行设定唯一的 key，否则会有 warning
          curMovie.key = curMovie.id;   
          return curMovie;
        })
        setmovies(moviesList);
      })
  }

  /**
   * 组件挂载后执行函数
   */
  useEffect(() => {
    requestMoviesInfo();
  }, [])

  /**
   * 当用户点击删除按钮时
   * @param {number} id 待删除的电影的 id 
   */
  const handleDelete = (id) => {
    axiosInst
      .delete(`/movies/delete/${id}`)
      .then(() => {
        requestMoviesInfo();
      })
  }

  /**
   * 当用户点击编辑按钮时
   * @param {object} movie 子组件抛出的存储当前用户键入的编辑之后的信息的对象
   */
  const handleEdit = (movie) => {
    console.log(movie);
    const params = JSON.stringify(movie);
    axiosInst
      .patch("/movies/edit", { params })
      .then(() => {
        requestMoviesInfo();
      })
  }

  /**
   * 当用户点击搜索按钮时
   * @param {object} movie 子组件抛出的存储当前用户键入的待搜索信息的对象
   */
  const handleSearch = (movie) => {
    const params = JSON.stringify(movie);
    axiosInst
      .post("/movies/search", { params })
      .then((res) => {
        res = res.map((curMovie) => {
          // curMovie.show = true;
          curMovie.type = curMovie.type.split(' '); 
          curMovie.key = curMovie.id;   
          return curMovie;
        })
        setmovies(res);
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
          <EditModal originalMovie={record} isButtonVisible={(operation === "edit") ? true : false} onClickSubmit={handleEdit}/>
          <Button 
            type="primary" 
            onClick={() => handleDelete(record.id)} 
            style={{display: (operation === "delete") ? "inherit" : "none"}}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];
  
  /**
   * 当传入的 operation 为 null 时不显示操作那一栏
   * @returns 表格的列组成的对象数组
   */
  const setColumns = () => {
    if(operation === "null") {
      columns.pop();
    }
    return columns;
  }

  return (
    <>
    <SearchForm onClickSubmit={handleSearch} isVisible={(operation === "search") ? true: false}/>
    <Table 
      columns={setColumns()} 
      dataSource={movies} 
      pagination={{position: ["topLeft"], pageSize: 5, showQuickJumper: true}} 
      rowKey="id" 
    />
    </>
  )
}


export default MovieTable;