// 题目： 对树进行遍历，从第一个节点开始，遍历其子节点，直到它的所有子节点都被遍历完毕，然后再遍历它的兄弟节点

// 输入： 
// tree=[
//   {
//     "id": 1,
//     "title": "child1",
//     "parentId": 0,
//     "children": [
//       {
//         "id": 3,
//         "title": "child1_1",
//         "parentId": 1
//       },
//       {
//         "id": 4,
//         "title": "child1_2",
//         "parentId": 1
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "title": "child2",
//     "parentId": 0,
//     "children": [
//       {
//         "id": 5,
//         "title": "child2_1",
//         "parentId": 2
//       }
//     ]
//   }
// ]

// 输出： [1, 3, 4, 2, 5]

let tree=[
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

function deepTree(tree, arr = []) {
  if (!tree || !tree.length) return arr
  tree.forEach(i => {
    console.log('i===>',i);
    arr.push(i.id)

    i.children && deepTree(i.children, arr)
  })
  return arr
}

let a = deepTree(tree)
console.log('a===>', a);