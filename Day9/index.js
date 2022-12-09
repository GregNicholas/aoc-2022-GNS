// import { format } from "path";
const fs = require("fs");

// ***** day 9 part 1 https://adventofcode.com/2022/day/9 *****
// const data = fs
//   .readFileSync("/data/day9.txt", { encoding: "utf-8" })
//   .split("\n");

// console.log(data);

// const visited = { "0,0": true };

// const moveH = (dir, curPos) => {
//   const Hx = curPos[0];
//   const Hy = curPos[1];

//   const newPos = [Hx, Hy];

//   switch (dir) {
//     case "R":
//       newPos[0] = Hx + 1;
//       break;
//     case "L":
//       newPos[0] = Hx - 1;
//       break;
//     case "U":
//       newPos[1] = Hy + 1;
//       break;
//     case "D":
//       newPos[1] = Hy - 1;
//       break;
//     default:
//       break;
//   }

//   return newPos;
// };

// const moveT = (pos) => {
//   let Hx = pos[0][0];
//   let Hy = pos[0][1];
//   let Tx = pos[1][0];
//   let Ty = pos[1][1];

//   while (Math.abs(Hx - Tx) > 1 || Math.abs(Hy - Ty) > 1) {
//     if (Hx - Tx > 1) {
//       if (Hy - Ty > 0) {
//         Ty++;
//         Tx++;
//       } else if (Ty - Hy > 0) {
//         Ty--;
//         Tx++;
//       } else {
//         Tx++;
//       }
//     } else if (Tx - Hx > 1) {
//       if (Hy - Ty > 0) {
//         Ty++;
//         Tx--;
//       } else if (Ty - Hy > 0) {
//         Ty--;
//         Tx--;
//       } else {
//         Tx--;
//       }
//     } else if (Hy - Ty > 1) {
//       if (Hx - Tx > 0) {
//         Ty++;
//         Tx++;
//       } else if (Tx - Hx > 0) {
//         Ty++;
//         Tx--;
//       } else {
//         Ty++;
//       }
//     } else if (Ty - Hy > 1) {
//       if (Hx - Tx > 0) {
//         Ty--;
//         Tx++;
//       } else if (Tx - Hx > 0) {
//         Ty--;
//         Tx--;
//       } else {
//         Ty--;
//       }
//     }
//   }
//   return [Tx, Ty];
// };

// const partOne = () => {
//   let cur = [
//     [0, 0],
//     [0, 0]
//   ];
//   for (let i = 0; i < data.length; i++) {
//     const dir = data[i][0];
//     let num = data[i][2];

//     for (let i = num; i > 0; i--) {
//       cur[0] = moveH(dir, cur[0]);
//       cur[1] = moveT(cur);
//       // console.log(dir, cur[0], cur[1]);
//       visited[`${cur[1][0]},${cur[1][1]}`] = true;
//     }
//   }
//   console.log(visited, Object.keys(visited).length);
// };

// const partTwo = () => {};

// console.log("Part 1: ", partOne());
// console.log("Part 2: ", partTwo());

// *** Alternate solution ***
// const k = (p) => "_" + p.join("_");
// const dirs = {
//   R: [1, 0],
//   L: [-1, 0],
//   U: [0, -1],
//   D: [0, 1]
// };

// const simulate = (knots) => {
//   let rope = Array.from({ length: knots }, () => [0, 0]),
//     visited = {};

//   data.map((l) => {
//     let cmd = l.split(" "),
//       dx,
//       dy;
//     for (let i = 0; i < Number(cmd[1]); i++) {
//       // advance head
//       rope[0] = rope[0].map((v, d) => v + dirs[cmd[0]][d]);
//       // advance ith point of rope based on (i-1)th point
//       for (let i = 1; i < knots; i++)
//         if (rope[i - 1].some((v, d) => Math.abs(v - rope[i][d]) > 1))
//           rope[i] = rope[i].map((v, d) => v + Math.sign(rope[i - 1][d] - v));
//       // mark tail
//       if (!visited[k(rope[knots - 1])]) visited[k(rope[knots - 1])] = 1;
//     }
//   });

//   return Object.keys(visited).length;
// };

// console.log(simulate(2));
// console.log(simulate(10));

// *** Alternate solution 2 ***

class RopeNode {
  constructor(x, y, id, child) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.child = child;
    this.parent = null;
  }
  toString() {
    return `${this.id}:${this.x},${this.y}`;
  }
}

const getRope = (len) => {
  let prev = null;
  let node = null;
  for (let i = 0; i < len; ++i) {
    node = new RopeNode(0, 0, i, prev);
    if (prev != null) {
      prev.parent = node;
    }
    prev = node;
  }
  return node;
};

const moveNode = (node) => {
  const xDiff = node.x - node.parent.x;
  const yDiff = node.y - node.parent.y;
  if (xDiff > 1) {
    node.x -= 1;
    node.y = Math.abs(yDiff) === 1 ? node.parent.y : node.y;
  } else if (xDiff < -1) {
    node.x += 1;
    node.y = Math.abs(yDiff) === 1 ? node.parent.y : node.y;
  }
  if (yDiff > 1) {
    node.y -= 1;
    node.x = Math.abs(xDiff) === 1 ? node.parent.x : node.x;
  } else if (yDiff < -1) {
    node.y += 1;
    node.x = Math.abs(xDiff) === 1 ? node.parent.x : node.x;
  }
};

const pullRope = (head, dir, len, tailPositions) => {
  for (let j = 0; j < len; ++j) {
    switch (dir) {
      case "U":
        head.y -= 1;
        break;
      case "D":
        head.y += 1;
        break;
      case "L":
        head.x -= 1;
        break;
      case "R":
        head.x += 1;
        break;
      default:
        console.log(`Got unexpected direction: ${dir}`);
    }
    let node = head.child;
    while (node) {
      moveNode(node);
      if (!node.child) {
        const pos = `${node.x},${node.y}`;
        tailPositions[pos] = 1;
      }
      node = node.child;
    }
  }
};

const solve = (err, data) => {
  const tailPositionsPartOne = {};
  const headPartOne = getRope(2);
  const tailPositionsPartTwo = {};
  const headPartTwo = getRope(10);
  const lines = data.toString().split("\n");
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.length === 0) continue;
    const [dir, len] = line.split(" ");
    pullRope(headPartOne, dir, len, tailPositionsPartOne);
    pullRope(headPartTwo, dir, len, tailPositionsPartTwo);
  }
  console.log(Object.keys(tailPositionsPartOne).length);
  console.log(Object.keys(tailPositionsPartTwo).length);
};

fs.readFile("/data/day9.txt", solve);
// fs.readFile("day-09/example.txt", solve);
// fs.readFile("day-09/example-2.txt", solve);
