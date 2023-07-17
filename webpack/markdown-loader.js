const marked = require('marked');

module.exports = source =>{
  const html = marked(source)
  // webpack 只解析js  
  // return `export default=${JSON.stringify(html)}`

  // 返回html 字符串交给下一个loader处理

  return html
}

// loader => 是一个从输入到输出的转换

// 是一个管道的概念，同一个资源可以依次使用多个loader
// css-loader , style-loader