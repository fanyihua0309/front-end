import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, message } from 'antd';
import axiosInst from '../initAxios.js';
import { useHistory } from "react-router-dom";
// import { Switch } from 'antd';
import { 
  // CloseOutlined, 
  // CheckOutlined, 
  // HeartOutlined, 
  // HeartFilled,
  // StarFilled,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  HeartTwoTone
} from '@ant-design/icons';



const MovieTable = () => {

  const [movies, setmovies] = useState([]);
  let history = useHistory();

  /**
   * get 请求获取所有电影信息
   */
  const requestMoviesInfo = () => {
    const user_id = localStorage.getItem("user_id");

    axiosInst
      .get(`/movies/${user_id}`)
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
      });
  }

  /**
   * 组件挂载后，执行 requestMoviesInfo 函数
   */
  useEffect(() => {
    requestMoviesInfo();
  }, []);

  /**
   * 当用户点击喜欢/取消喜欢图标时
   * @param {number} id 被标记的电影的 id
   * @param {boolean} like 用户点击之前喜欢的状态
   */
  const handleToggleLike = (id, like) => {
    const user_id = localStorage.getItem("user_id");
    if(!user_id) {
      message.info("您尚未登录，请先登录！");
      history.push("/sign/in");
    }
    axiosInst
      .post("/user/like", {
        "user_id": user_id,
        "movie_id": id,
        "like": like,
      })
      .then(() => {
        requestMoviesInfo();
      }) 
  }

  /**
   * 当用户点击看过/取消看过图标时
   * @param {number} id 被标记的电影的 id
   * @param {boolean} like 用户点击之前看过的状态
   */
  const handleToggleSee = (id, see) => {
    const user_id = localStorage.getItem("user_id");
    if(!user_id) {
      message.info("您尚未登录，请先登录！");
      history.push("/sign/in");
    }
    axiosInst
      .post("/user/see", {
        "user_id": user_id,
        "movie_id": id,
        "see": see,
      })
      .then(() => {
        requestMoviesInfo();
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
      title: 'See/Like',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          {/* <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={text.see}
            onChange={() => handleToggleSee(record.id, text.see)}
          /> */}
          { 
            (text.see) ?
            (
              <CheckCircleTwoTone 
                twoToneColor="#52c41a" 
                style={{fontSize: "150%"}} 
                onClick={() => handleToggleSee(record.id, text.see)}
              />
            )
            :
            (
              <CloseCircleTwoTone 
                twoToneColor="lightgrey" 
                style={{fontSize: "150%"}} 
                onClick={() => handleToggleSee(record.id, text.see)}
              />
            )
          }
          {/* <HeartFilled 
            style={{color: (text.like) ? "red" : "lightgrey", fontSize: "150%"}} 
            onClick={() => handleToggleLike(record.id, text.like)}
          />           */}
          <HeartTwoTone 
            twoToneColor={(text.like) ? "red" : "lightgrey"}
            style={{fontSize: "150%"}}
            onClick={() => handleToggleLike(record.id, text.like)}
          />     
        </Space>
      ),
    },
  ];
  

  return (
    <Table 
      columns={columns} 
      dataSource={movies} 
      rowKey={record => record.id}
      pagination={{
        position: ["topLeft"], 
        showSizeChanger: true, 
        defaultPageSize: 5, 
        pageSizeOptions: [5, 10, 20, 50, 100], 
        total: `${movies.length}`,
        showTotal: ((total) => `Total ${total} Movies`),
        showQuickJumper: true
      }}  
    />
  )
}


export default MovieTable;