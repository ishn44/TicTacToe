import React, { useState } from "react";
import Display from "./Display";
import { botPlay, gameStatus } from "../utils";

export default function TicTacToe() {
  let initialGame = [];
  for (let i = 0; i < 9; i++) {
    initialGame.push("");
  }
  const getRandomBoolean = () => Math.random() < 0.5;
  const [game, setGame] = useState(initialGame);
  const [userSymbol, setUserSymbol] = useState("X");
  const [gameState, setGameState] = useState({
    status: "firstGame",
    botWins: 0,
    userWins: 0,
    ties: 0,
    isUserPlayingFirst: getRandomBoolean(),
    isBotThinking: false,
  });
  const { status, isUserPlayingFirst, isBotThinking } = gameState;

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

  const handleButtonClick = async (index) => {
    if (status !== "inProgress" || isBotThinking) return;
    const newGame = [...game];
    if (!game[index]) {
      newGame[index] = userSymbol;
      setGame(newGame);
      const newStatus = gameStatus(newGame, userSymbol);
      updateState(newStatus);
      if (newStatus === "inProgress") {
        setGameState((prev) => ({ ...prev, isBotThinking: true }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        botPlay(newGame, userSymbol);
        setGameState((prev) => ({ ...prev, isBotThinking: false }));
        updateState(gameStatus(newGame, userSymbol));
      }
    }
    setGame(newGame);
  };

  const handlePlayAgain = () => {
    const newGame = [...initialGame];
    const isUserPlayingFirst = getRandomBoolean();
    if (!isUserPlayingFirst) botPlay(newGame, userSymbol);
    setGame(newGame);
    setGameState((prev) => ({
      ...prev,
      status: "inProgress",
      isUserPlayingFirst,
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
