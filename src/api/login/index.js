import fetch from '../common/fetch';
let base = '/api';

export const login = params => {
  return fetch({
    url: `${base}/login`,
    method: 'post',
    params:params
  });
};

export const getInfo = params => {
  return fetch({
    url: `${base}/customerLogin/getCustomerInfo`,
    method: 'post',
    params:params
  }).then(res => res.data);
};

export const getCaptchaUrl = params => {
  return fetch({
    url: `${base}/kaptcha/getKaptchaImage`,
    method: 'post',
    params:params
  });
};

export function logout() {
  return fetch({
    url: `${base}/logout`,
    method: 'post'
  });
}
