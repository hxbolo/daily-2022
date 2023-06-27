function onceCache(fn) {
  let toggle = false,
    ret = null;
  return function () {
    if (toggle) return ret;
    toggle = true;
    return (ret = fn.apply(this, arguments));
  };
}

const f = (x) => x;
const onceF = onceCache(f);

console.log(

  onceF(3)
);
console.log(

  onceF(4)
);