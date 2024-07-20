import { request } from '../request/'

//登录
export const LoginApi = (params:any) => request.post('/user/login', params, { timeout: 15000 });