function transName(arr) {
  let res = arr.map(e => {
      let items = e.split('-').map((item, index) => {
          if (index) {
              let first = item.substring(0,1)
              let rest = item.substring(1)
              return first.toUpperCase()+rest
          }else{
              return item.toLowerCase()
          }
      })
      return items.join('')
  })
  return res
}


function tran2Name2(arr) {
  let res = arr.map(item => {
    aa(item)
  })
  return res
}

function aa(str) {
  console.log(str);
  return String(str).replace(/-[a-zA-Z]/g,match=>match.replace('-','').toUpperCase())
}
console.log(aa(['A-b-cee', 'ca-de-ea', 'e-fe-eaa','f-g','mn']))
