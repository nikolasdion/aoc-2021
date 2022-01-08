import { arrayFromInput } from "./utils.js";

const input = arrayFromInput("05-input.txt");

const lines = input.map((rawLine) => {
  const [rawStart, rawEnd] = rawLine.split(" -> ");
  return {
    start: rawStart.split(",").map((str) => parseInt(str)),
    end: rawEnd.split(",").map((str) => parseInt(str)),
  };
});

const emptyRow = new Array(1000).fill(0);
const emptyBoard = new Array(1000).fill(null).map(() => [...emptyRow]);

function yLine(line, board) {
  if (line.start[0] !== line.end[0]) return;

  const x = line.start[0];
  const yStart = Math.min(line.start[1], line.end[1]);
  const yEnd = Math.max(line.start[1], line.end[1]);

  for (let y = yStart; y < yEnd + 1; y++) {
    board[x][y] += 1;
  }
}

function xLine(line, board) {
  if (line.start[1] !== line.end[1]) return;

  const y = line.start[1];
  const xStart = Math.min(line.start[0], line.end[0]);
  const xEnd = Math.max(line.start[0], line.end[0]);

  for (let x = xStart; x < xEnd + 1; x++) {
    board[x][y] += 1;
  }
}

function drawXOrYLine(line, board) {
  xLine(line, board);
  yLine(line, board);
}

function countIntersections(board) {
  return board.flat().reduce((count, value) => count + (value >= 2 ? 1 : 0));
}

function part1() {
  const board = [...emptyBoard];
  lines.forEach((line) => drawXOrYLine(line, board));
  return countIntersections(board);
}

function part2() {}

console.log(`The answer to part 1 is: ${part1()}`);
console.log(`The answer to part 2 is: ${part2()}`);
