function red() {
  console.log('red');
}

function green() {
  console.log("green");
}
function blue() {
  console.log('blue');
}


function wait(call, time) {
  return new Promise((reslove) => {
    setTimeout(() => {
      call()
      reslove()
    }, time);
  })
}

function main(){
  wait(red, 1000)
    .then(() =>{ return wait(green, 2000)}  )
    .then(() => { return wait(blue, 3000) } )
    .then(main)
}
main()