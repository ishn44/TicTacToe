export function play(game) {
  const index = game.findIndex((e) => !e);
  if (index >= 0) {
    game[index] = "O";
  }
}
