import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
export default function Header({ children }) {
  const { pathname } = useLocation();

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="flex-end"
        sx={{ margin: "auto", width: "40%" }}
      >
        <Grid item>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              component="p"
              sx={{ color: pathname === "/" ? "#121212" : "#cccccc" }}
            >
              Home
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/consents" style={{ textDecoration: "none" }}>
            <Typography
              component="p"
              sx={{ color: pathname === "/consents" ? "#121212" : "#cccccc" }}
            >
              Consents
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "40%",
          margin: "100px auto 0",
        }}
      >
        {children}
      </Box>
    </>
  );
}
