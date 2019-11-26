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