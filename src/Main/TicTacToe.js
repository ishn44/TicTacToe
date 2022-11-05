import React, { useState } from "react";
import { Display } from "./Display";

export const TicTacToe = () => {
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
      let isComputersTurn = true;
      for (let i = 0; i < 9; i++)
        if (!newGame[i] && isComputersTurn) {
          newGame[i] = "O";
          isComputersTurn = false;
        }
    }
    setGame(newGame);
  };

  return (
    <div>
      <Display game={game} handleButtonClick={handleButtonClick} />
    </div>
  );
};
