import _extends from "@babel/runtime/helpers/esm/extends";

/* 封装tdHttp拦截接口 */
import tdHttp from './http';
import { isPost, dataOrParams, extend } from './handler';

var apiFactory = function apiFactory(api) {
  var method = api.method,
      isFormData = api.isFormData;
  return function (opt) {
    opt = dataOrParams(method, opt, isFormData);
    return tdHttp(_extends({}, api, {}, opt));
  };
};

function http(apis) {
  if (apis === void 0) {
    apis = {};
  }

  var IO = {};
  extend(IO, tdHttp);
  Object.keys(apis).forEach(function (item) {
    IO[item] = apiFactory(apis[item]);
  });
  return IO;
}

export default http;