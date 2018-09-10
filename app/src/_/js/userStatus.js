import CryptoJS from 'crypto-js';
import $ from 'webpack-zepto';

const key = 'niugu123niugu456niugu123';
const iv = '12312300';

const usinfo = 'https://trade.huanyingzq.com/nztradeproxy/client/getaccountinfo.ashx';
const info = {
  userToken: undefined,
  userStatus: undefined,
};
let flowno = 0;

const encode = (msg) => {
  const msgHex = CryptoJS.enc.Utf8.parse(msg);
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);

  const encrypted = CryptoJS.TripleDES.encrypt(msgHex, keyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: ivHex,
  });
  const res = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
  return res.toUpperCase();
};
/**
 * 解密
 */
const decode = (msg) => {
  const msgHex = CryptoJS.enc.Hex.parse(msg);
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);

  const decrypted = CryptoJS.TripleDES.decrypt({
    ciphertext: msgHex,
  }, keyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: ivHex,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};
window.decode = decode;
const getUserStatus = (token, cb) => {
  const params = `{"niuguToken":"${token}","tradeToken":"","flowno":${flowno++}}`;
  const data = {
    param: encode(params)
  };
  $.post(usinfo, data, (res) => {
    const status = decode(res);
    info.userStatus = JSON.parse(status);
    cb(info);
  });
};

export default function (bridge, cb) {
  bridge.utoken((token) => {
    if (typeof token !== undefined) {
      info.userToken = token;
      console.log(token);
      getUserStatus(token, cb);
    } else {
      cb(info);
    }
  });

  // getUserStatus('LHAUKhKh4JVlmjjqD-ynnEE8mCdAE-vZ2ERVAwq8E2sNtbcT0umofg**', cb);
};
