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

// axiosInst.interceptors.request.use(
//   function(request){
//     const token = localStorage.getItem("token");
//     if(token){
//       request.headers['Authorization'] = token;
//     }
//     return request;
//   },
//   function(error){
//     console.log(error);
//   }
// )

// axiosInst.interceptors.response.use(
//   function (response) {
//     const {
//       meta: { code, errors },
//       data,
//     } = response.data;
//     if (code !== 0) {
//       message.info(errors[0]);
//       return Promise.reject(errors);
//     }
//     return data;
//   },
//   function (error) {
//     if (error.response) {
//       if(error.response.status === 401){
//         message.info("您尚未登录！ 请先登录！");
//       }
//       else if(error.response.status === 403){
//         message.info("您的登录状态已过期！ 请重新登录！");
//       }
//       let history = createHashHistory();
//       history.push("/login");
//     }
//   }
// );


export default axiosInst;