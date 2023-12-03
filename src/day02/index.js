import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  var numbers = [];

  var game = "";
  input.split("\n").map((line) => {
    //console.log(line);
    game = line.split(/^Game (\d+): /)[1];

    let rounds = line.split(/; /);

    let redMax = 0;
    let blueMax = 0;
    let greenMax = 0;

    var result = 0;

    for (const round of rounds) {
      //console.log("round: " + round);

      let red = round.match(/(\d+) red/);
      let blue = round.match(/(\d+) blue/);
      //console.log("blue: " + blue);
      let green = round.match(/(\d+) green/);

      if (red) {
        if (Number(red[1]) > redMax) redMax = Number(red[1]);
      }
      if (blue) {
        if (Number(blue[1]) > blueMax) blueMax = Number(blue[1]);
      }
      if (green) {
        if (Number(green[1]) > greenMax) greenMax = Number(green[1]);
      }
    }

    //console.log(redMax, blueMax, greenMax);

    if (redMax <= 12 && greenMax <= 13 && blueMax <= 14) {
      //console.log("game: " + game + " is valid");
      result = Number(result) + Number(game);
      //console.log("result is " + result);
      numbers.push(Number(game));
    }
  });

  console.log(numbers.reduce((a, b) => Number(a) + Number(b), 0));

  return numbers.reduce((a, b) => Number(a) + Number(b), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  var numbers = [];

  var game = "";
  input.split("\n").map((line) => {
    //console.log(line);
    game = line.split(/^Game (\d+): /)[1];

    let rounds = line.split(/; /);

    let redMax = 0;
    let blueMax = 0;
    let greenMax = 0;

    var result = 0;

    for (const round of rounds) {
      //console.log("round: " + round);

      let red = round.match(/(\d+) red/);
      let blue = round.match(/(\d+) blue/);
      //console.log("blue: " + blue);
      let green = round.match(/(\d+) green/);

      if (red) {
        if (Number(red[1]) > redMax) redMax = Number(red[1]);
      }
      if (blue) {
        if (Number(blue[1]) > blueMax) blueMax = Number(blue[1]);
      }
      if (green) {
        if (Number(green[1]) > greenMax) greenMax = Number(green[1]);
      }
    }

    // console.log(redMax, blueMax, greenMax);
    // console.log(redMax * blueMax * greenMax);
    numbers.push(redMax * blueMax * greenMax);
  });

  console.log(numbers.reduce((a, b) => Number(a) + Number(b), 0));

  return numbers.reduce((a, b) => Number(a) + Number(b), 0);
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
