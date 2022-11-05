import React, { useState } from "react";
import Display from "./Display";
import { botPlay } from "../utils";

export default function TicTacToe() {
  let initialState = [];
  for (let i = 0; i < 9; i++) {
    initialState.push("");
  }
  const [game, setGame] = useState(initialState);

  const handleButtonClick = (index) => {
    const newGame = [...game];
    if (!game[index]) {
      newGame[index] = "X";
      botPlay(newGame);
    }
    setGame(newGame);
  };

  return (
    <div>
      <Display game={game} handleButtonClick={handleButtonClick} />
    </div>
  );
}
