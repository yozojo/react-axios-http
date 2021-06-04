import axios from 'axios';
import assign from "lodash/assign";

const GetJsonp = config => {
  return new Promise((resolve, reject) => {
    _jsonp(config.url, config.params, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

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

export default { ...xhrs, GetJsonp };
