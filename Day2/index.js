// import { format } from "path";
const fs = require("fs");

// ***** day 2 part 1 https://adventofcode.com/2022/day/2 *****
const rounds = fs
  .readFileSync("/data/day2.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => {
    return x.split(" ");
  });

  const getRoundScore = (round) => {
    const opp = round[0];
    const me = round[1];
    const shapeScore = me === 'X' ? 1 : me === 'Y' ? 2 : 3

    let winScore = 0;
    if ((opp === 'A' && me === 'Y') || (opp === 'B' && me === 'Z') || (opp === 'C' && me === 'X')){
      winScore = 6;
    } else if((opp === 'A' && me === 'X') || (opp === 'B' && me === 'Y') || (opp === 'C' && me === 'Z')){
      winScore = 3;
    }

    return shapeScore + winScore;
  }

  const getTotalScore = (rounds) => {
    let total = 0;
    rounds.forEach(round => {
      total += getRoundScore(round)
    })
    return total
  }

console.log("part 1: ", getTotalScore(rounds));

// *** part 2 


const getRoundScoreTwo = (round) => {
  const opp = round[0]
  const order = round[1]

  const A = {X: 3, Y: 4, Z: 8}
  const B = {X: 1, Y: 5, Z: 9}
  const C = {X: 2, Y: 6, Z: 7}

  return opp === 'A' ? A[order] : opp === 'B' ? B[order] : C[order]
}

const partTwo = (rounds) => {
  return rounds.reduce((acc, cur) => {
    return acc + getRoundScoreTwo(cur)
  }, 0)
}

console.log("part 2: ", partTwo(rounds))