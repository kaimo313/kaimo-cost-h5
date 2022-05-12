import { fetchData } from "@/utils/axios.js";

// 获取账单详情
export function billDetails(data) {
  return fetchData('/api/bill/details', 'get', data);
}

// 删除账单
export function billDelete(data) {
  return fetchData('/api/bill/delete', 'post', data);
}