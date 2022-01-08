import { arrayFromInput } from "./utils.js";

const input = arrayFromInput("03-input.txt");

function mostCommonDigit(binaryNumbers, index) {
  let counter = { one: 0, zero: 0 };
  binaryNumbers.forEach((binary) => {
    if (binary[index] === "1") counter.one += 1;
    else if (binary[index] === "0") counter.zero += 1;
  });
  // If equal, return 1
  return counter.one >= counter.zero ? "1" : "0";
}

function leastCommonDigit(binaryNumbers, index) {
  let counter = { one: 0, zero: 0 };
  binaryNumbers.forEach((binary) => {
    if (binary[index] === "1") counter.one += 1;
    else if (binary[index] === "0") counter.zero += 1;
  });
  // If equal, return 0
  return counter.one < counter.zero ? "1" : "0";
}

function gammaRate(input) {
  let binaryString = "";

  for (let index = 0; index < input[0].length; index++) {
    binaryString += mostCommonDigit(input, index);
  }

  return parseInt(binaryString, 2);
}

function epsilonRate(input) {
  let binaryString = "";

  for (let index = 0; index < input[0].length; index++) {
    binaryString += leastCommonDigit(input, index);
  }

  return parseInt(binaryString, 2);
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
  return gammaRate(input) * epsilonRate(input);
}

function part2(input) {
  return oxygenRating(input) * co2Rating(input);
}

console.log(`The answer to part 1 is: ${part1(input)}`);
console.log(`The answer to part 2 is: ${part2(input)}`);
