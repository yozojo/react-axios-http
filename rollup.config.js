import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "rollup-plugin-json";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.js",
  external: ["react"],
  output: {
    format: "umd",
    name: "ReactAxiosHttp",
    exports: "named",
    globals: {
      react: "React",
    },
  },
  plugins: [
    json(),
    resolve({
      preferBuiltins: true,
      mainFields: ["browser", "jsnext", "module", "main"],
    }),
    babel({
      exclude: "**/node_modules/**",
      runtimeHelpers: true,
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    commonjs({
      browser: true,
    }),
  ],
};

if (env === "production") {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    })
  );
}

export default config;
