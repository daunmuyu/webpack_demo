/**
 * 对接网易云信
 * http://dev.netease.im/docs?doc=web&#聊天室功能概述
 */
import ChatRoom from 'NIM-chatroom';
import API from 'service/api';

let chatroomInstance;

export const NEIMConfig = {
  appKey: '3b95e461fd9bbc17dc72e638d5a5fcf8',
};

/**
 * 初始化
 */
export const chatroomURL = ({
  roomId,
}) => {
  return API.getNERoomURL({
    roomId,
  });
};

export const getInstance = ({
  account = '',
  token = '',
  chatroomId = '',
  chatroomAddresses = [],
  onconnect = () => {},
  onerror = () => {},
  onwillreconnect = () => {},
  ondisconnect = () => {},
  onmsgs = () => {},
}) => {
  chatroomInstance = ChatRoom.getInstance({
    appKey: NEIMConfig.appKey,
    account,
    token,
    chatroomId,
    chatroomAddresses,
    onconnect,
    onerror,
    onwillreconnect,
    ondisconnect,
    // 消息
    onmsgs,
  });
};

/**
 * 获取聊天室信息
 */
export const getChatroomInfo = () => {
  return new Promise((resolve) => {
    chatroomInstance.getChatroom({
      done: () => {
        resolve();
      },
    });
  });
};


export const sendMsg = () => {

};
