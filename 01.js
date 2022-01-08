import { arrayFromInput } from "./utils.js";

const input = arrayFromInput("01-input.txt").map((value) => parseInt(value));

function part1(input) {
  let count = 0;

  for (let index = 1; index < input.length; index++) {
    if (input[index] > input[index - 1]) count += 1;
  }

  return count;
}

function part2(input) {
  function segmentSum(lastIndex) {
    return input[lastIndex] + input[lastIndex - 1] + input[lastIndex - 2];
  }

  let count = 0;

  for (let index = 3; index < input.length; index++) {
    if (segmentSum(index) > segmentSum(index - 1)) count += 1;
  }

  return count;
}

console.log(`The answer to part 1 is: ${part1(input)}`);
console.log(`The answer to part 2 is: ${part2(input)}`);
