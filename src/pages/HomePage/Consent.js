import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/Pause";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReplayIcon from "@mui/icons-material/Replay";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { Link } from "react-router-dom";

export default function Consent({ data, defaultDataLang, isSpeaking, speak }) {
  const [result, setResult] = useState();
  const [isSave, setIsSave] = useState(false);
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();

  recognition.lang = defaultDataLang?.language || "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    setResult(result);
  };

  const consent = localStorage.getItem("consent")
    ? JSON.parse(localStorage.getItem("consent"))
    : [];

  const handleSpeech = () => {
    if (!isSpeaking) {
      recognition.start();
    }
  };

  const handleSaveResult = () => {
    const params = [
      {
        nameUser: data?.name,
        language: data?.language?.label,
        agree: defaultDataLang?.result.includes(result),
        result,
      },
    ];
    setIsSave(true);

    localStorage.setItem("consent", JSON.stringify([...params, ...consent]));
  };

  return (
    <>
      {isSave ? (
        <>
          <Grid item xs={12} display="flex" justifyContent="center">
            <IconButton
              sx={{
                fontSize: 40,
              }}
            >
              <PlaylistAddCheckIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="p" align="center">
              Thank you, your consent has been successfuly saved!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to="/consents">
              <Typography variant="h5" component="p" align="center">
                View all consents
              </Typography>
            </Link>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant="h5" component="p">
              {defaultDataLang?.content}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="p">
              {defaultDataLang?.question}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {result ? (
              <>
                <IconButton
                  sx={{
                    fontSize: 40,
                  }}
                >
                  {isSpeaking ? (
                    <PauseIcon fontSize="inherit" />
                  ) : (
                    <PlayCircleFilledWhiteIcon
                      fontSize="inherit"
                      onClick={() => speak(result)}
                    />
                  )}
                </IconButton>
                <span style={{ fontSize: 22 }}>You responded "{result}"</span>
              </>
            ) : (
              <IconButton
                sx={{
                  fontSize: 40,
                }}
                disabled={isSpeaking}
                onClick={handleSpeech}
              >
                <KeyboardVoiceIcon fontSize="inherit" />
              </IconButton>
            )}
          </Grid>

          {result && (
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                sx={{ marginRight: 2 }}
                variant="contained"
                endIcon={<ReplayIcon />}
                onClick={() => setResult("")}
              >
                Retry
              </Button>
              <Button
                variant="contained"
                endIcon={<NavigateNextIcon />}
                onClick={handleSaveResult}
              >
                Save
              </Button>
            </Grid>
          )}
        </>
      )}
    </>
  );
}
