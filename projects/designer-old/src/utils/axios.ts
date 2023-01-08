import { Message } from "@arco-design/web-react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface ResponseWrap<T> {
  data: T;
  code: number;
  message: string;
}

/**
 *
 * @param status 错误状态
 * @returns
 */
const getErrorMsg = (status: number) => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 402:
      message = "拒绝访问(402)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络错误(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持(505)";
      break;
    default:
      message = "";
  }
  return `${message}，请检查网络或联系管理员！`;
};

const http = axios.create({
  baseURL: "http://localhost:3333",
  // 是否跨站点访问控制请求
  withCredentials: false,
  // 超时时长
  timeout: 30000
});

// 请求拦截器
http.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (err: Error) => {
    err.message = "服务器异常，请联系管理员！";
    // 错误抛到业务代码
    return Promise.reject(err);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status;
    if (status < 200 || (status >= 300 && status !== 401 && status !== 500)) {
      const msg = getErrorMsg(status);
      msg && Message.warning(msg);
      return response;
    } else if (status === 200) {
      return response.data;
    }
  },
  (err: Error) => {
    err.message = "请求超时或服务器异常，请检查网络或联系管理员！";
    return Promise.reject(err);
  }
);

// 返回的数据类型通过泛型传递
async function service<T, R = Promise<ResponseWrap<T>>>(config: AxiosRequestConfig) {
  return http(config) as unknown as R;
}

export default service;
