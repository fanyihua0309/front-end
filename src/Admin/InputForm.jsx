import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select
} from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import moment from "moment";

// const { Option } = Select;

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
    console.log(values);
    // 将数组转成字符串，以空格隔开
    values.type = values.type.join(" ");
    // 去除字符串前面多余的空格
    values.type = values.type.replace(/(^\s*)/g, "");   
    values.date = moment(values.date).format('YYYY-MM-DD');
    onClickSubmit(values);
  };
  
  const options = [
    { value: '剧情' }, 
    { value: '爱情' }, 
    { value: '喜剧' },
    { value: '战争' }, 
    { value: '冒险' },
    { value: '犯罪' },
    { value: '动作' },
    { value: '灾难' },
    { value: '奇幻' },
    { value: '动画' },
    { value: '音乐' },
    { value: '悬疑' },
    { value: '科幻' },
  ]

  // const value = ['剧情', '爱情', '冒险'];
  // const children = [];
  // for (let i = 0; i < 3; i++) {
  //   children.push(<Option key={i}>{value[i]}</Option>);
  // }

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
          "type": originalMovie.type || "",
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
        <Form.Item label="类型" name="type">
          <Select mode="tags" style={{ width: '100%' }} options={options}></Select>
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