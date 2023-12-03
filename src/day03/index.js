import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  console.log("Hallå där Jörgen");
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

    for (const match of matches) {
      // Get the positions we need to check
      //console.log(match);
      let positions = getPositions(
        match.index,
        match[0].length,
        currLine.length,
      );
      //console.log(positions);
      if (checkPositionsForAnySymbol(prevLine, currLine, nextLine, positions)) {
        result = result + Number(match[0]);
        //console.log("match: " + match[0] + " " + result);
      }
    }
  }

  return result;
};

const checkPositionsForAnySymbol = (
  prevLine,
  currLine,
  nextLine,
  positions,
) => {
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

// 1. Hitta alla asterixer som är närliggande
// 2. Spara positionerna (som blir som ett id för varje asterix) tillsammans med en
//    lista som initialt endast innehåller siffran som "hittade" asterixen.
// 3. Vi ska ta numrena som är närliggande till de astrixer som har count = 2, och summera numrena.
//           x* y*
// Exempel: {x: 4, y: 5, numbers: [127]}
var testAsterixPos = [{ x: 4, y: 5, numbers: [127] }];

const checkPositionsForAsterix = (
  currentNumber,
  prevLine,
  currLine,
  nextLine,
  positions,
  lineNumber,
  asterixPostions,
) => {
  console.log(
    `checkPositionsForAsterix ${currentNumber} ${lineNumber}. Positions: ${positions}`,
  );
  for (const position of positions) {
    console.log("test 1");
    if (prevLine != "") {
      console.log("test 1.1");
      let prevLineMatch = prevLine[position].match(/\*/);
      if (prevLineMatch != null) {
        console.log(
          `test 1.2 - ${prevLineMatch} - ${position} - ${lineNumber}`,
        );
        console.log(
          "PrevLineMatch: " +
            prevLineMatch +
            " x: " +
            position +
            " y: " +
            (lineNumber - 1),
        );
        console.log("test 1.3");
        let exists = false;
        for (const asterix of asterixPostions) {
          console.log(
            `Asterix.x = ${asterix.x} (${position}) Asterix.y = ${asterix.y} (${
              lineNumber - 1
            })`,
          );
          if (
            Number(asterix.x) == Number(position) &&
            Number(asterix.y) == Number(lineNumber) - 1
          ) {
            console.log("Existing match");
            asterix.numbers.push(currentNumber);
            console.log(
              `Pushing {x: ${asterix.x}, y: ${asterix.y}, numbers: [${asterix.numbers}]}`,
            );
            exists = true;
          }
        }
        if (!exists) {
          console.log(
            "Pushing {x: " +
              position +
              ", y: " +
              lineNumber -
              1 +
              ", numbers: [" +
              currentNumber +
              "]}",
          );
          asterixPostions.push({
            x: position,
            y: lineNumber - 1,
            numbers: [currentNumber],
          });
        }
      }
    }
    console.log("test 2");
    if (nextLine != "") {
      let nextLineMatch = nextLine[position].match(/\*/);
      if (nextLineMatch != null) {
        console.log(
          "NextLineMatch: " +
            nextLineMatch +
            " x: " +
            position +
            " y: " +
            `${lineNumber + 1}`,
        );
        let exists = false;
        for (const asterix of asterixPostions) {
          console.log(asterix.x);
          if (
            Number(asterix.x) == Number(position) &&
            Number(asterix.y) == Number(lineNumber) + 1
          ) {
            console.log("Existing match");
            asterix.numbers.push(currentNumber);
            exists = true;
          }
        }
        if (!exists) {
          console.log(
            "Pushing {x: " +
              position +
              ", y: " +
              lineNumber +
              1 +
              ", numbers: [" +
              currentNumber +
              "]}",
          );
          asterixPostions.push({
            x: position,
            y: lineNumber + 1,
            numbers: [currentNumber],
          });
        }
      }
    }
    // console.log("test 3");
    let currLineMatch = currLine[position].match(/\*/);
    if (currLineMatch != null) {
      console.log(
        "CurrLineMatch: " +
          currLineMatch +
          " x: " +
          position +
          " y: " +
          lineNumber,
      );
      let exists = false;
      for (const asterix of asterixPostions) {
        if (
          Number(asterix.x) == Number(position) &&
          Number(asterix.y) == Number(lineNumber)
        ) {
          console.log("Existing match");
          asterix.numbers.push(currentNumber);
          exists = true;
        }
      }
      if (!exists) {
        console.log(
          "Pushing {x: " +
            position +
            ", y: " +
            lineNumber +
            ", numbers: [" +
            currentNumber +
            "]}",
        );
        asterixPostions.push({
          x: position,
          y: lineNumber,
          numbers: [currentNumber],
        });
      }
    }
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

  console.log("Hallå där Jörgen");
  var result = 0;

  let asterixPostions = [];

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

    for (const match of matches) {
      // Get the positions we need to check
      //console.log(match);
      let positions = getPositions(
        match.index,
        match[0].length,
        currLine.length,
      );
      //console.log(positions);
      checkPositionsForAsterix(
        Number(match[0]),
        prevLine,
        currLine,
        nextLine,
        positions,
        Number(i),
        asterixPostions,
      );
    }
  }

  for (const asterix of asterixPostions) {
    console.log(asterix);
    if (asterix.numbers.length == 2) {
      result = result + Number(asterix.numbers[0]) * Number(asterix.numbers[1]);
    }
  }

  return result;
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
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
