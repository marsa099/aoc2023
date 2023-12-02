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

  // Starting character in numbers 1-10
  const startingChars = ["o", "t", "t", "f", "f", "s", "s", "e", "n"];
  const numbersAsLetters = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  input.split("\n").map((line) => {
    let lineNumber = "";
    let possibleCharNumbers = []; // list with possible numbers of current line
    line.split("").map((char) => {
      if (/^\d/.test(char)) {
        lineNumber = lineNumber + char;
      } else {
        possibleCharNumbers = possibleCharNumbers.map((x) => `${x}${char}`);

        // If char is same as starting character of a number we create a new entry in the possibleCharNumbers array
        // (This is done after we have added the char to all existing possibleCharNumbers entries
        if (startingChars.includes(char)) possibleCharNumbers.push(char);

        // Check if any of the entries in possibleCharNumbers is a complete number. If true, add it to the lineNumber
        let indexesToRemove = [];
        for (let i = 0; i < possibleCharNumbers.length; i++) {
          if (numbersAsLetters.includes(possibleCharNumbers[i])) {
            lineNumber =
              lineNumber + numbersAsLetters.indexOf(possibleCharNumbers[i]);
            indexesToRemove.push(i);
          }
        }

        //.. and remove them from the list
        indexesToRemove.map((x) => possibleCharNumbers.splice(x, 1));
      }
    });
    // Add the line number to the numbers array
    //console.log("lineNumber: " + lineNumber);
    numbers.push(lineNumber);
  });

  const result = numbers
    .map((x) => {
      let res = `${x[0]}${x[x.length - 1]}`;
      return res;
    })
    .reduce((a, b) => Number(a) + Number(b), 0);

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
