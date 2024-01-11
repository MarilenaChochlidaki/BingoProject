import { useState, useEffect } from "react";

const useSpeechRecognition = (wordActionsMap) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [restartAttempts, setRestartAttempts] = useState(0);

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      console.log("result");
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const speechResult = event.results[i][0].transcript.toLowerCase();
        setTranscript((prevTranscript) => prevTranscript + speechResult + " ");

        for (const word in wordActionsMap) {
          if (speechResult.includes(word)) {
            wordActionsMap[word](); // Call the corresponding action function
          }
        }
      }
    };

    recognition.onend = () => {
      console.log("onend");
      if (isListening && restartAttempts < 3) {
        // Add a delay before restarting to avoid immediate loop
        setTimeout(() => {
          recognition.start();
        }, 1000);
        setRestartAttempts((attempts) => attempts + 1);
      }
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => recognition.stop();
  }, [isListening]);
  const resetTranscript = () => {
    setTranscript("");
  };
  useEffect(() => {
    console.log(transcript);
    // Check if the transcript exceeds 10 words, and reset if necessary
    if (transcript.split(" ").length > 10) {
      resetTranscript();
    }
  }, [transcript]);

  const startListening = () => setIsListening(true);
  const stopListening = () => setIsListening(false);

  return {
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
  };
};

export default useSpeechRecognition;
