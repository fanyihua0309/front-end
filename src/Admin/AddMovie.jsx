import React, { useState } from 'react';
import { Button, Result } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import axiosInst from '../initAxios.js';
import InputForm from "./InputForm.jsx";
import { useHistory } from "react-router-dom";


/**
 * 新增电影信息组件，使用子组件 InputForm
 */
const AddMovie = () => {
  // 记录当前页面状态，决定输入表单或显示结果
  const [isResult, setisResult] = useState(false);

  /**
   * 当用户点击确认提交按钮时
   */
  const handleClick = (movie) => {
    const params = JSON.stringify(movie);
    axiosInst
      .post("/movies/add", { params })
      .then(() => {
        setisResult(true);
      })
  }

  const handleClickAddAgain = () => {
    setisResult(false);
  }

  let history = useHistory();
  const handleClickForResult = () => {
    history.push("/admin/show");
  }

  return (
    (isResult === false) ?
    (
      <InputForm onClickSubmit={handleClick}/>
    )
    :
    (
      <Result
        status="success"
        title="新增电影信息成功！"
        subTitle="请点击相应按钮选择进行继续新增或查看新增后的全部电影信息"
        extra={[
          <Button type="primary" icon={<PlusOutlined />} onClick={handleClickAddAgain}>继续新增</Button>,
          <Button type="primary" icon={<EyeOutlined />} onClick={handleClickForResult}>查看结果</Button>
        ]}
      />
    )
  )
};

export default AddMovie;