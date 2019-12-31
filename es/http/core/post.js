import Promise from 'es6-promise';
import axios from 'axios';
export default function (config) {
  var tempConfig = Object.assign(config, {
    method: 'POST'
  });
  return new Promise(function (resolve, reject) {
    axios(tempConfig).then(function (res) {
      resolve(res && res.status === 200 && res.data || {});
    })["catch"](function (error) {
      reject(error);
    })["finally"](function () {// console.log('finally')
    });
  });
}