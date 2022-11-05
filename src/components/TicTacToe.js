import React, { useState } from "react";
import Display from "./Display";
import { botPlay, gameStatus } from "../utils";

export default function TicTacToe() {
  let initialState = [];
  for (let i = 0; i < 9; i++) {
    initialState.push("");
  }
  const [game, setGame] = useState(initialState);
  const [status, setStatus] = useState("inProgress");

  const handleButtonClick = (index) => {
    if (status !== "inProgress") return;
    const newGame = [...game];
    if (!game[index]) {
      newGame[index] = "X";
      const newStatus = gameStatus(newGame);
      setStatus(newStatus);
      if (newStatus === "inProgress") {
        botPlay(newGame);
        setStatus(gameStatus(newGame));
      }
    }
    setGame(newGame);
  };

  return (
    <div>
      <Display
        status={status}
        game={game}
        handleButtonClick={handleButtonClick}
      />
    </div>
  );
}
