

function sort1(info) {
  var rankArr = []
  // 数字0开头
  var zeroArr = info.filter((ele, index) => {
    if (Number(ele.name.substr(0, 1)) === 0) {
      return !isNaN(Number(ele.name.substr(0, 1)))
    }
  })
  // 数字0开头排序
  zeroArr = zeroArr.sort((a, b) => {
    // return parseInt(a.name) - parseInt(b.name)
    return a.name.replace(/[^0-9]/ig, '') - b.name.replace(/[^0-9]/ig, '')
  })
  console.log('zeroArr====',zeroArr);
  rankArr = zeroArr
  // 数字非0开头
  var numArr = info.filter((ele, index) => {
    if (Number(ele.name.substr(0, 1)) !== 0) {
      return !isNaN(Number(ele.name.substr(0, 1)))
    }
  })
  // 数字非0开头排序
  numArr = numArr.sort((a, b) => {
    return a.name.replace(/[^0-9]/ig, '') - b.name.replace(/[^0-9]/ig, '')
  })
  // 汉字开头
  var reg = new RegExp('^[\u4e00-\u9fa5]')
  var wordArr = info.filter((ele, index) => {
    return reg.test(ele.name.substr(0, 1))
  })
  // 汉字开头排序
  wordArr = wordArr.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  // 大写字母开头
  var regUpper = /^[A-Z]+$/
  var upperArr = info.filter((ele, index) => {
    return regUpper.test(ele.name.substr(0, 1))
  })
  // 大写字母开头排序
  upperArr = upperArr.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  // 剩余其他的开头
  var otherArr = info.filter((ele, index) => {
    return isNaN(Number(ele.name.substr(0, 1))) && !reg.test(ele.name.substr(0, 1)) && !regUpper.test(ele.name.substr(0, 1))
  })
  // 剩余其他的开头排序
  otherArr = otherArr.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
  info = rankArr
  info1 = info.concat(numArr, wordArr, upperArr, otherArr)
  console.log('info',info1);
}

var info = [
  { id: 1, name: 'A1', price: '2' },
  { id: 2, name: 'A122', price: '2' },
  { id: 4, name: 'A3', price: '2' },
  { id: 5, name: 'A14', price: '2' },
  { id: 6, name: 'A12', price: '2' },
  // { id: 1, name: '101路', price: '2' },
  // { id: 2, name: '02路', price: '2' },
  // { id: 4, name: '6路', price: '2' },
  // { id: 5, name: '23路', price: '2' },
  // { id: 6, name: '01路', price: '2' },
]

sort1(info)