export default function combineApi(apis = {}, isScope = true) {
  const apiArr = Object.entries(apis);

  return apiArr.reduce((pre, [key, value]) => {
    return isScope ? (pre[key] = value) && pre : { ...pre, ...value };
  }, {});
}
