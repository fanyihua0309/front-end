import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
} from 'antd';
import moment from "moment";


const InputForm = ({ originalMovie, onClickSubmit }) => {
  originalMovie = originalMovie || {};
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = (values) => {
    console.log(values);
    values.date = moment(values.date).format('YYYY-MM-DD');
    onClickSubmit(values);
  };

  return (
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
          "name": originalMovie.name || "",
          // 日期需要处理成特殊格式才能设定初始值
          "date": (originalMovie.date) ? moment(originalMovie.date, 'YYYY-MM-DD') : "",
          "area": originalMovie.area || "",
          "director": originalMovie.director || "",
          "starring": originalMovie.starring || "",
          // 默认显示以逗号分隔每个 type 处理成以空格分隔
          "type": (originalMovie.type) ? originalMovie.type.toString().replace(/,/g, ' ') : ""
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
      >
        <Form.Item label="电影名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="上映时间" name="date">
          <DatePicker placeholder="选择上映日期" allowClear={false}/>
        </Form.Item>
        <Form.Item label="国家地区" name="area">
          <Input />
        </Form.Item>
        <Form.Item label="导演" name="director">
          <Input />
        </Form.Item>
        <Form.Item label="主演" name="starring">
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type">
          <Input />
        </Form.Item>
        <Form.Item label="确定提交">
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </>
  )
};

export default InputForm;