function isWhichMethod(target, method) {
  return !!target && new RegExp(method).test(target.toLowerCase());
}

function getDOP(method, opt, isQuery, others = {}) {
  if (isWhichMethod(method, 'post')) {
    return { data: opt, ...others };
  } else {
    if (isWhichMethod(method, 'get') || isWhichMethod(method, 'jsonp')) {
      return { params: opt, ...others };
    } else {
      return { [isQuery ? 'params' : 'data']: opt, ...others };
    }
  }
}

function isFormDataFunc(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

function setOpt({ method = 'get', opt = {}, isFormData = false, isQuery = false, ...others }) {
  if (isFormData && !isFormDataFunc(opt)) {
    const formData = new FormData();
    for (const key in opt) {
      if (opt.hasOwnProperty(key)) {
        const value = opt[key];
        formData.append(key, value);
      }
    }
    opt = formData;
  }

  return getDOP(method, opt, isQuery, others);
}

function handleMethod(params) {
  const { method } = params;
  const methodMap = {
    post: 'Post',
    get: 'Get',
    put: 'Put',
    jsonp: 'GetJsonp',
    delete: 'Delete',
  };
  return method ? methodMap[method.toLowerCase()] : 'Get';
}

function extend(a, b, thisArg) {
  for (const key in b) {
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
  return promise.then(res => [null, res]).catch(err => [err, null]);
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

const encodeReserveRE = /[!'()*]/g;
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16);
const commaRE = /%2C/g;

const encode = str => encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');

const decode = decodeURIComponent;

function resolveQuery(query, extraQuery = {}, _parseQuery) {
  const parse = _parseQuery || parseQuery;
  let parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production';
    parsedQuery = {};
  }
  for (const key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery;
}

function parseQuery(query) {
  const res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res;
  }

  query.split('&').forEach(param => {
    const parts = param.replace(/\+/g, ' ').split('=');
    const key = decode(parts.shift());
    const val = parts.length > 0 ? decode(parts.join('=')) : null;

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
  const res = obj
    ? Object.keys(obj)
        .map(key => {
          const val = obj[key];

          if (val === undefined) {
            return '';
          }

          if (val === null) {
            return encode(key);
          }

          if (Array.isArray(val)) {
            const result = [];
            val.forEach(val2 => {
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
        })
        .filter(x => x.length > 0)
        .join('&')
    : null;
  return res ? `?${res}` : '';
}

const Global =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {};

export { resolveQuery, stringifyQuery, handleMethod, extend, setOpt, awaitWrap, isType, getType, Global, isStandardBrowserEnv };
