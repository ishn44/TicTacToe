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
} from "@mui/material";
import { isGameEmpty } from "../utils";

export default function Display({
  game,
  handleButtonClick,
  status,
  handlePlayAgain,
  handleSymbolChange,
  userSymbol,
  stats,
}) {
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
      {status !== "inProgress" && (
        <Grid>
          <h2>{status !== "firstGame" && status}</h2>
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
        </Grid>
      )}
    </Container>
  );
}
