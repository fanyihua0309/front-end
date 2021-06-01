import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
} from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import moment from "moment";


/**
 * 用户键入电影基本信息的表单组件，用于新增和编辑功能
 * @param {string} operation 显示当前组件的功能
 * @param {object} originalMovie 用于编辑功能设定表单初始值
 * @param {回调函数} onClickSubmit 抛出用户输入的信息给父组件
 */
const InputForm = ({ operation, originalMovie, onClickSubmit }) => {
  originalMovie = originalMovie || {};
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = (values) => {
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
          span: 12,
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
        <Form.Item 
          label="电影名称" 
          name="name" 
          rules={[{ required: true, message: '电影名称不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="上映时间" name="date" tooltip="日期格式  YYYY-MM-DD">
          <DatePicker allowClear={false}/>
        </Form.Item>
        <Form.Item label="国家地区" name="area">
          <Input />
        </Form.Item>
        <Form.Item label="导演" name="director" tooltip="有多位导演时以空格隔开">
          <Input />
        </Form.Item>
        <Form.Item label="主演" name="starring" tooltip="有多位主演时以空格隔开">
          <Input />
        </Form.Item>
        <Form.Item label="类型" name="type" tooltip="有多种类型时以空格隔开">
          <Input />
        </Form.Item>
        <Form.Item>
          {/* 根据对应的功能设置按钮 */}
          {
            (operation === "edit") ? 
            (
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<CheckOutlined />} 
                shape="round"
                style={{marginLeft: "180px"}}
              >
                确认保存
              </Button>
            )
            :
            (
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<PlusOutlined />} 
                shape="round"
                style={{marginLeft: "180px"}}
              >
                新增电影
              </Button>
            )
          }
        </Form.Item>
      </Form>
    </>
  )
};

export default InputForm;