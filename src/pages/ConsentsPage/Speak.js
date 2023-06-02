import { IconButton } from "@mui/material";
import React from "react";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/Pause";
import useSpeak from "../../hook/useSpeak";
export default function Speak({ data }) {
  const { isSpeaking, speak } = useSpeak();

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
