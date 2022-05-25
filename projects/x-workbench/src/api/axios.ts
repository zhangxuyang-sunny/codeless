import axios from "axios";

const request = axios.create({
  // baseURL: '//192.168.31.115'
  baseURL: "//localhost:5555"
});
request.interceptors.response.use(response => {
  // 只有 200 为正确请求
  if (response.status === 200) {
    return response;
  }
  return Promise.reject("请求失败，请重试");
});

export default request;
