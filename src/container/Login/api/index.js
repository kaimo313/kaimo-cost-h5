import { fetchData } from "@/utils/axios.js";

// 注册
export function register(data) {
  return fetchData('/api/user/register', 'post', data);
}
// 登录
export function login(data) {
  return fetchData('/api/user/login', 'post', data);
}