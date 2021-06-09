import { Comment, Tooltip, List, Rate, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from "react";
import axiosInst from '../initAxios.js';
import { 
  HeartTwoTone,
  TagTwoTone,
  StarTwoTone,
  CheckCircleTwoTone,
  UserOutlined,
  BankTwoTone,
  CrownTwoTone
} from '@ant-design/icons';
import "../App.less";


const MarkHistory = ({ show, user_nickname }) => {

  const [likeRecord, setlikeRecord] = useState([]);
  const [seeRecord, setseeRecord] = useState([]);

  const requestUserLike = () => {
    const user_id = Number(localStorage.getItem("user_id"));
    axiosInst
      .get(`/user/mark/like/${user_id}`)
      .then((res) => {
        // setlikeRecord(res);
        let moviesList = res;
        moviesList = moviesList.map((curMovie) => {
        // 将 type 字符串类型按空格转换为字符串数组
        curMovie.type = curMovie.type.split(' ');  
        // 为表格的每一行设定唯一的 key，否则会有 warning
        curMovie.key = curMovie.id;   
        curMovie.show = true;
        return curMovie;
        })
        setlikeRecord(moviesList);
      })
  }

  const requestUserSee = () => {
    const user_id = Number(localStorage.getItem("user_id"));
    axiosInst
      .get(`/user/mark/see/${user_id}`)
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
        setseeRecord(moviesList);
      })
  }
  
  useEffect(() => {
    requestUserLike();
    requestUserSee();
  }, [])

  const dataLike = [];
  for(let i = 0; i < likeRecord.length; i++) {
    const children = {
      author: user_nickname,
      avatar: (<UserOutlined />),
      content: (
        <>
          <HeartTwoTone twoToneColor="red"/>
          {likeRecord[i].name} ({likeRecord[i].date}) <br />
          <BankTwoTone /> {likeRecord[i].area} <br />
          <CrownTwoTone /> 导演: {likeRecord[i].director} <br />
          <StarTwoTone /> 主演: {likeRecord[i].starring} <br />
          <TagTwoTone />
          {
            <>
              {likeRecord[i].type.map(tag => {
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
          }
        </>
      ),
      datetime: (
        <Tooltip title={likeRecord[i].create_time}>
          <span>{moment(likeRecord[i].create_time).fromNow()}</span>
        </Tooltip>
      ),
    }
    dataLike.push(children);
  }

  const dataSee = [];
  for(let i = 0; i < seeRecord.length; i++) {
    const children = {
      author: user_nickname,
      avatar: (<UserOutlined />),
      content: (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
          {seeRecord[i].name} ({seeRecord[i].date}) <br />
          <Rate value={seeRecord[i].rate} disabled style={{zoom: "75%"}}/> <br />
          <BankTwoTone /> {seeRecord[i].area} <br />
          <CrownTwoTone /> 导演: {seeRecord[i].director} <br />
          <StarTwoTone /> 主演: {seeRecord[i].starring} <br />
          <TagTwoTone />
          {
            <>
              {seeRecord[i].type.map(tag => {
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
          }
        </>
      ),
      datetime: (
        <Tooltip title={seeRecord[i].create_time}>
          <span>{moment(seeRecord[i].create_time).fromNow()}</span>
        </Tooltip>
      ),
    }
    dataSee.push(children);
  }


  return (
    <>
      <List
        className="comment-list"
        header={`共 ${dataLike.length} 条记录`}
        itemLayout="horizontal"
        dataSource={dataLike}
        style={{display: show === "like" ? "inherit" : "none"}}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />

      <List
        className="comment-list"
        header={`共 ${dataSee.length} 条记录`}
        itemLayout="horizontal"
        dataSource={dataSee}
        style={{display: show === "see" ? "inherit" : "none"}}
        renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
        )}
      />

    </>
  )
}

export default MarkHistory;