import reduce from "lodash/reduce";
import { Global } from "../utils";
import entries from "lodash/entries";
import cloneDeep from "lodash/cloneDeep";

export default function combineApi(apis = {}, isScope = true) {
  const apiArr = (Global._TDHTTP_APIS = entries(cloneDeep(apis)));

  return reduce(
    apiArr,
    (pre, [key, value]) => {
      return isScope ? (pre[key] = value) && pre : { ...pre, ...value };
    },
    {}
  );
}
