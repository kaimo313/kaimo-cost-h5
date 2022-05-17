import { fetchData } from "@/utils/axios.js";

// 重置密码
export function resetPassword(data) {
  return fetchData('/api/user/resetPassword', 'post', data);
}
