import { request } from '../request/';

//获取
export const getUserList = (phone?: string) =>
    request.get(`/user/list${phone ? '?phone=' + phone : ''}`);
export const addUser = (params: any) => request.post("/user/register", params);
export const userDelete = (params: any) => request.post("/user/delete", params);

