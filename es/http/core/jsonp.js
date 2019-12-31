import Promise from 'es6-promise';
import _jsonp from 'jsonp';
export default function (config) {
  return new Promise(function (resolve, reject) {
    _jsonp(config.url, config.params, function (err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}