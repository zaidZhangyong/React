import { request } from '../request/';
//添加
export const add = (params: any) => request.post("/swiper/add", params);
//获取
export const getList = () => request.get('/swiper/list');
//删除
export const deleteItem = (params: any) => request.post('/swiper/delete', params);
