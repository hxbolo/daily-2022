const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 一个函数或者一个包含apply 方法的对象

// 通过在生命周期的钩子函数中挂载函数实现扩展
class MyPlugin {
  apply(compiler) {
    console.log('myplugin')
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      // compilation => 此处打包的上下文
      for (const name in compilation.assets) {
        console.log(compilation.assets[name].source())
        if (name.endsWith('.js')) {
          console.log(111)
          const contents = compilation.assets[name].source()
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          }
        }
      }
    })
  }
}
module.exports = {
  // 配置工作模式
  mode: 'development',
  // 入口
  entry: './src/main.js',
  // 出口
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    // publicPath: 'dist/', // 网站的根目录
  },
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true, //   负责标记【枯树叶】
    // 压缩输出结果
    minimize: true, //  负责【摇掉】，
    concatenateModules: true, //尽可能的将所有模块【合并】输入到一个函数中， 提升运行效率， 减少代码体积
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      // {
      //   test: /.md$/,
      //   use: ['html-loader','./markdown-loader'],
      // },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.png$/,
        // use: 'file-loader',
        use: {
          loader: 'url-loader', //小文件  转换成base64
          options: {
            limit: 10 * 1024, // 10kb
          },
        },
      },
      {
        test: /.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            esModule: false,
            sources: {
              //使用了 sources 属性来指定需要处理的标签和属性
              list: [
                // 处理 img 标签的 src 属性
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                // 处理 a 标签的 href 属性
                {
                  tag: 'a',
                  attribute: 'href',
                  type: 'src',
                },
              ],
            },
          },
        },
      },
    ],
  },
  plugins: [
    // 用于生成html
    new HtmlWebpackPlugin({
      title: 'webpack plugin sample',
      mate: {
        viewport: 'width=device-width',
      },
      template: './src/index.html',
    }),
    //生成about
    new HtmlWebpackPlugin({
      filename: 'about.html',
    }),
    // new MyPlugin({

    // })
    new webpack.HotModuleReplacementPlugin(),
  ],
}
