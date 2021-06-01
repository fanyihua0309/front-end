import { Table, Tag, Space, Button, message } from 'antd';
import axiosInst from '../initAxios.js';
import React, { useEffect, useState } from 'react';
import EditModal from './EditModal.jsx';
import SearchForm from './SearchForm.jsx';
import { CloseOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useRouteMatch } from "react-router-dom";


/**
 * 展示电影基本信息的组件
 * @param {string} operation 显示当前组件的功能
 * @returns 
 */
const MovieTable = ({ operation }) => {
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

  /**
   * 当用户点击删除按钮时
   * @param {Array} idList 待删除的电影的 id 集合
   */
  const handleDelete = (idList) => {
    axiosInst
      .delete(`/movies/delete/${idList}`)
      .then(() => {
        message.success("删除电影信息成功！");
        requestMoviesInfo();
      })
  }

  /**
   * 当用户点击编辑按钮时
   * @param {object} movie 子组件抛出的存储当前用户键入的编辑之后的信息的对象
   */
  const handleEdit = (movie) => {
    const params = JSON.stringify(movie);
    axiosInst
      .patch("/movies/edit", { params })
      .then(() => {
        message.success("编辑电影信息成功！");
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
          <EditModal originalMovie={record} isButtonVisible={(operation === "edit") ? true : false} onClickSubmit={handleEdit}/>
          <Button 
            type="primary" 
            onClick={() => handleDelete([record.id])} 
            style={{display: (operation === "delete") ? "inherit" : "none"}}
            shape="circle"
            danger
            ghost
            icon={<CloseOutlined />}
            size="small"
          />
        </Space>
      ),
    },
  ];
  
  /**
   * 当传入的 operation 为 null 或 search 时不显示操作那一栏
   * @returns 表格的列组成的对象数组
   */
  const setColumns = () => {
    if(operation === "null" || operation === "search") {
      columns.pop();
    }
    return columns;
  }

  const [isButtonDisabled, setisButtonDisabled] = useState(true);   // 是否禁用批量删除按钮
  const [selectedRowKeys, setselectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);

    // 当没有任何行被选中时，禁用批量删除按钮
    if(selectedRowKeys.length > 0) {
      setisButtonDisabled(false);
    }
    else {
      setisButtonDisabled(true);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
    ]
  };


  // 删除功能显示表格多选行功能，其余不显示
  return (
    (operation === "delete") ?
    (
      <>
        <Button 
          type="primary" 
          icon={<CloseCircleOutlined />} 
          danger
          shape="round"
          style={{display: (operation === "delete") ? "inherit": "none"}}
          disabled={isButtonDisabled}
          onClick={() => handleDelete(selectedRowKeys)}
        >
          批量删除
        </Button>
        <Table 
          rowSelection={rowSelection}
          rowKey={record => record.id}
          columns={setColumns()} 
          dataSource={movies} 
          pagination={{
            position: ["topLeft"], 
            showSizeChanger: true, 
            defaultPageSize: 5, 
            pageSizeOptions: [5, 10, 20, 50, 100], 
            total: `${movies.length}`,
            showTotal: ((total) => `Total ${total} Items`),
            showQuickJumper: true
          }} 
        />
      </>
    )
    :
    (
      <>
        <SearchForm onClickSubmit={handleSearch} isVisible={(operation === "search") ? true: false}/>
        <Button 
          type="primary" 
          icon={<CloseCircleOutlined />} 
          danger
          style={{display: (operation === "delete") ? "inherit": "none"}}
          onClick={() => handleDelete(selectedRowKeys)}
        >
          批量删除
        </Button>
        <Table 
          rowKey={record => record.id}
          columns={setColumns()} 
          dataSource={movies} 
          pagination={{
            position: ["topLeft"], 
            showSizeChanger: true, 
            defaultPageSize: 5, 
            pageSizeOptions: [5, 10, 20, 50, 100], 
            total: `${movies.length}`,
            showTotal: ((total) => `Total ${total} Items`),
            showQuickJumper: true
          }}  
        />
      </>
    )
  )


}
  
export default MovieTable;