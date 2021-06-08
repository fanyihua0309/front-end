import { message } from "antd";
import axios from "axios";
import { createHashHistory } from 'history';


const axiosInst = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
});

axiosInst.interceptors.request.use(
  function(request){
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    if(userToken){
      request.headers['Authorization'] = "Bearer " + userToken;
    }
    if(adminToken){
      request.headers['Authorization'] = "Bearer " + adminToken;
    }
    return request;
  },
  function(error){
    console.log(error);
  }
)

axiosInst.interceptors.response.use(
  function (response) {
    const { code, err, data, suc } = response.data;
    if(code !== 0) {
      message.error(err);
      return Promise.reject(err);
    }
    else {
      if(suc) {
        message.success(suc);
      }
      return data;
    }
  },
  function (error) {
    console.log(error);
    if(error.response) {
      if(error.response.status === 401){
        message.error("您尚未登录！ 请先登录！");
      }
      else if(error.response.status === 403){
        message.error("您的登录状态已过期！ 请重新登录！");
      }
      let history = createHashHistory();
      history.push("/sign/in");
    } 
    return Promise.reject(error);
  }
);


export default axiosInst;