// import { format } from "path";
const fs = require("fs");

// ***** day 7 part 1 https://adventofcode.com/2022/day/7 *****
const commands = fs
  .readFileSync("/data/day7.txt", { encoding: "utf-8" })
  .split("\n");

const TOTAL_SIZE = 70000000;
const NEED_FREE = 30000000;

console.log(commands);
const partOne = (commands) => {
  const dirs = { "/": 0 };
  const dirStack = ["/"];

  for (let i = 1; i < commands.length; i++) {
    const cmd = commands[i];
    if (cmd.startsWith("$ cd ..")) {
      dirStack.pop();
    } else if (cmd.startsWith("$ cd")) {
      const curDirectory = dirStack.toString() + cmd.split(" ")[2];
      if (dirs[curDirectory] === undefined) {
        dirs[curDirectory] = 0;
      }
      dirStack.push(curDirectory);
    } else if (cmd.startsWith("$ ls") || cmd.startsWith("dir")) {
      continue;
    } else {
      dirStack.forEach((dir) => {
        dirs[dir] += parseInt(cmd.split(" ")[0]);
      });
    }
  }

  const needToDelete = NEED_FREE - (TOTAL_SIZE - dirs["/"]);
  const willDelete = Object.values(dirs)
    .filter((val) => val >= needToDelete)
    .sort((a, b) => a - b)[0];

  console.log("part 2: ", willDelete);

  let sum = 0;
  Object.keys(dirs).forEach((dir) => {
    if (dirs[dir] <= 100000) {
      sum += dirs[dir];
    }
  });
  return sum;
};

console.log("Part 1: ", partOne(commands));
