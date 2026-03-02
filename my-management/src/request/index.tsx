import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "/api/" : "";
const timeout = 30000;

const service = axios.create({
  timeout,
  baseURL,
  withCredentials: true,
});

// 请求拦截器（无改动）
service.interceptors.request.use(
  (config: any) => {
    let customHeaders = {
      ...config.headers,
      language: 'zh-cn',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}` || ''
    };
    config.headers = { ...customHeaders };
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error) // 补充返回，避免拦截器异常
  }
);

// 扩展配置类型，新增 skipBusinessCheck 字段
interface CustomRequestConfig extends AxiosRequestConfig {
  skipBusinessCheck?: boolean; // 是否跳过业务校验
}

// 核心处理代码
const requestHandler = (
  method: "get" | "post" | "put" | "delete",
  url: string,
  params: object = {},
  config: CustomRequestConfig = {}
): Promise<any> => { // 放宽返回类型，适配 blob 和 JSON
  let response: Promise<any>;

  switch (method) {
    case "get":
      response = service.get(url, { params: { ...params }, ...config });
      break;
    case "post":
      response = service.post(url, { ...params }, { ...config });
      break;
    case "put":
      response = service.put(url, { ...params }, { ...config });
      break;
    case "delete":
      response = service.delete(url, { params: { ...params }, ...config });
      break;
    default:
      return Promise.reject(new Error("不支持的请求方法"));
  }

  return new Promise((resolve, reject) => {
    response
      .then((res) => {
        // 关键：如果配置了跳过业务校验，直接返回原始响应（适配图片等二进制数据）
        if (config.skipBusinessCheck) {
          resolve(res); // 返回完整响应（包含 data、status 等）
          return;
        }

        // 原有业务校验逻辑（仅针对 JSON 接口）
        const data = res.data;
        if (data.code !== 200) {
          if (data.code == 401) {
            message.warning("您的账号已登出或超时，即将登出...");
            console.log("登录异常，执行登出...");
          }
          const e = JSON.stringify(data);
          message.warning(`请求错误：${JSON.parse(e).message}`);
          console.log(`请求错误：${e}`);
          reject(data);
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        const e = JSON.stringify(error);
        message.warning(`网络错误：${e}`);
        console.log(`网络错误：${e}`);
        reject(error);
      });
  });
};

// 重构 request 方法，透传 skipBusinessCheck 配置
const request = {
  get: (url: string, params?: object, config?: CustomRequestConfig) =>
    requestHandler("get", url, params, config),
  post: (url: string, params?: object, config?: CustomRequestConfig) =>
    requestHandler("post", url, params, config),
  put: (url: string, params?: object, config?: CustomRequestConfig) =>
    requestHandler("put", url, params, config),
  delete: (url: string, params?: object, config?: CustomRequestConfig) =>
    requestHandler("delete", url, params, config),
};

export { request };

