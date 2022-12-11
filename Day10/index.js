const fs = require("fs");

// ***** day 10 part 1 https://adventofcode.com/2022/day/10 *****
const data = fs
  .readFileSync("/data/day10.txt", { encoding: "utf-8" })
  .split("\n");

// console.log(data);

const partOne = () => {
  let cycle = 1;
  let X = 1;
  let sum = 0;
  const crt = [[], [], [], [], [], []];
  data.forEach((ins) => {
    const cmd = ins.split(" ")[0];
    const val = parseInt(ins.split(" ")[1]);

    if ((cycle - 20) % 40 === 0) {
      console.log("Cycle: ", cycle, "X: ", X);
      sum += X * cycle;
    }
    if (cmd === "addx") {
      cycle++;

      if ((cycle - 20) % 40 === 0) {
        console.log("Cycle: ", cycle, "X: ", X);
        sum += X * cycle;
      }
      X += val;
      if (cycle < 22) console.log("cycle ", cycle, ": ", X);
    }
    cycle++;
  });
  console.log(crt);
  return sum;
};

const partTwo = () => {
  let cycle = 1,
    sum = 0,
    x = 1;
  let row = "";

  for (const line of data) {
    const loops = line.startsWith("addx") ? 2 : 1;

    for (let i = 0; i < loops; i++) {
      const column = (cycle - 1) % 40;
      row += x - 1 <= column && column <= x + 1 ? "🧝" : "❄️";
      if (column === 39) {
        console.log(row);
        row = "";
      }
      if ((cycle - 20) % 40 === 0) {
        sum += cycle * x;
      }
      cycle++;
    }

    x += loops === 2 ? +line.split(" ")[1] : 0;
  }
};

console.log(partOne());
partTwo();
