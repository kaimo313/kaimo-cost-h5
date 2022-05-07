import { fetchData } from "@/utils/axios.js";

// 获取类型字典列表
export function queryTypeList(data) {
  return fetchData('/api/type/list', 'get', data);
}