import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";

function isWhichMethod(target, method) {
  return !!target && new RegExp(method).test(target.toLowerCase());
}

function getDOP(method, opt, isQuery, others) {
  if (others === void 0) {
    others = {};
  }

  if (isWhichMethod(method, 'post')) {
    return _extends({
      data: opt
    }, others);
  } else {
    if (isWhichMethod(method, 'get') || isWhichMethod(method, 'jsonp')) {
      return _extends({
        params: opt
      }, others);
    } else {
      var _extends2;

      return _extends((_extends2 = {}, _extends2[isQuery ? 'params' : 'data'] = opt, _extends2), others);
    }
  }
}

function isFormDataFunc(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function setOpt(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'get' : _ref$method,
      _ref$opt = _ref.opt,
      opt = _ref$opt === void 0 ? {} : _ref$opt,
      _ref$isFormData = _ref.isFormData,
      isFormData = _ref$isFormData === void 0 ? false : _ref$isFormData,
      _ref$isQuery = _ref.isQuery,
      isQuery = _ref$isQuery === void 0 ? false : _ref$isQuery,
      others = _objectWithoutPropertiesLoose(_ref, ["method", "opt", "isFormData", "isQuery"]);

  if (isFormData && !isFormDataFunc(opt)) {
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
    jsonp: 'GetJsonp',
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

var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g;

var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent;

function resolveQuery(query, extraQuery, _parseQuery) {
  if (extraQuery === void 0) {
    extraQuery = {};
  }

  var parse = _parseQuery || parseQuery;
  var parsedQuery;

  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production';
    parsedQuery = {};
  }

  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }

  return parsedQuery;
}

function parseQuery(query) {
  var res = {};
  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}

function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encode(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&');
    }

    return encode(key) + '=' + encode(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?" + res : '';
}

var Global = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
export { resolveQuery, stringifyQuery, handleMethod, extend, setOpt, awaitWrap, isType, getType, Global, isStandardBrowserEnv };