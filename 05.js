import { arrayFromInput } from "./utils.js";

const input = arrayFromInput("05-input.txt");

const lines = input.map((rawLine) => {
  const [rawStart, rawEnd] = rawLine.split(" -> ");
  return {
    start: rawStart.split(",").map((str) => parseInt(str)),
    end: rawEnd.split(",").map((str) => parseInt(str)),
  };
});

function emptyBoard() {
  const emptyRow = new Array(1000).fill(0);
  return new Array(1000).fill(null).map(() => [...emptyRow]);
}

function isYLine(line) {
  return line.start[0] === line.end[0];
}

// Lines from (p,q) => (p,r)
function drawYLine(line, board) {
  const x = line.start[0];
  const yStart = Math.min(line.start[1], line.end[1]);
  const yEnd = Math.max(line.start[1], line.end[1]);

  for (let y = yStart; y < yEnd + 1; y++) {
    board[x][y] += 1;
  }
}

function isXLine(line) {
  return line.start[1] === line.end[1];
}

// Lines from (p,q) => (r,q)
function drawXLine(line, board) {
  if (line.start[1] !== line.end[1]) return;

  const y = line.start[1];
  const xStart = Math.min(line.start[0], line.end[0]);
  const xEnd = Math.max(line.start[0], line.end[0]);

  for (let x = xStart; x < xEnd + 1; x++) {
    board[x][y] += 1;
  }
}

function isDiagonalUpLine(line) {
  return line.start[0] - line.end[0] === line.start[1] - line.end[1];
}

// Lines from (p,q) => (p+r,q+r)
function drawDiagonalUpLine(line, board) {
  const xStart = Math.min(line.start[0], line.end[0]);
  const yStart = Math.min(line.start[1], line.end[1]);

  const xEnd = Math.max(line.start[0], line.end[0]);

  const range = xEnd - xStart;

  for (let offset = 0; offset < range + 1; offset++) {
    board[xStart + offset][yStart + offset] += 1;
  }
}

function isDiagonalDownLine(line) {
  return line.start[0] - line.end[1] === line.end[0] - line.start[1];
}

// Lines from (p,q) => (p+r,q-r)
function drawDiagonalDownLine(line, board) {
  const xStart = Math.min(line.start[0], line.end[0]);
  const yStart = Math.max(line.start[1], line.end[1]);

  const xEnd = Math.max(line.start[0], line.end[0]);

  const range = xEnd - xStart;

  for (let offset = 0; offset < range + 1; offset++) {
    board[xStart + offset][yStart - offset] += 1;
  }
}

function drawXOrYLine(line, board) {
  if (isXLine(line)) drawXLine(line, board);
  else if (isYLine(line)) drawYLine(line, board);
}

function drawAnyLine(line, board) {
  if (isXLine(line)) drawXLine(line, board);
  else if (isYLine(line)) drawYLine(line, board);
  else if (isDiagonalUpLine(line)) drawDiagonalUpLine(line, board);
  else if (isDiagonalDownLine(line)) drawDiagonalDownLine(line, board);
}

function countIntersections(board) {
  let count = 0;

  board.flat().forEach((number) => {
    if (number >= 2) count += 1;
  });

  return count;
}

function part1() {
  const board = emptyBoard();
  lines.forEach((line) => drawXOrYLine(line, board));
  return countIntersections(board);
}

function part2() {
  const board = emptyBoard();
  lines.forEach((line) => drawAnyLine(line, board));
  return countIntersections(board);
}

console.log(`The answer to part 1 is: ${part1()}`);
console.log(`The answer to part 2 is: ${part2()}`);
