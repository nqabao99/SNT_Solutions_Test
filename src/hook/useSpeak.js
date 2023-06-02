import { useState } from "react";

const useSpeak = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speaks = (str) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(str);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    window.speechSynthesis.speak(utterance);
  };

  return { isSpeaking, speak: speaks };
};

export default useSpeak;
