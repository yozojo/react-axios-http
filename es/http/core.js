import axios from 'axios/dist/axios.min.js';
import assign from "lodash/assign";

var getXhr = function getXhr(method) {
  return function xhr(config) {
    var assignConfig = assign(config, {
      method: method.toLowerCase()
    });
    return new Promise(function (resolve, reject) {
      axios(assignConfig).then(function (res) {
        resolve(res && res.status === 200 && res.data || {});
      })["catch"](function (error) {
        reject(error);
      });
    });
  };
};

var methods = ['Get', 'Post', 'Delete', 'Put'];
var xhrs = methods.reduce(function (prev, cur) {
  prev[cur] = getXhr(cur);
  return prev;
}, {});
export default xhrs;