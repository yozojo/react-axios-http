import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  external: ['react'],
  output: {
    format: 'umd',
    name: 'react-axios-http',
    exports: 'named',
    globals: {
      react: 'React',
    },
  },
  plugins: [
    builtins(),
    json({
      include: 'node_modules/**',
    }),
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs({
      namedExports: {
        'prop-types': ['PropTypes'],
      },
    }),
  ],
};

if (env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  );
}

export default config;
