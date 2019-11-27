const IO = {};

window._TDHTTP_RESULT_MODE = 'native';

Object.defineProperty(IO, 'resultMode', {
  set(value) {
    window._TDHTTP_RESULT_MODE = value;
  },

  get() {
    return window._TDHTTP_RESULT_MODE;
  },

  enumerable: false,
  configurable: false
})

export default IO;