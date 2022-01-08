import fs from "fs";

export function arrayFromInput(pathToFile) {
  const rawInput = fs.readFileSync(pathToFile, { encoding: "utf8" });
  return (
    rawInput
      // Split per line
      .split("\n")
      // Remove empty lines from the array
      .filter((value) => value)
      // Remove all newline characters that might still exist
      .map((value) => value.replace(/[\n\r]+/g, ""))
  );
}
