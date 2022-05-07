import axios from "axios";
// 引入 zarm 的 Toast 组件用于提示
import { Toast } from "zarm";

// 设置接口响应时间 30s
axios.defaults.timeout = 3000;
/**
 * @description 添加请求拦截器
 *  1. config中的一些信息不符合服务器的要求,这里可以做一些修改
 *  2. 每次发送网络请求时,都希望在界面中显示一个请求的图标(然后再响应拦截中取消显示)
 *  3. 某些网络请求必须携带一些特殊的信息(如登录token),如果没有携带就可以拦截并作响应提示
*/
axios.interceptors.request.use(config => {
  // 看知识点 XMLHttpRequest.withCredentials
  config.withCredentials = true;
  // 看知识点 X-Requested-With
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  // Authorization 用于服务端鉴权，token 存于 localStorage
  config.headers['Authorization'] = `${localStorage.getItem('token') || null}`;
  console.log('进入请求拦截器-->config：', config);
  return config;
}, err => {
  // 请求未成功发出，如：没有网络...
  console.log('进入请求拦截器-->err：', err);
  Toast.show("请求失败");
  return Promise.reject(err);
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 成功响应的拦截
  console.log('进入响应拦截器-->response：', response);
  if(response){
    // 失败响应的status需要在response中获得
    switch(response.data.status){
      // 对得到的状态码的处理，具体的设置视自己的情况而定
      case 401:
        console.log('未登录')
        window.location.href='/login';
        break
      default:
        break
    }
  }
  return Promise.resolve(response.data)
}, err =>{
  // 失败响应的拦截
  console.log('进入响应拦截器-->err：', err);
  Toast.show("服务器响应失败");
  // 注意这里应该return promise.reject(),
  // 因为如果直接return err则在调用此实例时，响应失败了也会进入then(res=>{})而不是reject或catch方法
  return Promise.reject(err)
});

/**
 * @description 导出获取数据方法
 * @param {String} url
 * @param {String} type
 * @param {Object} data
 * */ 

export function fetchData(url, type, data) {
  let ajaxType = type ? type.toLowerCase() : type;
  const config = {};
  config.method = ajaxType || 'post';
  config.url = url;
  config.headers = {};

  if (ajaxType === 'get') {
    config.url = url + '?r=' + Math.random() * 1000;
    config.params = data;
  } else if (ajaxType === 'post') {
    config.data = data;
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  }
  console.log('进入fetchData', url, type, data, config);
  return axios(config);
};