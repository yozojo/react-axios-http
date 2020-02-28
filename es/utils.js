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

function isFormDataFunc(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
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

  if (isFormData && !isQuery && !isFormDataFunc(opt)) {
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

function awaitWrap(promise) {
  return promise.then(function (res) {
    return [null, res];
  })["catch"](function (err) {
    return [err, null];
  });
}

function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

function isType(data, type) {
  return type === getType(data);
}

var Global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
export { handleMethod, extend, setOpt, awaitWrap, isType, getType, Global, isStandardBrowserEnv };