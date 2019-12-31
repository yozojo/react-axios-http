import Promise from 'es6-promise';
import _jsonp from 'jsonp';

/**
 * jsonp 请求封装
 * @param config
 * param:指定 callback函数的参数名。默认就是callback
 * timeout: 超时时间 默认 60000
 * prefix：callback 函数的前缀 默认是 __jp
 * name：回调函数的方法名。如果不指定，则默认为 __jp0 __jp1，也就是前缀+自增数字
 */
export default function(config) {
  return new Promise((resolve, reject) => {
    _jsonp(config.url, config.params, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}
