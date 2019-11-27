function isPost(method) {
  return !!method && /post/.test(method.toLowerCase());
}

function isPut(method) {
  return !!method && /put/.test(method.toLowerCase());
}

function getDOP(method, opt, isQuery) {
  return isPost(method) ? { data: opt } : { [isPut(method) && isQuery ? 'data' : 'params']: opt };
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

function dataOrParams(method, opt, isFormData, isQuery) {
  opt = opt || {};
  if (isFormData && !isQuery) {
    const formData = new FormData();
    for (const key in opt) {
      if (opt.hasOwnProperty(key)) {
        const value = opt[key];
        formData.append(key, value);
      }
    }
    opt = formData;
  }
  return getDOP(method, opt, isQuery);
}

export { handleMethod, extend, dataOrParams };
