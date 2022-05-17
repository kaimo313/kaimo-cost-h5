import { fetchData } from "@/utils/axios.js";

// 获取头像
export function getAvatar(data) {
  return fetchData('/api/upload/getAvatar', 'get', data);
}

// 获取用户信息
export function userInfo(data) {
  return fetchData('/api/user/getUserInfo', 'get', data);
}

// 更新用户信息
export function updateUserInfo(data) {
  return fetchData('/api/user/updateUserInfo', 'post', data);
}

// 上传头像
export function uploadAvatar(data) {
  return fetchData('/api/upload/avatar', 'post', data);
}