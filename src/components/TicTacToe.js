import React, { useState } from "react";
import Display from "./Display";
import * as bot from "../bot";

export default function TicTacToe() {
  let initialState = [];
  for (let i = 0; i < 9; i++) {
    initialState.push("");
  }
  const [game, setGame] = useState(initialState);

  const handleButtonClick = (index) => {
    // let row = Math.floor(index / 3);
    // let col = index % 3;
    const newGame = [...game];
    if (!game[index]) {
      newGame[index] = "X";
      bot.play(newGame);
    }
    setGame(newGame);
  };

  return (
    <div>
      <Display game={game} handleButtonClick={handleButtonClick} />
    </div>
  );
}
