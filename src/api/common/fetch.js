import axios from 'axios';
import { Message } from 'element-ui';
import store from '../../store';
// import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 3600000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['x-auth-token'] = store.getters.token; // 让每个请求携带token--['x-auth-token']为自定义key
  }
  return config;
}, error => {
  // Do something with request error
  console.log('-->'+error); // for debug
  Message({
    message: '请求超时，请联系管理员',
    type: 'error',
    duration: 2 * 1000
  });
  // Promise.reject(error);
  // sessionStorage.removeItem('token');
  // window.location.reload();
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    const code = response.data.status;
    // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
    if (code === 50008 || code === 50014 || code === 50012) {
      // Message({
      //   message: response.data.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // });
      // 登出
      sessionStorage.removeItem('token');
      window.location.reload();
      // store.dispatch('FedLogOut').then(() => {
      //   router.push({ path: '/login' })
      // });
    }else if (code === 50000) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 2 * 1000
      });
    } else {
      return response
    }
  }
  ,
  error => {
    console.log('err' + error);// for debug
    // Message({
    //   message: '响应超时，请联系管理员',
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    sessionStorage.removeItem('token');
    window.location.reload();
    // store.dispatch('FedLogOut').then(() => {
    //   router.push({ path: '/login' })
    // });
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
)

export default service;
