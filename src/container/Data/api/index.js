import { fetchData } from "@/utils/axios.js";

// 获取月度统计账单
export function analysisMonthBill(data) {
  return fetchData('/api/analysis/monthBill', 'get', data);
}
