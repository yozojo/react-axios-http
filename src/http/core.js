import axios from 'axios/dist/axios.min.js';
import assign from "lodash/assign";

const getXhr = method => {
  return function xhr(config) {
    const assignConfig = assign(config, { method: method.toLowerCase() });
    return new Promise((resolve, reject) => {
      axios(assignConfig)
        .then(res => {
          resolve((res && res.status === 200 && res.data) || {});
        })
        .catch(error => {
          reject(error);
        });
    });
  };
};

const methods = ['Get', 'Post', 'Delete', 'Put'];

const xhrs = methods.reduce((prev, cur) => {
  prev[cur] = getXhr(cur);
  return prev;
}, {});

export default xhrs;
