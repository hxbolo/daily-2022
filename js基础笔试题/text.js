function change(arr) {
    return arr.reduce((pre, { key, value }) => {
pre[key] = value;
 return pre
    }, {})
}
​
let a = change([{ key: 'a', value: '1' }, { key: 'b', value: '2' }])
console.log(a)
 