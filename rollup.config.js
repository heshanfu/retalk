import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;
const config = {
  input: 'src/index.js',
  external: ['redux'],
  plugins: [],
};

if (env === 'es' || env === 'cjs') {
  config.output = { format: env };
  config.plugins.push(
    babel({
      exclude: 'node_modules/**',
    }),
  );
}

if (env === 'development' || env === 'production') {
  config.output = {
    format: 'umd',
    name: 'Retalk',
    globals: {
      redux: 'redux',
    },
  };
  config.plugins.push(
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  );
}

if (env === 'production') {
  config.plugins.push(
    uglify({
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
