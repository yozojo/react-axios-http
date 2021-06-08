import reduce from 'lodash/reduce';
import { Global } from '../utils';
import entries from 'lodash/entries'

export default function combineApi(apis = {}, isScope = true) {
  const apiArr = Global._TDHTTP_APIS = entries(apis);

  return reduce(apiArr, (pre, [key, value]) => {
    return isScope ? (pre[key] = value) && pre : { ...pre, ...value };
  }, {});
}
