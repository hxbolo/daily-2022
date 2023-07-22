/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 输入：head = [1,2,3,4,5]
// 输出：[5,4,3,2,1]

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var reverseList = function (head) {
  let prev = null 
  let cur = head
  while(cur){
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}
