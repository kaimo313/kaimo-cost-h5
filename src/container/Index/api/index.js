import { fetchData } from "@/utils/axios.js";

export function login(data) {
  return fetchData('/api/user/login', 'post', data);
}