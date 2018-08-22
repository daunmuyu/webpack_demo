/**
 * 通用交互
 */
import Cookie from 'js-cookie';
import API from './actions';

// const authURL = 'https://user.niuguwang.com/api_wap/wechat/oauthLogin.aspx?oauthtype=wechat&back=';

/**
 * 获取queryString中的key
 */
export const search = (key) => {
  let res;
  let ss;
  let i;
  let sss;
  let s = window.location.search;
  if (s) {
    s = s.substr(1);
    if (s) {
      ss = s.split('&');
      for (i = 0; i < ss.length; i += 1) {
        sss = ss[i].split('=');
        if (sss && sss[0] === key) {
          res = sss[1];
        }
      }
    }
  }
  return res;
};

/**
 * 校验
 */
export const auth = () => {
  const token =
    search('userToken') || Cookie.get('usertoken') || search('usertoken');
  if (token) Cookie.set('usertoken', token, { expires: 7 });
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token);
    } else {
      reject(null);
    }
  });
};

export const newAuth = () => {
  const token = search('userToken') || Cookie.get('wxtoken');
  return new Promise((resolve, reject) => {
    if (token) {
      Cookie.set('wxtoken', token, { expires: 7 });
      resolve(token);
    } else {
      reject(null);
    }
  });
};

/**
 * 关注主播
 * op = 1 关注
 * op = 0 取消关注
 */
export const followAnchor = ({ op, relationid, usertoken }) => {
  return new Promise((resolve, reject) => {
    API.followAnchor({
      op,
      relationid,
      usertoken,
    }).then(
      (res) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

/**
 * 限制性行为
 */
export const limitBehavior = () => {
  document.body.addEventListener(
    'touchmove',
    (event) => {
      if (!document.querySelector('.content-wrap').contains(event.target)) {
        event.preventDefault();
      }
    },
    false
  );
  document.body.addEventListener(
    'touchstart',
    (event) => {
      if (!document.querySelector('.send-box-wrap').contains(event.target)) {
        document.querySelector('#txtMsg').blur();
      }
    },
    false
  );
};

// 表情包
const emojiCode = [
  '1f60a',
  '1f60c',
  '1f60f',
  '1f601',
  '1f604',
  '1f609',
  '1f612',
  '1f614',
  '1f616',
  '1f618',
  '1f621',
  '1f628',
  '1f630',
  '1f631',
  '1f633',
  '1f637',
  '1f603',
  '1f61e',
  '1f620',
  '1f61c',
  '1f60d',
  '1f613',
  '1f61d',
  '1f62d',
  '1f602',
  '1f622',
  '1f61a',
  '1f623',
  '1f632',
  '1f62a',
  '263a',
  '1f4aa',
  '1f44a',
  '1f44d',
  '1f44e',
  '1f44f',
  '1f64f',
  '1f446',
  '1f447',
  '261d',
  '270c',
  '1f44c',
  '270b',
  '270a',
  '1f440',
  '1f444',
  '1f35a',
  '1f382',
  '1f37b',
  '2615',
  '1f451',
  '1f494',
  '1f339',
  '1f4a3',
  '1f004',
  '1f437',
  '1f3b5',
  '2600',
  '1f319',
  '1f525',
  '1f47b',
  '1f489',
  '1f4a9',
  '1f47c',
  '1f52b',
  '1f3c6',
  '26bd',
  '1f680',
];
// 表情转图片
export const faceToImg = (content) => {
  return content.replace(/\[([0-9a-f]{4,5})\]/g, (match, group) => {
    if (emojiCode.indexOf(group) >= 0) {
      return `<img src="https://i0.niuguwang.com/emoji/emoji_${group}.png">`;
    }
    return match;
  });
};

/**
 * 将内容转换为可以发送的内容
 */
export const contentToSend = (content) => {
  let result = content.replace(/&nbsp;/g, ' ').trim();
  result = result.replace(/<br>/g, '\n');
  result = result.replace(
    /<img[^>]+?([a-zA-Z0-9]{4,5}(?=\.png))[^>]*>/g,
    (match, key) => {
      return `[${key}]`;
    }
  );

  return result;
};
