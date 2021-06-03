import reduce from 'lodash/reduce';
import { Global } from '../utils';

export default function combineApi(apis = {}, isScope = true) {
  const apiArr = Global._TDHTTP_APIS = _.entries(apis);

  return reduce(apiArr, (pre, [key, value]) => {
    return isScope ? (pre[key] = value) && pre : { ...pre, ...value };
  }, {});
}
