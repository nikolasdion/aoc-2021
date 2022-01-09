import { arrayFromInput } from "./utils.js";

const inputLines = arrayFromInput("08-input.txt");

const input = inputLines.map((line) => {
  const [signalStr, outputStr] = line.split(" | ");
  const signal = signalStr
    .trim()
    .split(" ")
    .map((letters) => letters.split(""));
  const output = outputStr
    .trim()
    .split(" ")
    .map((letters) => letters.split(""));
  return { signal, output };
});

function is1478(signalOrOutput) {
  switch (signalOrOutput.length) {
    case 2: // 1
    case 3: // 7
    case 4: // 4
    case 7: // 8
      return true;
    default:
      return false;
  }
}

// - out of 5-segment digits
//   - only 3 contains all the segments of 1
//   - between 2 & 5, 2 has 2 segment overlap with 4 and 5 has 3 segment overlap with 4
// - out of 6-segment digits
//   - 9 contains all segments of 4
//   - between 0 and 6, 0 has all the segments of 1

function populateDictionary(signalOrOutput, dictionary) {
  switch (signalOrOutput.length) {
    case 2: // 1
      dictionary.one = signalOrOutput;
      return;
    case 3: // 7
      dictionary.seven = signalOrOutput;
      return;
    case 4: // 4
      dictionary.four = signalOrOutput;
      return;
    default:
      return;
  }
}

function sixSegmentDigit(signalOrOutput, dictionary) {
  if (dictionary.four.every((letter) => signalOrOutput.includes(letter)))
    return "9";
  else if (dictionary.one.every((letter) => signalOrOutput.includes(letter)))
    return "0";
  else return "6";
}

function fiveSegmentDigit(signalOrOutput, dictionary) {
  if (dictionary.one.every((letter) => signalOrOutput.includes(letter)))
    return "3";
  else {
    const overlapWithFour = signalOrOutput.filter((letter) =>
      dictionary.four.includes(letter)
    ).length;

    if (overlapWithFour === 2) return "2";
    else if (overlapWithFour === 3) return "5";
    else console.log(`Weird overlap with four for signal ${signalOrOutput}`);
  }
}

function convertToDigit(signalOrOutput, dictionary) {
  if (signalOrOutput.length === 2) return "1";
  if (signalOrOutput.length === 3) return "7";
  if (signalOrOutput.length === 4) return "4";
  if (signalOrOutput.length === 7) return "8";
  if (signalOrOutput.length === 6)
    return sixSegmentDigit(signalOrOutput, dictionary);
  if (signalOrOutput.length === 5)
    return fiveSegmentDigit(signalOrOutput, dictionary);

  console.log(`Weird length! ${signalOrOutput}`);
}

function getNumberFromSignals(signal, dictionary) {
  const digits = signal.map((signalDigit) =>
    convertToDigit(signalDigit, dictionary)
  );
  const str = digits.reduce((str, digitStr) => str + digitStr, "");
  return parseInt(str);
}

function part1() {
  const allOutputs = input.map((line) => line.output).flat();
  return allOutputs.filter(is1478).length;
}

function part2() {
  let total = 0;
  for (const line of input) {
    const dictionary = {};
    line.signal.forEach((signal) => populateDictionary(signal, dictionary));
    line.output.forEach((output) => populateDictionary(output, dictionary));
    const outputNumber = getNumberFromSignals(line.output, dictionary);
    total += outputNumber;
  }
  return total;
}

console.log(`The answer to part 1 is: ${part1()}`);
console.log(`The answer to part 2 is: ${part2()}`);
