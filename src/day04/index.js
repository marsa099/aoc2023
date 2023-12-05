import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let totalScore = 0;

  for (const line of input) {
    // prettier-ignore
    let winningNumbers = [...line.split(": ")[1].split("|")[0].matchAll(/\d+/g)].map((x) => Number(x[0]));
    // prettier-ignore
    let myNumbers = [...line.split(": ")[1].split("|")[1].matchAll(/\d+/g)].map((x) => Number(x[0]));

    let cardScore = 0;
    // prettier-ignore
    myNumbers.forEach((num) => winningNumbers.includes(num) ? cardScore === 0 ? (cardScore = 1) : (cardScore = cardScore * 2) : null);
    totalScore += cardScore;
  }

  return totalScore;
};
var hashMap = {};
var myValue = 0;

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // Parse each line into an object
  // Consisting of references to other cards for each card
  // e.g (for Card 1 with 4 correct numbers): 1: {19, 101, 38, 4}
  // store object in hash map
  
  // imaginaryStartCardRefs =  

  for (let row = 0; row < input.length; row++)
  {
      let card = row + 1;
      console.log(`Preparing row ${row} (card ${card})`);
      // prettier-ignore
      let winningNumbers = [...input[row].split(": ")[1].split("|")[0].matchAll(/\d+/g)].map((x) => Number(x[0]));
      // prettier-ignore
      let myNumbers = [...input[row].split(": ")[1].split("|")[1].matchAll(/\d+/g)].map((x) => Number(x[0]));

      // Get the number of winning numbers in my numbers
      const winCount = myNumbers.filter(num => winningNumbers.includes(num)).length;

      let references = [];

      for (let num = 0; num < winCount; num++)
      {
        references.push(num+1+card);
      }

      //console.log(references);
      // Store row number + referenced cards into hash map
      hashMap[card] = references;
  }
  for (let row = 0; row < input.length; row++)
  {
    getValue(row+1);
  }

  return input.length+myValue;
};

const getValue = (value) => {
  myValue += hashMap[value].length;
  console.log(hashMap[value].length);
  // console.log(hashMap[value]);
  // console.log(hashMap[value].length);
  for(let val of hashMap[value])
  {
    getValue(val);
  }
}


run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
