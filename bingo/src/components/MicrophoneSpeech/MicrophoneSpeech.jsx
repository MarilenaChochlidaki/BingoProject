import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import styles from "./MicrophoneSpeech.module.css";

const MicrophoneSpeech = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({
      continuous: true,
    });
  };

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <button onClick={handleListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};
export default MicrophoneSpeech;
