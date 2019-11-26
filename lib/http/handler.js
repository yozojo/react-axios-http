
function handleMethod(params) {
  const {method} = params;
  const methodMap = {
    post: 'Post',
    get: 'Get',
    getjson: 'GetJsonp'
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

function isPost(method) {
  return !!method && method.toLowerCase() === 'post';
}

function dataOrParams(method, opt, isFormData) {
  opt = opt || {};
  const formData = new FormData();
  for (const key in opt) {
    if (opt.hasOwnProperty(key)) {
      const value = opt[key];
      formData.append(key, value);
    }
  }
  opt = isFormData ? formData : opt;
  return isPost(method) ? { data: opt } : { params: opt };
}

module.exports = {
  handleMethod,
  extend,
  isPost,
  dataOrParams
}