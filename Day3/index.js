// import { format } from "path";
const fs = require("fs");

// ***** day 3 part 1 https://adventofcode.com/2022/day/3 *****
const sacks = fs
  .readFileSync("/data/day3.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x));

const letterValues = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const findCommon = (sack) => {
  const one = sack.slice(0, sack.length / 2);
  const two = sack.slice(sack.length / 2);

  for (let i = 0; i < one.length; i++) {
    if (two.includes(one[i])) {
      return one[i];
    }
  }
  return null;
};

const sumPriorities = (sacks) => {
  let sum = 0;
  sacks.forEach((sack) => {
    const letter = findCommon(sack);
    const value = letterValues.indexOf(letter);
    sum += value;
  });
  return sum;
};

console.log(sumPriorities(sacks));
// *** part 2

console.log(sacks);

const sumTrio = (one, two, three) => {
  let letter;
  for (let j = 0; j < one.length; j++) {
    if (two.includes(one[j])) {
      if (three.includes(one[j])) {
        letter = one[j];
      }
    }
  }
  const value = letterValues.indexOf(letter);
  return value;
};

const partTwo = (sacks) => {
  let sum = 0;
  for (let i = 0; i <= sacks.length - 2; i += 3) {
    const one = sacks[i];
    const two = sacks[i + 1];
    const three = sacks[i + 2];
    const x = sumTrio(one, two, three);
    sum += x;
  }
  return sum;
};

console.log(partTwo(sacks));
