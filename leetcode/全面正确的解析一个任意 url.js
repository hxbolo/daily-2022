// 尽可能的全面正确的解析一个任意 url 的所有参数为 Object，注意边界条件的处理。
// let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=北京&enabled';

// parse(url)

// {
// user: 'anonymous',
// id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
// city: '北京', // 中文需解码
// enabled: true, // 未指定值得 key 约定为 true
// }

function parse(url) {
  const result = {}
  const urlParts = url.split('?')

  if (urlParts.length === 2) {
    const queryString = urlParts[1]
    const pairs = queryString.split('&')

    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      const decodedKey = decodeURIComponent(key)
      const decodedValue =
        value !== undefined ? decodeURIComponent(value) : true
      console.log('decodedKey', decodedKey, decodedValue)

      // 判断是否可以转成数字，如果可以则转成数字类型
      const numberVal = !isNaN(decodedValue)
        ? Number(decodedValue)
        : decodedValue

      // // 如果已存在相同的 key，且值不是数组，则转成数组存储

      if (
        result[decodedKey] !== undefined &&
        !Array.isArray(result[decodedKey])
      ) {
        result[decodedKey] = [result[decodedKey]]
      }

      // // 如果值是数组，则直接追加
      if (Array.isArray(result[decodedKey])) {
        result[decodedKey].push(numberVal)
      } else {
        result[decodedKey] = numberVal
      }

      console.log(result)
    }
  }

  return result
}

const url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'

const parsedResult = parse(url)
// console.log(parsedResult);
