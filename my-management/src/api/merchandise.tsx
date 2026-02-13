import { request } from '../request/';
//添加标签
export const addType = (params: any) => request.post("/merchandise/addType", params);
//获取类型
export const getList = () => request.get('/merchandise/typeList');
//删除
export const deleteItem = (params: any) => request.post('/merchandise/deleteType', params);
//排序
export const typeSort = (params: any) => request.post('/merchandise/updateSort', params);
//获取标签
export const labelList = () => request.get('/merchandise/labelList');
export const addLabel = (params: any) => request.post('/merchandise/addLabels', params);