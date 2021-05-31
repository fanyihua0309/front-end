import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Result,
} from 'antd';
import axiosInst from '../initAxios.js';


const InputForm = () => {
  // 存储用户当前输入的电影信息
  const [movie, setmovie] = useState({});
  // 记录当前页面状态，决定输入表单或显示结果
  const [isResult, setisResult] = useState(false);
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  /**
   * 存储用户输入的信息
   * @param {*} e onChange 事件传递的参数
   * @param {*} prop 当前用户输入的信息的 label
   */
  const handleChange = (value, prop) => {
    let movieCopy = movie;
    switch(prop) {
      case "name": movieCopy.name = value; break;
      case "area": movieCopy.area = value; break;
      case "date": movieCopy.date = value; break;
      case "director": movieCopy.director = value; break;
      case "starring": movieCopy.starring = value; break;
      case "type": movieCopy.type = value; break;
      default: console.log(prop);
    }
    setmovie(movieCopy);
  }

  /**
   * 当用户点击确认提交按钮时
   */
  const handleClick = () => {
    console.log(movie);
    const params = JSON.stringify(movie);
    axiosInst
      .post("/movies/add", { params })
      .then(() => {
        setisResult(true);
      })
  }

  /**
   * 当用户点击继续新增按钮时
   */
  const handleClickAddAgain = () => {
    setisResult(false);
  }

  return (
    (isResult === false) ?
    (
      <>
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
        >
          <Form.Item label="电影名称">
            <Input onChange={(e) => handleChange(e.target.value, "name")}/>
          </Form.Item>
          <Form.Item label="上映时间">
            <DatePicker onChange={(date, dateString) => handleChange(dateString, "date")} format="YYYY-MM-DD" placeholder="选择日期"/>
          </Form.Item>
          <Form.Item label="国家地区">
            <Input onChange={(e) => handleChange(e.target.value, "area")}/>
          </Form.Item>
          <Form.Item label="导演">
            <Input onChange={(e) => handleChange(e.target.value, "director")}/>
          </Form.Item>
          <Form.Item label="主演">
            <Input onChange={(e) => handleChange(e.target.value, "starring")}/>
          </Form.Item>
          <Form.Item label="类型">
            <Input onChange={(e) => handleChange(e.target.value, "type")}/>
          </Form.Item>
          <Form.Item label="确定提交">
            <Button type="primary" onClick={handleClick}>新建电影</Button>
          </Form.Item>
        </Form>
      </>
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
  );
};

export default InputForm;