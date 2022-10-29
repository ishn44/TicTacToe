import React from "react";
import { Container, Grid } from "@mui/material";

export const Display = ({ game }) => {
  const gameArr = [...game[0], ...game[1], ...game[2]];
  return (
    <Container
      sx={{
        maxWidth: { xs: "380px", sm: "605px" },
      }}
    >
      <Grid container>
        {gameArr.map((element) => {
          return (
            <Grid item xs={4}>
              {element}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
