import React from 'react';
import { Form, Row, Col, Input, Button } from 'antd';

const { Search } = Input;


const SearchForm = ({ onClickSubmit, isVisible }) => {
  const [form] = Form.useForm();

  const getFields = () => {
    const formItemName = ['name', 'date', 'area', 'director', 'starring', 'type'];
    const searchName = ['电影名称', '日期', '国家地区', '导演', '主演', '类型'];
    const children = [];

    for (let i = 0; i < 6; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item name={formItemName[i]}>
            <Search placeholder={searchName[i]} allowClear enterButton />
          </Form.Item>
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    onClickSubmit(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
      style={{display: (isVisible) ? "inherit": "none"}}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row> 
        <Col
          span={24}
          style={{
            textAlign: 'right',
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};


export default SearchForm;