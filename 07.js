import fs from "fs";

const input = fs
  .readFileSync("07-input.txt", { encoding: "utf8" })
  .trim()
  .split(",")
  .map((value) => parseInt(value));

function fuelTotalPart1(position) {
  let total = 0;
  for (const crabPosition of input) {
    total += Math.abs(crabPosition - position);
  }
  return total;
}

function fuelTotalPart2(position) {
  let total = 0;
  for (const crabPosition of input) {
    total += fuelPart2(crabPosition, position);
  }
  return total;
}

function fuelPart2(start, end) {
  const distance = Math.abs(start - end);
  let total = 0;
  for (let i = 1; i <= distance; i++) {
    total += i;
  }
  return total;
}

function part1() {
  // Get maximum and minimum value as upper and lower bound of the solution
  const max = input.reduce((current, value) => Math.max(current, value), 0);
  const min = input.reduce((current, value) => Math.min(current, value), 0);

  let lowestFuel;

  for (let position = min; position <= max; position++) {
    const fuel = fuelTotalPart1(position);
    if (!lowestFuel || fuel < lowestFuel) {
      lowestFuel = fuel;
    }
  }

  return lowestFuel;
}

function part2() {
  // Get maximum and minimum value as upper and lower bound of the solution
  const max = input.reduce((current, value) => Math.max(current, value), 0);
  const min = input.reduce((current, value) => Math.min(current, value), 0);

  let lowestFuel;

  for (let position = min; position <= max; position++) {
    const fuel = fuelTotalPart2(position);
    if (!lowestFuel || fuel < lowestFuel) {
      lowestFuel = fuel;
    }
  }

  return lowestFuel;
}

console.log(`The answer to part 1 is: ${part1()}`);
console.log(`The answer to part 2 is: ${part2()}`);
