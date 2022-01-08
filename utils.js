import fs from "fs";

export function arrayFromInput(pathToFile) {
  const rawInput = fs.readFileSync(pathToFile, { encoding: "utf8" });
  return rawInput.split("\n").filter((value) => value);
}
