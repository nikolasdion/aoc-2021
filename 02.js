import { arrayFromInput } from "./utils.js";

const input = arrayFromInput("02-input.txt");

function part1(input) {
  const position = {
    horizontal: 0,
    depth: 0,
  };

  function processCommand(command) {
    let [direction, magnitude] = command.split(" ");
    magnitude = parseInt(magnitude);

    switch (direction) {
      case "forward":
        position.horizontal += magnitude;
        break;
      case "up":
        position.depth -= magnitude;
        break;
      case "down":
        position.depth += magnitude;
        break;
      default:
        console.log(`Unknown direction: "${direction}"`);
    }
  }

  input.forEach((command) => processCommand(command));

  return position.horizontal * position.depth;
}

function part2(input) {
  const position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  };

  function processCommand(command) {
    let [direction, magnitude] = command.split(" ");
    magnitude = parseInt(magnitude);

    switch (direction) {
      case "forward":
        position.horizontal += magnitude;
        position.depth += position.aim * magnitude;
        break;
      case "up":
        position.aim -= magnitude;
        break;
      case "down":
        position.aim += magnitude;
        break;
      default:
        console.log(`Unknown direction: "${direction}"`);
    }
  }

  input.forEach((command) => processCommand(command));

  return position.horizontal * position.depth;
}

console.log(`The answer to part 1 is: ${part1(input)}`);
console.log(`The answer to part 2 is: ${part2(input)}`);
