function handleMethod(params) {
  var method = params.method;
  var methodMap = {
    post: 'Post',
    get: 'Get',
    put: 'Put',
    getjson: 'GetJsonp'
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

function isPost(method) {
  return !!method && method.toLowerCase() === 'post';
}

function dataOrParams(method, opt, isFormData) {
  opt = opt || {};
  var formData = new FormData();

  for (var key in opt) {
    if (opt.hasOwnProperty(key)) {
      var value = opt[key];
      formData.append(key, value);
    }
  }

  opt = isFormData ? formData : opt;
  return isPost(method) ? {
    data: opt
  } : {
    params: opt
  };
}

export { handleMethod, extend, isPost, dataOrParams };