  // async  
  function sleep1 (ms){
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }
  async function test(){
    let temple = await sleep1(1000)
    console.log(1);
    return temple
  }

  test()