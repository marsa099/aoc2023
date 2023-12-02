import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let numbers = [];

  input.split("\n").map((line) => {
    let number = "";
    line.split("").map((char) => {
      if (/^\d/.test(char)) number = number + char;
    });

    if (number !== "") numbers.push(number);
  });

  numbers.map((x) => {
    return x;
  });

  const result = numbers
    .map((x) => {
      let res = `${x[0]}${x[x.length - 1]}`;
      return res;
    })
    .reduce((a, b) => Number(a) + Number(b), 0);

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
