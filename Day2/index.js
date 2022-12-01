// import { format } from "path";
const fs = require("fs");

// ***** day 1 part 1 https://adventofcode.com/2022/day/1 *****
const lines = fs
  .readFileSync("/data/day1.txt", { encoding: "utf-8" })
  .split("\n\n")
  .filter((x) => Boolean(x))
  .map((x) => {
    return x.split("\n");
  });

console.log(lines);
