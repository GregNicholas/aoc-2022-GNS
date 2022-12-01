// import { format } from "path";
const fs = require("fs");

document.getElementById("app").innerHTML = `
<h1>Advent of Code</h1>
`;

// ***** day 1 part 1 https://adventofcode.com/2022/day/1 *****
const elves = fs
  .readFileSync("/data/day1.txt", { encoding: "utf-8" })
  .split("\n\n")
  .filter((x) => Boolean(x))
  .map((x) => {
    return x.split("\n");
  });

const calsPerElf = (elves) => {
  const counts = [];
  elves.forEach((elf) => {
    let calories = elf.reduce((acc, cur) => {
      return acc + parseInt(cur, 10);
    }, 0);
    counts.push(calories);
  });
  return counts;
};

const mostCalories = () => {
  return Math.max(...calsPerElf(elves));
};

const topThree = () => {
  const calsArr = calsPerElf(elves);
  return calsArr
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  // return calsArr[0] + calsArr[1] + calsArr[2];
};

console.log(mostCalories(), topThree());

// day 1 part 2

// const topThree = (elves) => {
//   let counts = []
// }

// const numIncreased = (lines) => {
//   let count = 0;
//   for (let i = 1; i < lines.length; i++) {
//     if (lines[i] > lines[i - 1]) {
//       count++;
//     }
//   }
//   return count;
// };

// console.log("day1 p1: ", numIncreased(lines));

// day 1 part two
// const partTwo = (lines) => {
//   let count = 0;
//   let prev = lines[1] + lines[1] + lines[1];

//   for (let i = 1; i < lines.length - 2; i++) {
//     const group = lines[i] + lines[i + 1] + lines[i + 2];
//     if (group > prev) count++;
//     prev = group;
//   }

//   return count;
// };

// console.log("day1 p2: ", partTwo(lines));
