import React, { useState } from "react";
import Display from "./Display";
import { botPlay, gameStatus } from "../utils";

export default function TicTacToe() {
  let initialState = [];
  for (let i = 0; i < 9; i++) {
    initialState.push("");
  }
  const getRandomBoolean = () => Math.random() < 0.5;
  const [game, setGame] = useState(initialState);
  const [userSymbol, setUserSymbol] = useState("X");
  const [gameState, setGameState] = useState({
    status: "firstGame",
    botWins: 0,
    userWins: 0,
    ties: 0,
    isUserPlayingFirst: getRandomBoolean(),
  });
  const { status, isUserPlayingFirst } = gameState;

  const updateState = (status) => {
    switch (status) {
      case "botWon":
        setGameState((prev) => ({
          ...prev,
          botWins: prev.botWins + 1,
          status,
        }));
        break;
      case "userWon":
        setGameState((prev) => ({
          ...prev,
          userWins: prev.userWins + 1,
          status,
        }));
        break;
      case "tie":
        setGameState((prev) => ({ ...prev, ties: prev.ties + 1, status }));
        break;
      case "inProgress":
        setGameState((prev) => ({ ...prev, status }));
        break;
    }
  };

  const handleButtonClick = (index) => {
    if (status !== "inProgress") return;
    const newGame = [...game];
    if (!game[index]) {
      newGame[index] = userSymbol;
      const newStatus = gameStatus(newGame, userSymbol);
      updateState(newStatus);
      if (newStatus === "inProgress") {
        botPlay(newGame, userSymbol);
        updateState(gameStatus(newGame, userSymbol));
      }
    }
    setGame(newGame);
  };

  const handlePlayAgain = () => {
    setGame(initialState);
    setGameState((prev) => ({
      ...prev,
      status: "inProgress",
      isUserPlayingFirst: getRandomBoolean(),
    }));
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
