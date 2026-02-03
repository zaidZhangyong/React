<<<<<<< HEAD
import { request } from '../request/'
//获取验证码
export const captchaApi = () => request.get('/user/captcha?' + Math.random(), {}, { responseType: "blob" });
//登录
export const LoginApi = (params: any) => request.post('/user/login', params, { timeout: 15000 });
=======
import { loginType } from "@/types";
import { request } from "../request/";

//登录
export const LoginApi = (params: loginType) =>
  request.post("/user/login", params, { timeout: 15000 });
>>>>>>> 7405ad46c5ad947e238eb2262b0cf4aaeeadfaab
