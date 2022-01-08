import fs from "fs";

const input = fs
  .readFileSync("04-example.txt", { encoding: "utf8" })
  .split("\n\n");

console.log(input);
function part1(input) {}

function part2(input) {}

console.log(`The answer to part 1 is: ${part1(input)}`);
console.log(`The answer to part 2 is: ${part2(input)}`);
