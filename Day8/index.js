// import { format } from "path";
const fs = require("fs");

// ***** day 8 part 1 https://adventofcode.com/2022/day/8 *****
const data = fs
  .readFileSync("/data/day8.txt", { encoding: "utf-8" })
  .split("\n");

const isTopVisible = (pos) => {
  let [row, col] = pos;
  for (let i = row - 1; i >= 0; i--) {
    if (data[i][col] >= data[row][col]) {
      return false;
    }
  }
  return true;
};

const isBottomVisible = (pos) => {
  let [row, col] = pos;
  for (let i = row + 1; i < data.length; i++) {
    if (data[i][col] >= data[row][col]) {
      return false;
    }
  }
  return true;
};

const isLeftVisible = (pos) => {
  let [row, col] = pos;
  for (let i = col - 1; i >= 0; i--) {
    if (data[row][i] >= data[row][col]) {
      return false;
    }
  }
  return true;
};

const isRightVisible = (pos) => {
  let [row, col] = pos;
  for (let i = col + 1; i < data[row].length; i++) {
    if (data[row][i] >= data[row][col]) {
      return false;
    }
  }
  return true;
};

const partOne = () => {
  let numVisible = data[0].length * 4 - 4;
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[i].length - 1; j++) {
      if (
        isTopVisible([i, j]) ||
        isBottomVisible([i, j]) ||
        isLeftVisible([i, j]) ||
        isRightVisible([i, j])
      ) {
        numVisible++;
      }
    }
  }
  return numVisible;
};

const topView = (pos) => {
  let [row, col] = pos;
  let numTrees = 0;
  for (let i = row - 1; i >= 0; i--) {
    if (data[i][col] >= data[row][col]) {
      numTrees++;
      break;
    }
    numTrees++;
  }
  return numTrees;
};

const bottomView = (pos) => {
  let [row, col] = pos;
  let numTrees = 0;
  for (let i = row + 1; i < data.length; i++) {
    if (data[i][col] >= data[row][col]) {
      numTrees++;
      break;
    }
    numTrees++;
  }
  return numTrees;
};

const leftView = (pos) => {
  let [row, col] = pos;
  let numTrees = 0;
  for (let i = col - 1; i >= 0; i--) {
    if (data[row][i] >= data[row][col]) {
      numTrees++;
      break;
    }
    numTrees++;
  }
  return numTrees;
};

const rightView = (pos) => {
  let [row, col] = pos;
  let numTrees = 0;
  for (let i = col + 1; i < data[row].length; i++) {
    if (data[row][i] >= data[row][col]) {
      numTrees++;
      break;
    }
    numTrees++;
  }
  return numTrees;
};

const partTwo = () => {
  let highScore = 0;
  for (let i = 1; i < data.length - 1; i++) {
    for (let j = 1; j < data[i].length - 1; j++) {
      highScore = Math.max(
        topView([i, j]) *
          bottomView([i, j]) *
          leftView([i, j]) *
          rightView([i, j]),
        highScore
      );
    }
  }
  return highScore;
};

console.log("Part 1: ", partOne());
console.log("Part 2: ", partTwo());
