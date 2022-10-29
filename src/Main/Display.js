import React from "react";
import { Container, Grid } from "@mui/material";

export const Display = ({ game, handleButtonClick }) => {
  const gameArr = [...game[0], ...game[1], ...game[2]];
  return (
    <Container
      sx={{
        maxWidth: { xs: "380px", sm: "900px" },
      }}
    >
      <Grid container>
        {gameArr.map((element) => {
          return (
            <Grid
              item
              xs={4}
              sx={{
                border: "1px solid black",
                textAlign: "center",
                width: { xs: "100px", sm: "250px" },
                height: { xs: "100px", sm: "250px" },
              }}
              onClick={handleButtonClick}
            >
              {element}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
