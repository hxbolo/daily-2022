function flatMap(arr){
  let list = []
  arr.forEach(item=>{
      if(Array.isArray(item)){
          const l = flatMap(item)
          list.push(...l)
      }else{
          list.push(item)
      }
  })
  return list
}

const a = [1,3,4,[5,6]]

let b = flatMap(a)
console.log(b);
