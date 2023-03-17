// 以横向的维度对树进行遍历，从第一个节点开始，依次遍历其所有的兄弟节点，再遍历第一个节点的子节点，一层层向下遍历

// 输入： / 输入： 
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

// 输出： [1, 2, 3, 4, 5]


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

function rangeTree(tree) {
  if (!tree || !tree.length) return;
  let arr = [];
  let node, list = [...tree];
  // 取出当前节点
  while ((node = list.shift())) {
    console.log('node===>', node);
    arr.push(node.id);

    // console.log('node.children==>',node.children);
    node.children && list.push(...node.children);
  }
  return arr;
}

let a = rangeTree(tree)
console.log('a===>',a);
