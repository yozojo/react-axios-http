export const awaitWrap = promise => {
  return promise.then(res => [null, res]).catch(err => [err, null]);
};

export const getType = data => {
  return Object.prototype.toString
    .call(data)
    .slice(8, -1)
    .toLowerCase();
};

export const isType = (data, type) => {
  return type === getType(data);
};

export const isStandardBrowserEnv = () => {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}