
import { request } from '../request/';
//获取验证码
export const captchaApi = () => request.get('/user/captcha?' + Math.random(), {}, { responseType: "blob" });
//登录
export const LoginApi = (params: any) => request.post('/user/login', params, { timeout: 15000 });

