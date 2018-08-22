import axios from 'axios';
import qs from 'qs';
import {
  encode,
  decode,
} from './crypto.js';

/**
 * get请求
 */
export function get(url, payload) {
  let req;
  if (typeof payload !== 'undefined') {
    if (url.indexOf('?') > -1) {
      req = `${url}&${qs.stringify(payload)}`;
    } else {
      req = `${url}?${qs.stringify(payload)}`;
    }
  } else {
    req = url;
  }
  return axios.get(req).then(res => res.data);
}
/**
 * post请求
 */
export function post(url, payload) {
  const opts = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return axios.post(url, qs.stringify(payload), opts).then(res => res.data);
}
/**
 * 加密post
 * @param {*请求地址} url
 * @param {*请求参数} payload
 */
export function encodePost(url, payload) {
  const param = encode(JSON.stringify({
    ...payload,
  }));
  return post(url, {
    param,
  }).then(res => JSON.parse(decode(res)));
}
