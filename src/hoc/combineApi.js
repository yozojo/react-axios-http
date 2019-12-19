const Global = global || window;

export default function combineApi(apis = {}, isScope = true) {
  const apiArr = Global._TDHTTP_APIS = Object.entries(apis);

  return apiArr.reduce((pre, [key, value]) => {
    return isScope ? (pre[key] = value) && pre : { ...pre, ...value };
  }, {});
}
