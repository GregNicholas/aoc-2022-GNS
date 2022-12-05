const fs = require("fs");

// ***** day 5 part 1 https://adventofcode.com/2022/day/5 *****
const data = fs
  .readFileSync("/data/day5.txt", { encoding: "utf-8" })
  .split("*")
  .filter((x) => Boolean(x));

const stacks = data[0].split("\n");
let directions = data[1].trim().split("\n");

const parsedStacks = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: []
};
for (let i = stacks.length - 3; i >= 0; i--) {
  if (stacks[i][1] !== " ") {
    parsedStacks[1].push(stacks[i][1]);
  }
  if (stacks[i][5] !== " ") {
    parsedStacks[2].push(stacks[i][5]);
  }
  if (stacks[i][9] !== " ") parsedStacks[3].push(stacks[i][9]);
  if (stacks[i][13] !== " ") parsedStacks[4].push(stacks[i][13]);
  if (stacks[i][17] !== " ") parsedStacks[5].push(stacks[i][17]);
  if (stacks[i][21] !== " ") parsedStacks[6].push(stacks[i][21]);
  if (stacks[i][25] !== " ") parsedStacks[7].push(stacks[i][25]);
  if (stacks[i][29] !== " ") parsedStacks[8].push(stacks[i][29]);
  if (stacks[i][33] !== " ") parsedStacks[9].push(stacks[i][33]);
}

let directionNums = directions.map((step) => {
  let trimmed = step.replace("move ", "").split(" from ");

  trimmed[2] = trimmed[1].split(" to ")[1];
  trimmed[1] = trimmed[1].split(" to ")[0];
  return trimmed.map((n) => parseInt(n));
});

const part1 = (parsedStacks, directionNums) => {
  directionNums.forEach((step) => {
    let quantity = step[0];
    const origin = step[1];
    const destination = step[2];
    while (quantity > 0) {
      parsedStacks[destination].push(parsedStacks[origin].pop());
      quantity--;
    }
  });
  return (
    parsedStacks[1][parsedStacks[1].length - 1] +
    parsedStacks[2][parsedStacks[2].length - 1] +
    parsedStacks[3][parsedStacks[3].length - 1] +
    parsedStacks[4][parsedStacks[4].length - 1] +
    parsedStacks[5][parsedStacks[5].length - 1] +
    parsedStacks[6][parsedStacks[6].length - 1] +
    parsedStacks[7][parsedStacks[7].length - 1] +
    parsedStacks[8][parsedStacks[8].length - 1] +
    parsedStacks[9][parsedStacks[9].length - 1]
  );
};

const part2 = (parsedStacks, directionNums) => {
  directionNums.forEach((step) => {
    let quantity = step[0];
    const origin = step[1];
    const destination = step[2];
    parsedStacks[destination].push(
      ...parsedStacks[origin].splice(parsedStacks[origin].length - quantity)
    );
    // while (quantity > 0) {
    //   parsedStacks[destination].push(parsedStacks[origin].pop());
    //   quantity--;
    // }
  });
  return (
    parsedStacks[1][parsedStacks[1].length - 1] +
    parsedStacks[2][parsedStacks[2].length - 1] +
    parsedStacks[3][parsedStacks[3].length - 1] +
    parsedStacks[4][parsedStacks[4].length - 1] +
    parsedStacks[5][parsedStacks[5].length - 1] +
    parsedStacks[6][parsedStacks[6].length - 1] +
    parsedStacks[7][parsedStacks[7].length - 1] +
    parsedStacks[8][parsedStacks[8].length - 1] +
    parsedStacks[9][parsedStacks[9].length - 1]
  );
};

console.log("part 1: ", part1(parsedStacks, directionNums));
console.log("part 2: ", part2(parsedStacks, directionNums));
