import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import InputForm from './InputForm.jsx';


const EditModal = ({ originalMovie, isButtonVisible, onClickSubmit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (movie) => {
    if(originalMovie)
      movie.id = originalMovie.id;
    onClickSubmit(movie);
    setIsModalVisible(false);
    message.success("编辑电影信息成功！");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{display: (isButtonVisible) ? "inherit" : "none"}}>
        编辑
      </Button>
      <Modal title="编辑电影信息" visible={isModalVisible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
        <InputForm originalMovie={originalMovie} onClickSubmit={handleOk}/>
      </Modal>
    </>
  );
};

export default EditModal;