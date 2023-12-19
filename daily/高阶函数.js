setTimeout(function () {
  var a = 'hello'
  setTimeout(function () {
    var b = 'lagou'
    setTimeout(function () {
      var c = 'I ❤️ U'
      console.log(a + b + c)
    }, 10)
  }, 10)
}, 10)

new Promise((resolve) => {
  var a = 'hello'
  resolve(a)
})
  .then((resolvea) => {
    var b = 'lagou'
    return resolvea + b
  })
  .then((resolveb) => {
    var c = 'I ❤️ U'
    // console.log(a + b + c)
    return resolveb + c
  })

async function aaa() {
  let a = await Promise.resolve('helloP')
  let b = await Promise.resolve('lagou')
  let c = await Promise.resolve('I ❤️ U')
  console.log(a + b + c)
}

console.log(aaa)

const fp = require('lodash/fp')
// 数据：horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  { name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  { name: 'Audi R8', horsepower: 525, dollar_value: 114200, in_stock: false },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true,
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false,
  },
]
