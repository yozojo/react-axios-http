import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";

function isPost(method) {
  return !!method && /post/.test(method.toLowerCase());
}

function isPut(method) {
  return !!method && /put/.test(method.toLowerCase());
}

function getDOP(method, opt, isQuery, others) {
  var _extends2;

  if (others === void 0) {
    others = {};
  }

  return isPost(method) ? _extends({
    data: opt
  }, others) : _extends((_extends2 = {}, _extends2[isPut(method) && isQuery ? 'data' : 'params'] = opt, _extends2), others);
}

function handleMethod(params) {
  var method = params.method;
  var methodMap = {
    post: 'Post',
    get: 'Get',
    put: 'Put',
    getjsonp: 'GetJsonp',
    "delete": 'Delete'
  };
  return method ? methodMap[method.toLowerCase()] : 'Get';
}

function extend(a, b, thisArg) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      if (thisArg && typeof b[key] === 'function') {
        a[key] = b[key].bind(thisArg);
      } else {
        a[key] = b[key];
      }
    }
  }

  return a;
}

function setOpt(_ref) {
  var method = _ref.method,
      _ref$opt = _ref.opt,
      opt = _ref$opt === void 0 ? {} : _ref$opt,
      _ref$isFormData = _ref.isFormData,
      isFormData = _ref$isFormData === void 0 ? false : _ref$isFormData,
      _ref$isQuery = _ref.isQuery,
      isQuery = _ref$isQuery === void 0 ? false : _ref$isQuery,
      others = _objectWithoutPropertiesLoose(_ref, ["method", "opt", "isFormData", "isQuery"]);

  if (isFormData && !isQuery) {
    var formData = new FormData();

    for (var key in opt) {
      if (opt.hasOwnProperty(key)) {
        var value = opt[key];
        formData.append(key, value);
      }
    }

    opt = formData;
  }

  return getDOP(method, opt, isQuery, others);
}

export { handleMethod, extend, setOpt };