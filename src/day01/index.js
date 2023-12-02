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

  let numbers = [];

  const numbersAsLetters = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  input.split("\n").map((line) => {
    let lineNumbers = [];

    // Add the letter numbers
    for (const number in numbersAsLetters) {
      let result = line.matchAll(number);

      for (const match of result) {
        // Save the number and the position
        lineNumbers.push({
          match: Number(numbersAsLetters[match[0]]),
          index: match.index,
        });
      }
    }

    // add the digit numbers
    for (const number of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      let result = line.matchAll(number);

      for (const match of result) {
        // Save the number and the position
        lineNumbers.push({ match: Number(match[0]), index: match.index });
      }
    }

    // Sort the numbers based on the position
    let lineResult = lineNumbers
      .sort((a, b) => {
        return a.index - b.index;
      })
      .map((x) => x.match); // and get the fucking value

    let currentLineNumber = `${lineResult[0]}${
      lineResult[lineResult.length - 1]
    }`;

    numbers.push(currentLineNumber);
  });

  const result = numbers.reduce((a, b) => Number(a) + Number(b), 0);

  return result;
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
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
