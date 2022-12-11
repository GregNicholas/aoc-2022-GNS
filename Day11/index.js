// import { format } from "path";
const fs = require("fs");

// ***** day 11 part 1 https://adventofcode.com/2022/day/11 *****
const data = fs
  .readFileSync("/data/day7.txt", { encoding: "utf-8" })
  .split("\n");

console.log(data);

const partOne = () => {};

console.log("Part 1: ", partOne());
