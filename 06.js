import fs from "fs";

const input = fs
  .readFileSync("06-input.txt", { encoding: "utf8" })
  .trim()
  .split(",")
  .map((value) => parseInt(value));

// Modeling each fish as a member of an array doesn't scale very well, since the number grows
// exponentially and it's expensive to iterate through a very large array.
// Instead we're just counting how many fishes are in a particular day, so our data structure is:
// state[0] tracks the number of fish whose current counter is 0
// state[1] tracks the number of fish whose current counter is 1
// ....
// state[8] tracks the number of fish whose current counter is 8
// And we'll only ever have an array with length 9 to iterate over

const initialState = new Array(9).fill(0);
input.forEach((counter) => (initialState[counter] += 1));

function nextDay(input) {
  const output = new Array(9).fill(0);

  for (let i = 1; i < 9; i++) {
    output[i - 1] = input[i];
  }

  output[8] = input[0];
  output[6] += input[0];

  return output;
}

function progressNDays(days, initialState) {
  let outputState = [...initialState];
  for (let day = 0; day < days; day++) {
    outputState = nextDay(outputState);
  }
  return outputState;
}

function countFish(state) {
  return state.reduce((currentTotal, value) => currentTotal + value, 0);
}

function part1() {
  const endState = progressNDays(80, [...initialState]);
  return countFish(endState);
}

function part2() {
  const endState = progressNDays(256, [...initialState]);
  return countFish(endState);
}

console.log(`The answer to part 1 is: ${part1()}`);
console.log(`The answer to part 2 is: ${part2()}`);
