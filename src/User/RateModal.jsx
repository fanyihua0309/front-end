import React, { useState } from 'react';
import { Modal, Rate, Button } from 'antd';
import { 
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditOutlined,
} from '@ant-design/icons';


const RateModal = ({ isSee, onClickOk, originalRate }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rate, setrate] = useState(originalRate || 0);
  const [isRateDisabled, setisRateDisabled] = useState(originalRate !== null);
  const [isEdit, setisEdit] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // isEdit 表示此次点击确定按钮是否是编辑之后再点击，从而决定向数据库插入记录还是更新记录
    onClickOk(rate, isEdit);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditRate = () => {
    setisRateDisabled(false);
    setisEdit(true);
  }


  return (
    <>
      {
        (isSee) ?
        (
          <CheckCircleTwoTone 
            twoToneColor="#52c41a" 
            style={{fontSize: "130%"}} 
            onClick={showModal}
          />
        )
        :
        (
          <CloseCircleTwoTone 
            twoToneColor="lightgrey" 
            style={{fontSize: "130%"}} 
            onClick={showModal}
          />
        )
      }
      <Modal 
        title="看过" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        okText="确定" 
        cancelText="取消"
      >
        <p>点击星星评分</p>
        <Rate 
          tooltips={["很差", "较差", "还行", "推荐", "力荐"]} 
          value={rate}
          onChange={(value) => setrate(value)}
          disabled={isRateDisabled}
        />
        <Button 
          icon={<EditOutlined />} 
          type="primary" 
          style={{marginLeft: "30px"}}
          onClick={handleEditRate}
        >
          编辑
        </Button>
      </Modal>
    </>
  );
};


export default RateModal;