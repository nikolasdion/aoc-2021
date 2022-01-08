import { arrayFromInput } from "./utils.js";

const input = arrayFromInput("03-input.txt");

// Counter is an array of the object {one: number, zero: number}
function initCounter(input) {
  let counter = new Array(input[0].length);

  for (let index = 0; index < input[0].length; index++) {
    counter[index] = { one: 0, zero: 0 };
  }

  return counter;
}

function count(binaryNum, counter) {
  for (let index = 0; index < binaryNum.length; index++) {
    switch (binaryNum[index]) {
      case "1":
        counter[index].one += 1;
        break;
      case "0":
        counter[index].zero += 1;
        break;
      default:
        console.log(`Unknown binary digit: "${binaryNum[index]}"`);
    }
  }
}

function gammaRate(counter) {
  let binaryString = "";

  counter.forEach((digitCount) => {
    if (digitCount.one > digitCount.zero) binaryString += "1";
    else if (digitCount.one < digitCount.zero) binaryString += "0";
    else console.log(`Can't process digitCount: ${digitCount}`);
  });

  return parseInt(binaryString, 2);
}

function epsilonRate(counter) {
  let binaryString = "";

  counter.forEach((digitCount) => {
    if (digitCount.one < digitCount.zero) binaryString += "1";
    else if (digitCount.one > digitCount.zero) binaryString += "0";
    else console.log(`Can't process digitCount: ${digitCount}`);
  });

  return parseInt(binaryString, 2);
}

function mostCommonDigit(binaryNumbers, index) {
  let counter = { one: 0, zero: 0 };
  binaryNumbers.forEach((binary) => {
    if (binary[index] === "1") counter.one += 1;
    else if (binary[index] === "0") counter.zero += 1;
  });
  return counter.one >= counter.zero ? "1" : "0";
}

function leastCommonDigit(binaryNumbers, index) {
  let counter = { one: 0, zero: 0 };
  binaryNumbers.forEach((binary) => {
    if (binary[index] === "1") counter.one += 1;
    else if (binary[index] === "0") counter.zero += 1;
  });
  return counter.one < counter.zero ? "1" : "0";
}

function oxygenRating(input) {
  let binaryNumbers = [...input];

  for (let index = 0; index < input[0].length; index++) {
    const mostCommon = mostCommonDigit(binaryNumbers, index);
    binaryNumbers = binaryNumbers.filter(
      (binary) => binary[index] === mostCommon
    );
    if (binaryNumbers.length === 1) return parseInt(binaryNumbers[0], 2);
  }

  // If we've gone through all and still have more than one, that means they're identical
  return binaryNumbers[0];
}

function co2Rating(input) {
  let binaryNumbers = [...input];

  for (let index = 0; index < input[0].length; index++) {
    const leastCommon = leastCommonDigit(binaryNumbers, index);
    binaryNumbers = binaryNumbers.filter(
      (binary) => binary[index] === leastCommon
    );
    if (binaryNumbers.length === 1) return parseInt(binaryNumbers[0], 2);
  }

  // If we've gone through all and still have more than one, that means they're identical
  return binaryNumbers[0];
}

function part1(input) {
  const counter = initCounter(input);
  input.forEach((binaryNum) => count(binaryNum, counter));
  return gammaRate(counter) * epsilonRate(counter);
}

function part2(input) {
  return oxygenRating(input) * co2Rating(input);
}

console.log(`The answer to part 1 is: ${part1(input)}`);
console.log(`The answer to part 2 is: ${part2(input)}`);
