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
  const [userSymbol, setUserSymbol] = useState("X");

  const handleButtonClick = (index) => {
    if (status !== "inProgress") return;
    const newGame = [...game];
    if (!game[index]) {
      newGame[index] = userSymbol;
      const newStatus = gameStatus(newGame, userSymbol);
      setStatus(newStatus);
      if (newStatus === "inProgress") {
        botPlay(newGame, userSymbol);
        setStatus(gameStatus(newGame, userSymbol));
      }
    }
    setGame(newGame);
  };

  const handlePlayAgain = () => {
    setGame(initialState);
    setStatus("inProgress");
  };

  return (
    <div>
      <Display
        status={status}
        game={game}
        handleButtonClick={handleButtonClick}
        handlePlayAgain={handlePlayAgain}
      />
    </div>
  );
}
