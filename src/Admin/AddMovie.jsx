import React, { useState } from 'react';
import { Button, Result } from 'antd';
import axiosInst from '../initAxios.js';
import InputForm from "./InputForm.jsx";


const AddMovie = () => {
  // 记录当前页面状态，决定输入表单或显示结果
  const [isResult, setisResult] = useState(false);

  /**
   * 当用户点击确认提交按钮时
   */
  const handleClick = (movie) => {
    console.log(movie);
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
        subTitle="如需继续新增电影信息，请点击下方绿色按钮"
        extra={[
          <Button type="primary" onClick={handleClickAddAgain}>继续新增</Button>,
        ]}
      />
    )
  )
};

export default AddMovie;