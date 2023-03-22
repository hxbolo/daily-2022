// 题目： 查找树形结构中符合要求的节点

// 输入：
// tree： 上文第11题生成的tree
// func： data => data.title === "child2_1"

// 输出：{ id: 5, parentId: 2, title: "child2_1" }

let tree = [
    {
      "id": 1,
      "title": "child1",
      "parentId": 0,
      "children": [
        {
          "id": 3,
          "title": "child1_1",
          "parentId": 1
        },
        {
          "id": 4,
          "title": "child1_2",
          "parentId": 1
        }
      ]
    },
    {
      "id": 2,
      "title": "child2",
      "parentId": 0,
      "children": [
        {
          "id": 5,
          "title": "child2_1",
          "parentId": 2
        }
      ]
    }
]
  

/**
* 查找节点
* @param {array} tree - 树
* @param {function} func - 查找条件
* */
// function findTreeNode(tree, func) {
//   for (const data of tree) {
//     // 条件成立 直接返回
//     if (func(data)) return data;
//     if (data.children) {
//       const res = findTreeNode(data.children, func);
//       // 结果存在再返回
//       if (res) return res;
//     }
//   }
//   return null;
// }
function findTreeNode1(tree, func) {
  for (let i of tree){
    if (func(i)) return i
    if (i.children) {
      const res = findTreeNode1(i, children, func)
      if(res) return res
    }
  }
  return null;
}


// 测试
let a = findTreeNode1(tree, data => data.title === "child2_1")
console.log('a===>',a); //{ id: 5, title: 'child2_1', parentId: 2 }
