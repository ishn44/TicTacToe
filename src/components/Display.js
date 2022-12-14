import React from "react";
import {
  Button,
  Container,
  Grid,
  FormControl,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  Radio,
  Paper,
} from "@mui/material";

export default function Display({
  game,
  handleButtonClick,
  handlePlayAgain,
  handleSymbolChange,
  userSymbol,
  gameState,
}) {
  const messages = {
    userWon: "Victory!",
    tie: "Draw",
    botWon: "Defeat",
  };
  const { status, isUserPlayingFirst } = gameState;
  return (
    <Container
      sx={{
        maxWidth: { xs: "380px", sm: "900px" },
        padding: { xs: "5px", sm: "10px" },
      }}
    >
      <Grid container sx={{}}>
        {game.map((element, index) => {
          let borderStyle =
            ([3, 4, 5].includes(index) ? "solid " : "none ") +
            ([1, 4, 7].includes(index) ? "solid" : "none");
          return (
            <Grid
              key={index}
              item
              xs={4}
              sx={{
                justifyContent: "center",
                width: { xs: "100px", sm: "250px" },
                height: { xs: "100px", sm: "250px" },
                display: "flex",
                alignItems: "center",
                borderStyle,
                borderWidth: { xs: "1px", sm: "2px" },
                borderColor: "black",
                fontSize: { xs: "30px", sm: "80px" },
              }}
              onClick={() => handleButtonClick(index)}
            >
              {element}
            </Grid>
          );
        })}
      </Grid>
      {gameState.isBotThinking && status === "inProgress" && <h1>🤔</h1>}
      <Grid>
        {!["inProgress", "coinFlip", "coinFlipDone"].includes(status) && (
          <Paper elevation={0}>
            <h2>{status !== "firstGame" && messages[status]}</h2>
            <Button variant="contained" onClick={handlePlayAgain}>
              {status === "firstGame" ? "Start Game" : "Play Again"}
            </Button>
            <FormControl>
              <FormLabel>Change Symbol:</FormLabel>
              <RadioGroup value={userSymbol} row>
                <FormControlLabel
                  value="X"
                  control={<Radio />}
                  label="X"
                  onClick={handleSymbolChange}
                />
                <FormControlLabel
                  value="O"
                  control={<Radio />}
                  label="O"
                  onClick={handleSymbolChange}
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        )}
        {status === "coinFlip" && <h2>Coin Flip</h2>}
        {status === "coinFlipDone" && (
          <h2>{isUserPlayingFirst ? "You go first" : "Bot goes first"}</h2>
        )}
        <h2>Game Stats</h2>
        <h3>Wins: {gameState.userWins}</h3>
        <h3>Losses: {gameState.botWins}</h3>
        <h3>Ties: {gameState.ties}</h3>
      </Grid>
    </Container>
  );
}
