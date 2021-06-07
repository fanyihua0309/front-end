import { message } from "antd";
import axios from "axios"

const axiosInst = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
});

axiosInst.interceptors.response.use(
  function (response) {
    const { code, err, data, suc } = response.data;
    if(code !== 0) {
      message.info(err);
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
    return Promise.reject(error);
  }
);


export default axiosInst;