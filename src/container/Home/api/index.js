import { fetchData } from "@/utils/axios.js";

// 获取账单列表
export function queryBillList(data) {
  return fetchData('/api/bill/list', 'get', data);
}