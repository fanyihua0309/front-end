import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { Table, Tag, Space } from 'antd';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
// import { CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axiosInst from '../initAxios.js';


const MovieTable = () => {

  const [movies, setmovies] = useState([]);

  let { path } = useRouteMatch();

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
   * url 变化时重新请求获取所有的电影信息
   */
  useEffect(() => {
    requestMoviesInfo();
  }, [path])

  const columns = [
    {
      title: '电影名称',
      dataIndex: 'name',
      key: 'name',
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
      title: '看过',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
          />
        </Space>
      ),
    },
    {
      title: '喜欢',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked={false}
          />
        </Space>
      ),
    },
  ];
  

  return (
    <Table columns={columns} dataSource={movies} rowKey={record => record.id}/>
  )
}

export default MovieTable;