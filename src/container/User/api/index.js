import { fetchData } from "@/utils/axios.js";

// 获取用户信息
export function userInfo(data) {
  return fetchData('/api/user/getUserInfo', 'get', data);
}

// 获取头像
export function getAvatar(data) {
  return fetchData('/api/upload/getAvatar', 'get', data);
}