import fs from "fs";

const input = fs
  .readFileSync("04-input.txt", { encoding: "utf8" })
  .split("\n\n");

const numbers = input[0].split(",");

const boards = input
  .slice(1, input.length)
  .map((boardString) => boardString.split("\n"))
  .map((board) => board.map((rowString) => rowString.trim()))
  .map((board) => board.filter((rowString) => rowString !== ""))
  .map((board) => board.map((rowString) => rowString.split(/[ ]+/)));

function markBoard(calledNumber, board) {
  if (!Array.isArray(board)) return;

  board.forEach((row) => {
    for (let column = 0; column < row.length; column++) {
      if (row[column] === calledNumber) row[column] = "X";
    }
  });
}

function callNumber(calledNumber, boards) {
  boards.forEach((board) => markBoard(calledNumber, board));
}

function isHorizontalBingo(board) {
  return board.some((row) => row.every((number) => number === "X"));
}

function isVerticalBingo(board) {
  for (let column = 0; column < board[0].length; column++) {
    if (board.every((row) => row[column] === "X")) return true;
  }
}

function isBingo(board) {
  if (!Array.isArray(board)) return false;
  if (isHorizontalBingo(board)) return true;
  if (isVerticalBingo(board)) return true;
  else return false;
}

function sumOfUncalledNumbers(board) {
  return board
    .flat()
    .filter((numberStr) => numberStr !== "X")
    .map((numberStr) => parseInt(numberStr))
    .reduce((total, numberStr) => (total += parseInt(numberStr)));
}

function part1() {
  const markedBoards = [...boards];

  for (const calledNumber of numbers) {
    callNumber(calledNumber, markedBoards);

    const bingoBoard = boards.find(isBingo);

    if (bingoBoard) {
      return sumOfUncalledNumbers(bingoBoard) * calledNumber;
    }
  }
}

function part2() {
  const markedBoards = [...boards];
  let lastNumberToBingo;
  let lastBoardToBingo;
  for (const calledNumber of numbers) {
    callNumber(calledNumber, markedBoards);

    for (let index = 0; index < markedBoards.length; index++) {
      const board = markedBoards[index];
      if (isBingo(board)) {
        lastNumberToBingo = calledNumber;
        lastBoardToBingo = board;
        markedBoards[index] = "ALREADY BINGO";
      }
    }
  }

  return sumOfUncalledNumbers(lastBoardToBingo) * lastNumberToBingo;
}

console.log(`The answer to part 1 is: ${part1()}`);
console.log(`The answer to part 2 is: ${part2()}`);
