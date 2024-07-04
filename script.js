const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length;
// here in this reduce function acc(accumulator) is used to sum all the elements in the array. The acc value is initialized after the inside function. The reduce function is used to get the sum of all elements which further is divided by the length of the given array.

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b); // (a,b)=> a-b  is used to sort the array in ascending order.
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]]) //for even no. of elements in the array.
      : sorted[Math.floor(array.length / 2)]; //for odd no. of elements in the array.
  return median;
};

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
    /* In this forEach function, the array is traversed if the element is not present in the counts object declared above, the element is added as property in the counts object with its value initialized as 1. If the element is present as property then they are incremented by one. 
    counts[el] = (counts[el] || 0) + 1; 
    This line checks whether the element exist as a property in the counts object. If it is present the first one is chosen from (counts[el]||0) i.e., counts[el]. If it is not present then the second value is chosen i.e., zero. Then at last both the cases are incremented.*/
  });
  if (new Set(Object.values(counts)).size === 1) {
    //The Set object lets you store unique values of any type, whether primitive values or object references.
    //the Object.values() returns the keys of property as an array. Here then the array is converted to set to check whether all the elements present the same amount of time. If it's true then the condition return null.
    return null;
  }
  const highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  // the keys are arranged in descending order and the first value is taken to be the value of the mode.
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
    // this is done to make sure to return all the mode since there is a possibility of more than one mode.
  );
  return mode.join(", ");
};

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
  // range is the difference of the biggest element minus the smallest element.
};

const getVariance = (array) => {
  const mean = getMean(array);
  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean; //stores the difference of the element and mean.
      const squared = difference ** 2; // the difference is squared.
      return acc + squared; //the squared difference is then added to the accumulator.
    }, 0) / array.length;
  return variance;
};

const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance); // Math.sqrt returns the square root of the given number.
  return standardDeviation;
};

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  // The use of regex is to make sure that the input is taken correctly even if there are spaces after commas such as 2,3, 4,5.
  const numbers = array.map((el) => Number(el)).filter((el) => !isNaN(el));
  // the inputs are recieve as string then they are converted using Number().

  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
};
/* 
Key learnings:

1) The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
syntax: 
  reduce(callbackFn)
  reduce(callbackFn, initialValue)
  
2)Set objects are collections of values. A value in the set may only occur once; it is unique in the set's collection. You can iterate through the elements of a set in insertion order. The insertion order corresponds to the order in which each element was inserted into the set by the add() method successfully (that is, there wasn't an identical element already in the set when add() was called).

3)The Object.values() static method returns an array of a given object's own enumerable string-keyed property values.
example:
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};
console.log(Object.values(object1));
// Expected output: Array ["somestring", 42, false]

4)The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
example:
const object1 = {
  a: 'somestring',
  b: 42,
  c: false,
};

console.log(Object.keys(object1));
// Expected output: Array ["a", "b", "c"]



*/
