import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import InputForm from './InputForm.jsx';


/**
 * 用户点击编辑按钮，弹出对话框，对话框中包含表单组件
 * @param {object} originalMovie 设定表单初始值
 * @param {boolean} isButtonVisible 编辑按钮是否可见
 * @param {回调函数} onClickSubmit 抛出用户编辑后的信息给父组件
 */
const EditModal = ({ originalMovie, isButtonVisible, onClickSubmit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (movie) => {
    if(originalMovie)
      movie.id = originalMovie.id;    // 将原来相应电影的 id 赋值给当前编辑的电影
    onClickSubmit(movie);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button 
        type="primary" 
        onClick={showModal} 
        style={{display: (isButtonVisible) ? "inherit" : "none"}}
        shape="circle"
        icon={<EditOutlined />}
      />
      <Modal title="编辑电影信息" visible={isModalVisible} footer={[]} onCancel={handleCancel}>
        <InputForm operation="edit" originalMovie={originalMovie} onClickSubmit={handleOk}/>
      </Modal>
    </>
  );
};

export default EditModal;