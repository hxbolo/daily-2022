
const target = {
  field1: 1,
  field2: undefined,
  field3: 'ConardLi',
  field4: {
      child: 'child',
      child2: {
          child2: 'child2'
      }
  }
};


// 乞丐版深拷贝
let obj1 = JSON.parse(JSON.stringify(target))

// console.log(obj1);
// =======================================

// 基础版本   未考虑数组
function clone(target) {
  if (typeof target === 'object') {
    let cloneTarget = {}
    for (let key in target) {
      cloneTarget[key]  =  clone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
};

let obj2 = clone(target)
// console.log(obj2);

// 考虑数组深拷贝

const target1 = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8]
};

function clone2(target) {
  if (typeof target === 'Object') {
    let cloneTarget = Array.isArray(target)? []:{}
    for (let key in target) {
      cloneTarget[key] =  clone(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}

// console.log(clone2(target1));

// 循环引用

// function deepClone(obj, map = new Map()) {
//   // if (typeof target === 'Object') {
//   //   // 初始化结果
//   //   let result = Array.isArray(target) ? [] : {}
//   //   if (map.get(tetarget)) {
//   //     return map.get(tetarget)
//   //   }
//   //   map.set(target, result);

//   //   for (let key in target) {
//   //     result[key] =  clone(target[key],map)
//   //   }
//   //   return result
//   // } else {
//   //   return target
//   // }



//   // 判读是不是基础类型
//   if (typeof obj !== 'Object') {
//     return obj
//   }

//   if (map.get(obj)){
//     return obj
//   }
//   // 初始化结果
//   let result = Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object,Array]' ? [] : {}
//   // 防止循环应用
//   map.set(obj, result)
//   for (let key in obj) {
//     // 调用递归
//     result[key] =  deepClone(obj[key], map)
//   }
//   return result
  
// }



function deepClone(obj, map = new Map()) {
  if (typeof obj !== 'object') {
    return obj
  }
  if (map.get(obj)) {
    return obj
  }
  let res = Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object,Array]' ? [] : {}
  // 防止循环调用
  map.set(obj,res)
  for (const key in obj) {
    res[key] =  deepClone(obj[key],map)
  }
  return res
}


function deep(obj, map = new Map()) {
  if (typeof obj != 'object') {
    return obj
  }

  if (map.get(obj)) {
    return obj
  }
  let res = Array.isArray(obj) || object.prototype.toString.call(obj) === '[object,Array]' ? []:{}
  map.set(obj, res)
  for (let key in obj) {
    res[key] = deep(obj[key],map)
  }
  return res
}


console.log(

  deepClone(target1)
);