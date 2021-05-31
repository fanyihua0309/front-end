import { Table, Input, Button, Space, Tag } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';
import axiosInst from '../initAxios.js';


class SearchMovieTable extends React.Component {
  state = {
    searchText: '',       // 用户键入的搜索关键字
    searchedColumn: '',   // 当前进行搜索的列名
    movies: [],           // 存储所有电影信息的结构体数组
  };

  /**
   * get 请求获取所有电影信息
   */
  requestMoviesInfo = () => {
    axiosInst
      .get("/movies")
      .then((res) => {
        console.log(res);
        let moviesList = res;
        moviesList = moviesList.map((curMovie) => {
          // 处理 date 类型，截取前10位
          curMovie.date = curMovie.date.slice(0, 10);
          // 将 type 字符串类型按空格转换为字符串数组
          curMovie.type = curMovie.type.split(' ');  
          // 为表格的每一行设定唯一的 key，否则会有 warning
          curMovie.key = curMovie.id;   
          return curMovie;
        })
        this.setState({ movies: moviesList })
      })
  }

  /**
   * 组件挂载后执行函数
   */
  componentDidMount = () => {
    this.requestMoviesInfo();
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search movies' ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 70 }}
          >
            搜索
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 70 }}>
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  
  render() {
    const columns = [
      {
        title: '电影名称',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '上映日期',
        dataIndex: 'date',
        key: 'date',
        ...this.getColumnSearchProps('date'),
      },
      {
        title: '国家地区',
        dataIndex: 'area',
        key: 'area',
        ...this.getColumnSearchProps('area'),
      },
      {
        title: '导演',
        dataIndex: 'director',
        key: 'director',
        ...this.getColumnSearchProps('director'),
      },
      {
        title: '主演',
        dataIndex: 'starring',
        key: 'starring',
        ...this.getColumnSearchProps('starring'),
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
        ...this.getColumnSearchProps('type'),
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
    ];
    
    return <Table columns={columns} dataSource={this.state.movies} />;
  }
}

export default SearchMovieTable;