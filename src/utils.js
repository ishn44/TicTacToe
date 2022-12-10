/*
- Win immediately
- Block the opponent from an immediate win
- If there are two intersecting lines where the opponent doesn't control any spots and the bot controls one non-shared spot on each line, take the spot shared by the two lines.
- If there are two intersecting lines where the bot doesn't control any spots and the opponent controls one non-shared spot on each line, take the spot shared by the two lines.
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
  if (index === -1)
    index = doubleWinStrategy(game, botSymbol(userSymbol), userSymbol, 1);
  if (index === -1)
    index = doubleWinStrategy(game, userSymbol, botSymbol(userSymbol), 1);
  if (index === -1)
    index = doubleWinStrategy(game, botSymbol(userSymbol), userSymbol, 2);
  if (index === -1)
    index = doubleWinStrategy(game, botSymbol(userSymbol), userSymbol, 3);
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

//console.log(intersectingLines(lines[0]));

function lineScore(game, line, symbol) {
  return game.filter((value, index) => value === symbol && line.includes(index))
    .length;
}

function sharedSpot(line1, line2) {
  let intersection = line1.filter((elem) => line2.includes(elem));
  return intersection.length ? intersection[0] : -1;
}

function unsharedSpots(line1, line2) {
  return line1.filter((elem) => !line2.includes(elem));
}

//console.log(sharedSpot(lines[0], lines[2]));

function doubleWinStrategy(game, player, opponent, step) {
  for (let line of lines) {
    for (let line2 of intersectingLines(line)) {
      if (lineScore(game, line, opponent)) continue;
      if (lineScore(game, line2, opponent)) continue;
      switch (step) {
        case 1:
          if (
            lineScore(game, unsharedSpots(line2, line), player) &&
            lineScore(game, unsharedSpots(line, line2), player)
          ) {
            // console.log(game, player, opponent, step, sharedSpot(line, line2));
            return sharedSpot(line, line2);
          }
          break;
        case 2:
          if (lineScore(game, unsharedSpots(line, line2), player)) {
            // console.log(
            //   game,
            //   player,
            //   opponent,
            //   step,
            //   unsharedSpots(line2, line)[0]
            // );
            return unsharedSpots(line2, line)[0];
          }
          if (lineScore(game, unsharedSpots(line2, line), player)) {
            // console.log(
            //   game,
            //   player,
            //   opponent,
            //   step,
            //   unsharedSpots(line, line2)[0]
            // );
            return unsharedSpots(line, line2)[0];
          }
          break;
        case 3:
          // console.log(
          //   game,
          //   player,
          //   opponent,
          //   step,
          //   line,
          //   line2,
          //   unsharedSpots(line, line2)[0]
          // );
          return unsharedSpots(line, line2).filter((elem) => elem !== 4)[0];
      }
    }
  }
  console.log(game, player, opponent, step, -1);
  return -1;
}

// x| |
//  |x|
//  | |
// console.log(
//   doubleWinStrategy(["X", "", "", "", "X", "", "", "", "X"], "O", "X")
// );
