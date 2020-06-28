// rollup.config.js
import babel from '@rollup/plugin-babel';
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'umd',
    name: 'test'
  },
  plugins: [
    resolve(),
    commonjs({ extensions: ['.js', '.ts'] }),
    babel({
      exclude: /node_modules/
    }),
    typescript(),
  ]
};
