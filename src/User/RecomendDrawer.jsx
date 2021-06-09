import React, { useState } from 'react';
import { Drawer, Button, Rate, Tag } from 'antd';
import { 
  HeartTwoTone,
  CheckCircleTwoTone,
  TagTwoTone,
  StarTwoTone,
  BankTwoTone,
  FieldNumberOutlined,
  LikeOutlined,
  CrownTwoTone
} from '@ant-design/icons';
import "../App.less";

const RecomendDrawer = ({ isVisible, recomend }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    console.log(recomend);
    setVisible(false);
  };

  const recomendList = [];
  for(let i = 0; i < recomend.length; i++) {
    const children = (
      <>
        <FieldNumberOutlined style={{zoom: "100%", marginRight: 12}}/>
        <h2 style={{fontSize: "14px", display: "inline"}}>{i + 1}.{recomend[i].name} ({recomend[i].date})</h2> <br />
        <HeartTwoTone twoToneColor="red"/> {recomend[i].likeTotal}
        / <CheckCircleTwoTone twoToneColor="#52c41a" /> {recomend[i].seeTotal}
        / <Rate value={recomend[i].rateAvg} disabled style={{zoom: "75%"}}/> <br />
        <BankTwoTone /> {recomend[i].area} <br />
        <CrownTwoTone /> 导演: {recomend[i].director} <br />
        <StarTwoTone /> 主演: {recomend[i].starring} <br />
        <TagTwoTone />
        {
          <>
            {recomend[i].type.map(tag => {
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
        <br />
        <br />
      </>
    )
    recomendList.push(children);
  }


  return (
    <>
      <Button 
        type="primary" 
        icon={<LikeOutlined />} 
        ghost
        shape="round"
        onClick={showDrawer} 
        style={{display: (isVisible) ? "inline" : "none"}}
      >
        热门推荐
      </Button>
      <Drawer
        title="热门电影推荐"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width="300"
      >
        {recomendList}
      </Drawer>
    </>
  );
};

export default RecomendDrawer;