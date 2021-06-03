import forEach from 'lodash/forEach';

function Interceptor() {
  this.handlers = [];
}

Interceptor.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
  });
  return this.handlers.length - 1;
};

Interceptor.prototype.forEach = function (fn) {
  forEach(this.handlers, h => {
    if (h !== null) {
      fn(h);
    }
  });
};

export default Interceptor;
