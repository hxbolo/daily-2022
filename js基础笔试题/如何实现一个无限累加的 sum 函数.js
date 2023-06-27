function sum(...args) {
  console.log('args',args);
  const f = (...rest) => sum(...args, ...rest);
  f.valueOf = () => args.reduce((x, y) => x + y, 0);
  console.log(f);
  return f;
}


console.log(

  sum(1, 2, 3) + sum(4, 5)
);


function sleep (t = 1000) {
  console.log('>>> sleep start');
  let startTime = +(new Date());
  let curTime = startTime;
  while (true) {
      curTime = +(new Date());
      if (curTime - startTime >= t) break;
  }
  console.log('>>> sleep finish');
}

// test
sleep(3000);
console.log('>>> hi');
