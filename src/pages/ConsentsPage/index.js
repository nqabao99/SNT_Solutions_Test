import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Speak from "./Speak";

export default function ConsentsPage() {
  const consent = localStorage.getItem("consent")
    ? JSON.parse(localStorage.getItem("consent"))
    : [];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" align="center">
          All Consents
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          {consent.length > 0 ? (
            <>
              <ListItem>
                <ListItemText primary="Details" />
                <ListItemText
                  primary="Consent Given"
                  sx={{ textAlign: "right" }}
                />
              </ListItem>
              {consent.map((item, index) => (
                <ListItem
                  key={index}
                  sx={index % 2 === 0 ? { bgcolor: "whitesmoke" } : {}}
                >
                  <ListItemText
                    primary={item?.nameUser}
                    secondary={`Language: ${item?.language}`}
                  />
                  <IconButton
                    sx={{
                      fontSize: 40,
                    }}
                  >
                    {item?.agree ? <CheckIcon /> : <CloseIcon />}
                  </IconButton>
                  <Speak data={item} />
                </ListItem>
              ))}
            </>
          ) : (
            <Typography component="p" align="center">
              No data
            </Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
}
