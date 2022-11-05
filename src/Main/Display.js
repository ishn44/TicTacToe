import React from "react";
import { Container, Grid } from "@mui/material";

export const Display = ({ game, handleButtonClick }) => {
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
    </Container>
  );
};
