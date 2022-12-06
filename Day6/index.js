// import { format } from "path";
const fs = require("fs");

// ***** day 6 part 1 https://adventofcode.com/2022/day/6 *****
const data = fs.readFileSync("/data/day6.txt", { encoding: "utf-8" });
const areUnique = (str) => {
  for (let i = str.length - 1; i >= 0; i--) {
    if (str.indexOf(str[i]) !== i) {
      return false;
    }
  }
  return true;
};

const partOne = (data) => {
  for (let i = 0; i < data.length - 3; i++) {
    if (areUnique(data.slice(i, i + 4))) {
      return i + 4;
    }
  }
};

console.log(partOne(data));
// *** part 2

const partTwo = (data) => {
  for (let i = 0; i < data.length - 13; i++) {
    if (areUnique(data.slice(i, i + 14))) {
      return i + 14;
    }
  }
};

console.log(partTwo(data));
