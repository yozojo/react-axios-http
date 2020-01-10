
const isStandardBrowserEnv = () => {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

function isPost(method) {
  return !!method && /post/.test(method.toLowerCase());
}

function isPut(method) {
  return !!method && /put/.test(method.toLowerCase());
}

function getDOP(method, opt, isQuery, others = {}) {
  return isPost(method)
    ? { data: opt, ...others }
    : { [isPut(method) && isQuery ? 'data' : 'params']: opt, ...others };
}

function handleMethod(params) {
  const { method } = params;
  const methodMap = {
    post: 'Post',
    get: 'Get',
    put: 'Put',
    getjsonp: 'GetJsonp',
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

function isFormDataFunc(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

function setOpt({ method, opt = {}, isFormData = false, isQuery = false, ...others }) {
  if (isFormData && !isQuery && !isFormDataFunc(opt)) {
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

function awaitWrap(promise) {
  return promise.then(res => [null, res]).catch(err => [err, null]);
};

const getType = data => {
  return Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();
};

const isType = (data, type) => {
  return type === getType(data);
};

export { handleMethod, extend, setOpt, awaitWrap, isType, getType, isStandardBrowserEnv};