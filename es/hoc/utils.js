export var awaitWrap = function awaitWrap(promise) {
  return promise.then(function (res) {
    return [null, res];
  })["catch"](function (err) {
    return [err, null];
  });
};
export var getType = function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};
export var isType = function isType(data, type) {
  return type === getType(data);
};
export var isStandardBrowserEnv = function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
};