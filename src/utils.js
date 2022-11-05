export function botPlay(game) {
  const index = game.findIndex((e) => !e);
  if (index >= 0) {
    game[index] = "O";
  }
}

export function isGameOver(game) {}
