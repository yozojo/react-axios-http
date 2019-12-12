"use strict";

exports.__esModule = true;
exports.handleMethod = handleMethod;
exports.extend = extend;
exports.setOpt = setOpt;

function isPost(method) {
  return !!method && /post/.test(method.toLowerCase());
}

function isPut(method) {
  return !!method && /put/.test(method.toLowerCase());
}

function getDOP(method, opt, isQuery) {
  var _ref;

  return isPost(method) ? {
    data: opt
  } : (_ref = {}, _ref[isPut(method) && isQuery ? 'data' : 'params'] = opt, _ref);
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

function setOpt(_ref2) {
  var method = _ref2.method,
      opt = _ref2.opt,
      _ref2$isFormData = _ref2.isFormData,
      isFormData = _ref2$isFormData === void 0 ? false : _ref2$isFormData,
      _ref2$isQuery = _ref2.isQuery,
      isQuery = _ref2$isQuery === void 0 ? false : _ref2$isQuery;
  opt = opt || {};

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

  return getDOP(method, opt, isQuery);
}