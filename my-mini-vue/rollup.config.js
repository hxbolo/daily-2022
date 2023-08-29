import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
export default {
  // 入口
  input: './src/index.ts',
  output: [
    // cjs -> commomjs
    {
      format: 'cjs',
      file: pkg.main,
    },
    // esm ->es6
    {
      format: 'esm',
      file: pkg.moudle,
    },
  ],
  plugins: [typescript()],
}
