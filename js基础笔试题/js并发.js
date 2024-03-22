// 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// sendRequest(requestList:,limits,callback):voidsendRequest([()=>request('1'),()=>request('2'),()=>request('3'),()=>request('4')],3, 
//并发数(res)=>{    console.log(res)})
// 其中request 可以是： 
function request(url, time = 1) {    
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('请求结束：' + url);
      if (Math.random() > 0.5) { resolve('成功') } else { reject('错误;') }
    }, time * 1e3)
  })
}
let year = 2023
let month=10

let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
//     daysInMonth[1] = 29;
// }
// 获得指定年月的1号是星期几
let targetDay = new Date(year, month, 1).getDay();
console.log('targetDay',targetDay);