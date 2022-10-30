import React, { useState } from "react";
import { Display } from "./Display";

export const TicTacToe = () => {
  let initialState = [];
  for (let row = 0; row < 3; row++) {
    initialState.push([]);
    for (let col = 0; col < 3; col++) {
      initialState[row].push("");
    }
  }
  const [game, setGame] = useState(initialState);

  const handleButtonClick = (index) => {
    let row = Math.floor(index / 3);
    let col = index % 3;
    if (!game[row][col]) {
      setGame((prevGame) => {
        prevGame[row][col] = "X";
        return [...prevGame];
      });
    }
  };

  return (
    <div>
      <Display game={game} handleButtonClick={handleButtonClick} />
    </div>
  );
};
