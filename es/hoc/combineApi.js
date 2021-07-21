import _extends from "@babel/runtime/helpers/esm/extends";
import reduce from "lodash/reduce";
import { Global } from "../utils";
import entries from "lodash/entries";
import cloneDeep from "lodash/cloneDeep";
export default function combineApi(apis, isScope) {
  if (apis === void 0) {
    apis = {};
  }

  if (isScope === void 0) {
    isScope = true;
  }

  var apiArr = Global._TDHTTP_APIS = entries(cloneDeep(apis));
  return reduce(apiArr, function (pre, _ref) {
    var key = _ref[0],
        value = _ref[1];
    return isScope ? (pre[key] = value) && pre : _extends({}, pre, value);
  }, {});
}