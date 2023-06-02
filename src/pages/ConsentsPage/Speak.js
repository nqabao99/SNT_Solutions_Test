import { IconButton } from "@mui/material";
import React, { useState } from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/Pause";
export default function Speak({ data }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speak = (str) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(str);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  return (
    <IconButton
      sx={{
        fontSize: 40,
      }}
      disabled={isSpeaking}
      onClick={() => speak(data?.result)}
    >
      {isSpeaking ? <PauseIcon /> : <PlayCircleFilledWhiteIcon />}
    </IconButton>
  );
}
