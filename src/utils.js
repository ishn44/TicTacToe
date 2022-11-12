/*
- Win immediately
- Block the opponent from an immediate win
- Always pick the middle spot if the available
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
