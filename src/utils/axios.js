import axios from "axios";
// 引入 zarm 的 Toast 组件用于提示
import { Toast } from "zarm";

// MODE 是一个环境变量:判断当前代码运行在开发环境还是生产环境。
const MODE = import.meta.env.MODE;
// 部署应用时的基本 URL，http://127.0.0.1:7001 为 kaimo-cost-server 启动的服务地址
axios.defaults.baseURL = MODE == 'development' ? '/api' : 'http://127.0.0.1:7001';
// 看知识点 XMLHttpRequest.withCredentials
axios.defaults.withCredentials = true;
// 看知识点 X-Requested-With
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// Authorization 用于服务端鉴权，token 存于 localStorage
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`;
// 配置 post 请求
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default axios