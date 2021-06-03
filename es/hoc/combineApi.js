import _extends from "@babel/runtime/helpers/esm/extends";
import reduce from 'lodash/reduce';
import { Global } from '../utils';
export default function combineApi(apis, isScope) {
  if (apis === void 0) {
    apis = {};
  }

  if (isScope === void 0) {
    isScope = true;
  }

  var apiArr = Global._TDHTTP_APIS = _.entries(apis);

  return reduce(apiArr, function (pre, _ref) {
    var key = _ref[0],
        value = _ref[1];
    return isScope ? (pre[key] = value) && pre : _extends({}, pre, value);
  }, {});
}