/*
- Win immediately
- Block the opponent from an immediate win
- If there are two intersecting lines where the opponent doesn't control any spots and the bot controls one non-shared spot on each line, take the spot shared by the two lines.
- If there are two intersecting lines where the opponent doesn't control any spots and the bot controls only one non-shared spot on one line, take a non-shared spot on the other line.
- If there are two intersecting lines where the opponent doesn't control any spots, take one one non-shared spot on either of those two lines
- Take middle spot
- Use first available spot
*/

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function botSymbol(userSymbol) {
  return userSymbol === "X" ? "O" : "X";
}

function findWinningIndex(game, player) {
  for (let line of lines) {
    let counter = 0;
    for (let i of line) {
      if (game[i] === player) counter++;
    }
    if (counter === 2) {
      for (let i of line) {
        if (!game[i]) return i;
      }
    }
  }
  return -1;
}

export function botPlay(game, userSymbol) {
  let index = findWinningIndex(game, botSymbol(userSymbol));
  if (index === -1) index = findWinningIndex(game, userSymbol);
  if (index === -1 && !game[4]) index = 4;
  if (index === -1) index = game.findIndex((e) => !e);
  game[index] = botSymbol(userSymbol);
}

export function gameStatus(game, userSymbol) {
  for (let line of lines) {
    if (
      game[line[0]] &&
      game[line[0]] === game[line[1]] &&
      game[line[1]] === game[line[2]]
    )
      return game[line[0]] === userSymbol ? "userWon" : "botWon";
  }
  if (game.findIndex((e) => !e) === -1) return "tie";
  return "inProgress";
}

export function isGameEmpty(game) {
  for (let elem of game) {
    if (elem) {
      return false;
    }
  }
  return true;
}

function intersectingLines(line) {
  return lines.filter((line2) => {
    let intersection = line.filter((elem) => line2.includes(elem));
    return intersection.length === 1;
  });
}

console.log(intersectingLines(lines[0]));

function lineScore(game, line, symbol) {}

function sharedSpot(line1, line2) {}
