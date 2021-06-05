import { Comment, Tooltip, List, Rate } from 'antd';
import moment from 'moment';
import { useEffect, useState } from "react";
import axiosInst from '../initAxios.js';
import { 
  HeartTwoTone,
  TagTwoTone,
  StarTwoTone,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import "../App.less";


const MarkHistory = () => {

  const [likeRecord, setlikeRecord] = useState([]);
  const [seeRecord, setseeRecord] = useState([]);
  const [user_nickname, setuser_nickname] = useState("");

  const requestUserLike = () => {
    const user_id = Number(localStorage.getItem("user_id"));
    axiosInst
      .get(`/user/mark/like/${user_id}`)
      .then((res) => {
        setlikeRecord(res);
      })
  }

  const requestUserSee = () => {
    const user_id = Number(localStorage.getItem("user_id"));
    axiosInst
      .get(`/user/mark/see/${user_id}`)
      .then((res) => {
        setseeRecord(res);
      })
  }
  
  useEffect(() => {
    requestUserLike();
    requestUserSee();
    setuser_nickname(localStorage.getItem("user_nickname"));
  }, [])

  const dataLike = [];
  for(let i = 0; i < likeRecord.length; i++) {
    const children = {
      author: user_nickname,
      avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F48%2F73%2F4957443ab175547.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625491859&t=dbd582f2b64db2feb83d85b746acca70',
      content: (
        <>
          <HeartTwoTone twoToneColor="red"/>
          {likeRecord[i].name} ({likeRecord[i].date}) <br />
          <StarTwoTone />导演: {likeRecord[i].director} / 主演: {likeRecord[i].starring} <br />
          <TagTwoTone />{likeRecord[i].type}
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
      avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F48%2F73%2F4957443ab175547.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625491859&t=dbd582f2b64db2feb83d85b746acca70',
      content: (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" />
          {seeRecord[i].name} ({seeRecord[i].date}) <br />
          <Rate value={seeRecord[i].rate} disabled style={{zoom: "75%"}}/> <br />
          <StarTwoTone />导演: {seeRecord[i].director} / 主演: {seeRecord[i].starring} <br />
          <TagTwoTone />{seeRecord[i].type}
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
      <h2 style={{marginTop: 30}}>我的标记历史记录</h2>
      <List
        className="comment-list"
        header={`${dataLike.length} 条标记 喜欢 记录`}
        itemLayout="horizontal"
        dataSource={dataLike}
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
        header={`${dataSee.length} 条标记 看过/评分 记录`}
        itemLayout="horizontal"
        dataSource={dataSee}
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