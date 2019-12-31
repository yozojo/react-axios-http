import Promise from 'es6-promise';
import axios from 'axios';

/**
 * get请求封装
 * @param config
 */
export default function(config) {
  const tempConfig = Object.assign(config, { method: 'DELETE' });
  return new Promise((resolve, reject) => {
    axios(tempConfig)
      .then(res => {
        resolve((res && res.status === 200 && res.data) || {});
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        // console.log('finally')
      });
  });
}
