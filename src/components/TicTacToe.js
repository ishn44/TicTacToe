import React, { useState } from "react";
import Display from "./Display";
import { botPlay, gameStatus } from "../utils";

export default function TicTacToe() {
  let initialState = [];
  for (let i = 0; i < 9; i++) {
    initialState.push("");
  }
  const [game, setGame] = useState(initialState);
  const [userSymbol, setUserSymbol] = useState("X");
  const [gameState, setGameState] = useState({
    status: "firstGame",
    botWins: 0,
    userWins: 0,
    ties: 0,
    totalGames: 0,
  });
  const { status } = gameState;

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
    setGameState((prev) => ({ ...prev, status: "inProgress" }));
  };

  const handleSymbolChange = ({ target }) => {
    setUserSymbol(target.value);
  };

  return (
    <div>
      <Display
        game={game}
        handleButtonClick={handleButtonClick}
        handlePlayAgain={handlePlayAgain}
        handleSymbolChange={handleSymbolChange}
        userSymbol={userSymbol}
        gameState={gameState}
      />
    </div>
  );
}
