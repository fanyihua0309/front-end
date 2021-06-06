import { List, Avatar, Space, Tag, Rate } from 'antd';
import React, { useEffect, useState } from 'react';
import axiosInst from '../initAxios.js';
import { 
  MessageOutlined, 
  LikeOutlined, 
  StarOutlined,
  StarTwoTone,
  TagsTwoTone,
  TagsFilled,
  TagsOutlined,
  SendOutlined, 
  EyeOutlined,
  LikeTwoTone,
  HeartTwoTone,
  EyeTwoTone,
  CheckCircleTwoTone,
} from '@ant-design/icons';

const MovieList = () => {
  const [movies, setmovies] = useState([]);

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
          curMovie.show = true;
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


  const listData = [];
  for (let i = 0; i < movies.length; i++) {
    listData.push({
      // href: 'https://ant.design',
      title: `${movies[i].name} (${movies[i].date})`,
      avatar: <StarTwoTone style={{zoom: "130%"}}/>,
      description: (
        <>
          <HeartTwoTone twoToneColor="red" /> {movies[i].likeTotal} 
          / <CheckCircleTwoTone twoToneColor="#52c41a" /> {movies[i].seeTotal} 
          / {movies[i].seeTotal ? 
            (<Rate value={movies[i].rateAvg} disabled allowHalf style={{zoom: "65%"}}/>)
           :
           (<span>暂无评分数据</span>)}
        </>
      ),
      content: (
        <>
          <SendOutlined />{movies[i].area} <br />
          <StarOutlined /> 导演: {movies[i].director} / 主演: {movies[i].starring} <br />
          <TagsOutlined />
          <>
            {movies[i].type.map(tag => {
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
        </>
      ),
    });
  }

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <List
        itemLayout="vertical"
        size="large"
        // bordered="true"
        style={{
          marginLeft: "300px",
          width: "700px"
        }}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} key="list-vertical-like-o" />,
              // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                src="https://img2.doubanio.com/view/photo/m/public/p510861873.webp"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
  )
}

export default MovieList;