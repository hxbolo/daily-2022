// 样例输入：strs = ['abcdef', 'abdefw', 'abc']
// 输出：'ab'，若没有找到公共前缀则输出空字符串

const findCommonPrefix = (arr) => {
  let str = ''
  const n = arr.map((item) => item.length).sort()[0]
  console.log(n)

  for (let i = 0; i < n; i++) {
    str += arr[0][i]

    if (arr.some((item) => !item.startsWith(str))) {
      return str.slice(0, str.length - 1)
    }
  }
}

console.log(findCommonPrefix(['abcdef', 'abdefw', 'abc']))
