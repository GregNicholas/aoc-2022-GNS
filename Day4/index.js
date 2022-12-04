const fs = require("fs");

// ***** day 4 part 1 https://adventofcode.com/2022/day/4 *****
const data = fs
  .readFileSync("/data/day4.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((s) => {
    return s
      .split(",")
      .map((pair) => pair.split("-"))
      .map((nums) => [Number(nums[0]), Number(nums[1])]);
  });

const getNumOverlapped = (data) => {
  let num = 0;
  data.forEach((pair) => {
    if (
      (pair[0][0] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
      (pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1])
    ) {
      num++;
    }
  });
  return num;
};

// *** part 2 ***
const getAnyOverlap = (data) => {
  let num = 0;
  data.forEach((pair) => {
    if (
      (pair[0][0] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
      (pair[0][1] >= pair[1][0] && pair[0][1] <= pair[1][1]) ||
      (pair[1][0] >= pair[0][0] && pair[1][0] <= pair[0][1]) ||
      (pair[1][1] >= pair[0][0] && pair[1][1] <= pair[0][1])
    ) {
      num++;
    }
  });
  return num;
};

console.log("part 1: ", getNumOverlapped(data));
console.log("part 2: ", getAnyOverlap(data));
