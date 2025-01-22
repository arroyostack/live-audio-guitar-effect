import React from "react";
import LiveAudioFX from "./components/live-audio-interface/LiveAudioFX";

const App: React.FC = () => {
  return (
    <div>
      <h1>Audio Effects Processor</h1>
      <LiveAudioFX />
    </div>
  );
};

export default App;
