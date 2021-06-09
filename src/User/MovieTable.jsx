import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, message, Rate, Statistic, Select, Button } from 'antd';
import axiosInst from '../initAxios.js';
import { useHistory, useRouteMatch } from "react-router-dom";
import SearchForm from "./SearchForm";
import RateModal from "./RateModal";
import RecomendDrawer from './RecomendDrawer';
import { 
  HeartTwoTone,
  CheckCircleTwoTone,
  ClearOutlined,
  FallOutlined, 
  RiseOutlined,
  StarOutlined,
} from '@ant-design/icons';
import '../App.less'

const { Option } = Select;


const MovieTable = ({ operation }) => {

  const [movies, setmovies] = useState([]);
  const [recomend, setrecomend] = useState([]);
  let history = useHistory();
  const path = useRouteMatch();

  /**
   * get 请求获取所有电影信息
   */
  const requestMoviesInfo = () => {
    const user_id = localStorage.getItem("user_id");

    axiosInst
      .get(`/user/${user_id}`)
      .then((res) => {
        let moviesList = res;
        moviesList = moviesList.map((curMovie) => {
          // 将 type 字符串类型按空格转换为字符串数组
          curMovie.type = curMovie.type.split(' ');  
          // 为表格的每一行设定唯一的 key，否则会有 warning
          curMovie.key = curMovie.id;   
          curMovie.show = true;
          return curMovie;
        })
        setmovies(moviesList);
      });
  }

   const requestRecomendInfo = () => {
    axiosInst
      .get("/movies/recomend")
      .then((res) => {
        let moviesList = res;
        moviesList = moviesList.map((curMovie) => {
        // 将 type 字符串类型按空格转换为字符串数组
        curMovie.type = curMovie.type.split(' ');  
        // 为表格的每一行设定唯一的 key，否则会有 warning
        curMovie.key = curMovie.id;   
        curMovie.show = true;
        return curMovie;
        })
        setrecomend(moviesList);
      })
  }

  /**
   * path 改变，执行 requestMoviesInfo 函数
   */
  useEffect(() => {
    requestMoviesInfo();
    requestRecomendInfo();
  }, [path]);

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
   * 当用户点击搜索按钮时
   * @param {object} movie 子组件抛出的存储当前用户键入的待搜索信息的对象
   */
   const handleSearch = (movie) => {
    const user_id = localStorage.getItem("user_id");
    axiosInst
      .post("/user/search", { 
        user_id: user_id,
        movie: movie,
      })
      .then((res) => {
        res = res.map((curMovie) => {
          curMovie.type = curMovie.type.split(' '); 
          curMovie.key = curMovie.id;   
          return curMovie;
        })
        setmovies(res);
      })
  }

  /**
   * 当点击重置按钮时
   */
  const handleClear = () => {
    let moviesCopy = Array.from(movies);
    moviesCopy = moviesCopy.map((curMovie) => {
      curMovie.show = true;
      return curMovie;
    })
    setmovies(moviesCopy);
  }

  /**
   * 当用户点击评分对话框的确定按钮时
   * @param {boolean} isEdit 此次点击按钮是否是编辑之后的点击
   * @param {number} id 电影 id
   * @param {boolean} see 电影是否看过的状态
   * @param {number} rate 电影评分
   */
  const handleSeeAndRate = (isEdit, id, see, rate) => {
    const user_id = Number(localStorage.getItem("user_id"));
    if(!user_id) {
      message.info("您尚未登录，请先登录！");
      history.push("/sign/in");
    }
    if(isEdit) {
      axiosInst
        .patch("/user/see/rate", {
          user_id: user_id,
          movie_id: id,
          rate: rate
        })
        .then(() => {
          requestMoviesInfo();
        }) 
    }
    else {
      axiosInst
        .post("/user/see", {
          "user_id": user_id,
          "movie_id": id,
          "see": see,
          "rate": rate
        })
        .then(() => {
          requestMoviesInfo();
        }) 
    }
  };


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
      key: 'seeTotal',
      dataIndex: 'seeTotal',
      render: text => (
        <Statistic value={text} prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />} style={{zoom: "60%"}}/>
      ),
    },
    {
      title: '评分',
      key: 'rateAvg',
      dataIndex: 'rateAvg',
      render: (text, record) => (
        (record.seeTotal) ?
        (<Rate value={text} disabled allowHalf style={{zoom: "65%"}}/>)
        :
        (<StarOutlined />)
      ),
    },
    {
      title: '喜欢',
      key: 'likeTotal',
      dataIndex: 'likeTotal',
      render: text => (
        <Statistic value={text} prefix={<HeartTwoTone twoToneColor="red"/>} style={{zoom: "60%"}}/>
      ),
    },
    {
      title: '标记',
      key: 'operation',
      render: (text, record) => (
        <Space size="middle">
          <RateModal 
            isSee={text.see} 
            onClickOk={(rate, isEdit) => handleSeeAndRate(isEdit, text.id, text.see, rate)} 
            originalRate={text.rate}
          />
          <HeartTwoTone 
            twoToneColor={(text.like) ? "red" : "lightgrey"}
            style={{fontSize: "130%"}}
            onClick={() => handleToggleLike(record.id, text.like)}
          />
        </Space>
      ),
    },
  ];

  const [selectedValue, setselectedValue] = useState("");
  const handleClearSelect = () => {
    setselectedValue("");
    requestMoviesInfo();
  }

  const handleSortAsc = () => {
    const user_id = Number(localStorage.getItem("user_id"));
    axiosInst
      .post("/user/sort", {
        user_id: user_id,
        orderName: selectedValue,
        type: "ASC"
      })
      .then((res) => {
        res = res.map((curMovie) => {
          curMovie.type = curMovie.type.split(' '); 
          curMovie.key = curMovie.id;   
          return curMovie;
        })
        setmovies(res);
      })
  }

  const handleSortDesc = () => {
    const user_id = Number(localStorage.getItem("user_id"));
    axiosInst
      .post("/user/sort", {
        user_id: user_id,
        orderName: selectedValue,
        type: "DESC"
      })
      .then((res) => {
        res = res.map((curMovie) => {
          curMovie.type = curMovie.type.split(' '); 
          curMovie.key = curMovie.id;   
          return curMovie;
        })
        setmovies(res);
      })
  }


  return (
    <>
      <SearchForm onClickSubmit={handleSearch} isVisible={operation === "search" ? true : false} onClickClear={() => handleClear()}/>

      <div style={{margin: "30px", display: (operation === "sort") ? "inherit" : "none" }}>
        <Select value={selectedValue} style={{ width: 300}} onSelect={(value) => setselectedValue(value)}>
          <Option value="seeTotal">看过人数</Option>
          <Option value="likeTotal">喜欢人数</Option>
          <Option value="rateAvg">评分</Option>
        </Select>
        <Button type="primary" icon={<RiseOutlined />} shape="round" style={{marginLeft: "30px"}} onClick={handleSortAsc}>升序</Button>
        <Button type="primary" icon={<FallOutlined />} shape="round" style={{marginLeft: "30px"}} onClick={handleSortDesc}>降序</Button>
        <Button type="primary" icon={<ClearOutlined />} shape="round" ghost style={{marginLeft: "30px"}} onClick={handleClearSelect}>重置</Button>
      </div>

      <h2 style={{marginTop: (operation === "home") ? "30px" : "inherit"}}>电影信息列表</h2>
      <RecomendDrawer isVisible={operation === "home" ? true : false} recomend={recomend} />
      <Table 
        columns={columns} 
        dataSource={movies} 
        rowKey={record => record.id}
        pagination={{
          position: ["topLeft"], 
          showSizeChanger: true, 
          defaultPageSize: 5, 
          pageSizeOptions: [5, 10, 20, 50, 100], 
          total: (movies.filter((curMovie) => curMovie.show === true).length),
          showTotal: ((total) => `Total ${total} Movies`),
          showQuickJumper: true
        }}  
        style={{marginTop: 20}}
      />
    </>
  )
}


export default MovieTable;