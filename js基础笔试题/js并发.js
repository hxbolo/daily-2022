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