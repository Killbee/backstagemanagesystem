import { message } from "antd";
import axios from "axios";

function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    if (method === "GET") {
      // 发送get 请求
      promise = axios.get(url, { params: data });
    } else {
      // 发送post 请求
      promise = axios.post(url, data);
    }
    promise
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  });
}

export default ajax;
