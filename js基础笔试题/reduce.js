const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
  const currCount = allNames[name] ?? 0;
  const currCount1 = allNames[name] ? allNames[name]: 0;

  return {
    ...allNames,
    [name]: currCount1 + 1,
  };
}, {});
console.log(countedNames);

// =============
const people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    const curGroup = acc[key] ?? [];

    return { ...acc, [key]: [...curGroup, obj] };
  }, {});
}

const groupedPeople = groupBy(people, "age");
console.log(groupedPeople);

//  =============  去重
const myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
const myArrayWithNoDuplicates = myArray.reduce((accumulator, currentValue) => {
  if (!accumulator.includes(currentValue)) {
    return [...accumulator, currentValue];
  }
  return accumulator;
}, []);

console.log(myArrayWithNoDuplicates);

// =============代替  .filter().map()
const numbers = [-5, 6, 2, 0];

const doubledPositiveNumbers = numbers.reduce((accumulator, currentValue) => {
  if (currentValue > 0) {
    const doubled = currentValue * 2;
    return [...accumulator, doubled];
  }
  return accumulator;
}, []);


const c = numbers.reduce((acc, curr) => {
  if(curr > 0){
    return [...acc,curr*2]
  }
  return acc
}, [])

const a = numbers.filter(v => v> 0).map(i => i*2)

console.log(doubledPositiveNumbers, '====',a,'====',c); // [12, 4]



const d = '-123'.split('')
d.shift()
const u = null
let g = u ??= 1
console.log(g);