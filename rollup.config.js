// rollup.config.js
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import filesize from "rollup-plugin-filesize";
import clear from "rollup-plugin-clear";
import { terser } from "rollup-plugin-terser";
export default {
  input: "src/main.ts",
  output: [
    {
      file: "dist/imgLazyload.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/imgLazyload.common.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/imgLazyload.js",
      name: "imgLazyload",
      format: "umd",
      sourcemap: true,
    },
  ],
  plugins: [
    clear({
      targets: ["dist"],
    }),
    commonjs(),
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: "node_modules",
      },
    }),
    typescript(),
    babel({
      babelHelpers: "bundled",
      // 只转换源代码，不运行外部依赖
      exclude: /node_modules/,
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, ".ts"],
    }),
    terser(),
    filesize(),
  ],
};
