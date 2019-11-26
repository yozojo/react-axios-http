function Interceptor() {
  this.handlers = [];
}

Interceptor.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
  });
  return this.handlers.length - 1;
};

Interceptor.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(h => {
    if (h !== null) {
      fn(h);
    }
  });
};


module.exports = Interceptor;
