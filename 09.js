import { arrayFromInput } from "./utils.js";

const inputLines = arrayFromInput("09-input.txt");

const map = inputLines.map((lineStr) =>
  [...lineStr].map((numStr) => parseInt(numStr))
);

function isLowPoint(x, y, map) {
  const value = map[x][y];
  const up = map[x][y - 1];
  const down = map[x][y + 1];
  const left = map[x - 1] ? map[x - 1][y] : undefined;
  const right = map[x + 1] ? map[x + 1][y] : undefined;

  const lowerThanUp = up === undefined ? true : value < up;
  const lowerThanDown = down === undefined ? true : value < down;
  const lowerThanLeft = left === undefined ? true : value < left;
  const lowerThanRight = right === undefined ? true : value < right;

  return lowerThanUp && lowerThanDown && lowerThanLeft && lowerThanRight;
}

function part1(map) {
  let riskLevelTotal = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (isLowPoint(x, y, map)) riskLevelTotal += map[x][y] + 1;
    }
  }

  return riskLevelTotal;
}

function part2(map) {
  // TODO
}

console.log(`The answer to part 1 is: ${part1(map)}`);
console.log(`The answer to part 2 is: ${part2(map)}`);
