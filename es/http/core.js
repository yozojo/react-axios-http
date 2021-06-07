import _extends from "@babel/runtime/helpers/esm/extends";
import axios from 'axios';
import assign from "lodash/assign";
import _jsonp from 'jsonp';

var GetJsonp = function GetJsonp(config) {
  return new Promise(function (resolve, reject) {
    _jsonp(config.url, config.params, function (err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

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
export default _extends({}, xhrs, {
  GetJsonp: GetJsonp
});