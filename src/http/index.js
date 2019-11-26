/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { isPost, dataOrParams, extend } from './handler';

const apiFactory = api => {
  let { method, isFormData } = api;
  return opt => {
    opt = dataOrParams(method, opt, isFormData);
    return tdHttp({
      ...api,
      ...opt,
    });
  };
};

function http(apis={}) {
  const IO = {};
  extend(IO, tdHttp);
  Object.keys(apis).forEach(item => {
    IO[item] = apiFactory(apis[item]);
  });

  return IO;
}

export default http;
