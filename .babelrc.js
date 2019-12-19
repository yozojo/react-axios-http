const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true
const hasCorejs = /development|production/.test(NODE_ENV);

module.exports = {
  presets: [['@babel/preset-env', { loose, modules: false }]],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose }],
    '@babel/plugin-transform-react-jsx',
    cjs && ['@babel/plugin-transform-modules-commonjs', { loose }],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: hasCorejs && 2,
        useESModules: !cjs,
        version: require('./package.json').dependencies[
          '@babel/runtime'
        ].replace(/^[^0-9]*/, '')
      }
    ]
  ].filter(Boolean)
}

