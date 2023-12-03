import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  console.log("Hallå där Jörgon");
  var result = 0;

  for (let i = 0; i < input.length; i++) {
    let prevLine = "";
    let currLine = input[i];
    let nextLine = "";

    if (i != 0) {
      prevLine = input[i - 1];
    }

    if (i != input.length - 1) {
      nextLine = input[i + 1];
    }

    // Match all numbers on the line
    let matches = [...currLine.matchAll(/\d+/g)];
    //let matches = [...currLine.matchAll(/136.......[\.$]/g)];

    for (const match of matches) {
      // Get the positions we need to check
      console.log(match);
      let positions = getPositions(
        match.index,
        match[0].length,
        currLine.length,
      );
      console.log(positions);
      if (checkPositions(prevLine, currLine, nextLine, positions)) {
        result = result + Number(match[0]);
        console.log("match: " + match[0] + " " + result);
      }
    }
  }

  return result;
};

const checkPositions = (prevLine, currLine, nextLine, positions) => {
  for (const position of positions) {
    if (prevLine != "") {
      if (prevLine[position].match(/\d|\./) == null) return true;
    }
    if (nextLine != "") {
      if (nextLine[position].match(/\d|\./) == null) return true;
    }

    if (currLine[position].match(/\d|\./) == null) return true;
  }
};

const getPositions = (startIndex, wordLength, lineLength) => {
  let positions = [];

  // X-Positions before and after the word
  if (startIndex != 0) positions.push(startIndex - 1);
  if (startIndex + wordLength != lineLength)
    positions.push(startIndex + wordLength);

  // X-Positions for the word
  for (let i = 0; i < wordLength; i++) {
    positions.push(startIndex + i);
  }
  // Return distinct positions
  return [...new Set(positions)];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
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
