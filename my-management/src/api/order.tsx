import { request } from '../request/';
//获取验证码export const captchaApi = () =>
export const getDataList = (params: any) =>
    request.post(`/order/lists`, params);