
import { request } from '../request/';
//获取验证码
export const captchaApi = () =>
    request.get('/user/captcha?' + Math.random(), {}, {
        responseType: "blob",
        skipBusinessCheck: true // 关键：跳过业务校验，直接返回 blob 数据
    });

//登录
export const LoginApi = (params: any) => request.post('/user/login', params, { timeout: 15000 });

export const changePassword = (params: any) => request.post('/user/changePassword', params, { timeout: 15000 });