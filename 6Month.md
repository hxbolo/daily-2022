#  HTML&CSS
#  JS
  ## 数据类型
  ## 原型原型链
  ## 作用域作用域链
  ## 执行上下文
  ## 闭包
  ## call apply bind
  ## new
  ## 异步
  ## 浏览器回收机制
  ## 实现发布订阅模式
# web存储
# HTTP
# VUE
# React
# webpack
# 模块化
# 性能
# uniapp & 小程序
# 常见手写
  ### 去重
    ```js
      let arr = [1, 3, 4, 4, 5, 6, 7, 4]
      // new Set
      let newarr = Array.from(new Set(arr))

      // filter
      let a = arr.filter((item, index, array) =>{
        return array.indexOf(item) === index
      })

      // reduce 方法
      let c = arr.reduce((acc, cur) => {
        if(!acc.includes(cur)){
          return [...acc, cur]
        }
        return acc
      }, [])
    ```
# 排序
排序: [https://github.com/hustcc/JS-Sorting-Algorithm](https://github.com/hustcc/JS-Sorting-Algorithm)
在线阅读地址：[https://sort.hust.cc/](https://sort.hust.cc/)
### 1.冒泡排序
  ```js
    function bubble(arr){
      for(let i = 0; i< arr.length-1; i++){
        for(let j = 0; j< arr.length-1-i; j++){
          if(arr[j] > arr[j+1]){   // 相邻两两比较
            let temp = arr[j+ 1]   // 元素交换
            arr[j+1] = arr[j]
            arr[j] = temp
          }
        }
      }
      return arr
    }
  ```

  ### 2.快速排序
  ```js
    function quicksort4(arr) {
      if (arr.length <= 1) return arr
      // 找基准下标
      let provideIndex = Math.floor(arr.length / 2)
      // 找基准下的值
      let provide = arr.splice(provideIndex, 1)[0]
      let left = []
      let right = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < provide) {
          left.push(arr[i])
        } else {
          right.push(arr[i])
        }
      }
      return quicksort4(left).concat([provide], quicksort4(right))
    }
  ```
  ### 3.选择排序
  ```js

    function select2(arr) {
      let minIndex,temp
      for(let i = 0; i< arr.length; i++){
        minIndex = i
        for(let j = i+1; j<arr.length; j++ ){
          if(arr[j] < arr[minIndex]){ // 比对最小值
            minIndex = j              // 将最小数的索引保存
          }
        }
        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp
      }
      return arr
    }
  ```

  ### 4.插入排序
    - 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
    - 算法步骤
      1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
      2. 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）
  ```js
    function insertionSort2(arr){
      let preIndex, current
      for(let i= 1; i< arr.length; i++){
        preIndex = i-1; 
        current = arr[i]
        // 前面一个值 > 当前的值
        while(preIndex >= 0 && arr[preIndex] > current){
          arr[preIndex + 1] = arr[preIndex]
          preIndex--
        }
        arr[preIndex+ 1] = current
      }
      return arr
    }
  ```