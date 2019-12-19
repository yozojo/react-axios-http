"use strict";

exports.__esModule = true;
exports.isStandardBrowserEnv = exports.isType = exports.getType = exports.awaitWrap = void 0;

var awaitWrap = function awaitWrap(promise) {
  return promise.then(function (res) {
    return [null, res];
  })["catch"](function (err) {
    return [err, null];
  });
};

exports.awaitWrap = awaitWrap;

var getType = function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

exports.getType = getType;

var isType = function isType(data, type) {
  return type === getType(data);
};

exports.isType = isType;

var isStandardBrowserEnv = function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

exports.isStandardBrowserEnv = isStandardBrowserEnv;