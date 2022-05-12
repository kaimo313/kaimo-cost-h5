import { fetchData } from "@/utils/axios.js";

// 获取类型字典列表
export function queryTypeList(data) {
  return fetchData('/api/type/list', 'get', data);
}

// 添加账单
export function billAdd(data) {
  return fetchData('/api/bill/add', 'post', data);
}

// 更新账单信息
export function billUpdate(data) {
  return fetchData('/api/bill/update', 'post', data);
}