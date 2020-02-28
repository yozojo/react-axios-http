import _ from 'lodash';
import { Global } from '../utils';

export default function combineApi(apis = {}, isScope = true) {
  const apiArr = Global._TDHTTP_APIS = _.entries(apis);

  return Global._TDHTTP_TRUE_APIS = _.reduce(apiArr, (pre, [key, value]) => {
    return isScope ? (pre[key] = value) && pre : { ...pre, ...value };
  }, {});
}
