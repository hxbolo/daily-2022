function sleep(time){
  console.log('开始');
  let timer = +(new Date())
  while(true){
    let cur = +(new Date())
    if(cur - timer >=time ) break
  }
  console.log('结束');
}

sleep(1000)

console.log(1111);