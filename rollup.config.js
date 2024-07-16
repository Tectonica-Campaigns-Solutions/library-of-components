// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/pages/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs', // or 'esm' for ES module
  },
  plugins: [resolve(), commonjs()],
};
