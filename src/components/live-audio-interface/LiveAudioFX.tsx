import React, { useState, useEffect } from "react";
import { ReverbEffect } from "../../audio-effects/ReverbEffect";
import { ChorusEffect } from "../../audio-effects/ChorusEffect";
import { EffectControl, EffectParameter } from "../EffectControl";

const LiveAudioFX: React.FC = () => {
  // Reverb state
  const [reverbEffect, setReverbEffect] = useState<ReverbEffect | null>(null);
  const [reverbMix, setReverbMix] = useState(0.5);
  const [reverbDecay, setReverbDecay] = useState(2);

  // Chorus state
  const [chorusEffect, setChorusEffect] = useState<ChorusEffect | null>(null);
  const [chorusFreq, setChorusFreq] = useState(4);
  const [chorusDepth, setChorusDepth] = useState(0.7);
  const [chorusDelay, setChorusDelay] = useState(2.5);
  const [chorusMix, setChorusMix] = useState(0.5);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const reverb = new ReverbEffect(reverbDecay, reverbMix);
    const chorus = new ChorusEffect(
      chorusFreq,
      chorusDelay,
      chorusDepth,
      chorusMix
    );

    setReverbEffect(reverb);
    setChorusEffect(chorus);

    return () => {
      reverb.dispose();
      chorus.dispose();
    };
  }, []);

  const startAudio = async () => {
    if (reverbEffect && chorusEffect) {
      await Promise.all([reverbEffect.start(), chorusEffect.start()]);
      setIsActive(true);
    }
  };

  const stopAudio = () => {
    reverbEffect?.stop();
    chorusEffect?.stop();
    setIsActive(false);
  };

  const reverbParameters: EffectParameter[] = [
    {
      name: "Mix",
      min: 0,
      max: 1,
      step: 0.01,
      value: reverbMix,
      onChange: (value) => {
        setReverbMix(value);
        reverbEffect?.setMix(value);
      },
    },
    {
      name: "Decay",
      min: 0.1,
      max: 10,
      step: 0.1,
      value: reverbDecay,
      unit: "s",
      onChange: (value) => {
        setReverbDecay(value);
        reverbEffect?.setDecay(value);
      },
    },
  ];

  const chorusParameters: EffectParameter[] = [
    {
      name: "Rate",
      min: 0.1,
      max: 20,
      step: 0.1,
      value: chorusFreq,
      unit: "Hz",

      onChange: (value) => {
        setChorusFreq(value);
        chorusEffect?.setFrequency(value);
      },
    },
    {
      name: "Depth",
      min: 0,
      max: 1,
      step: 0.01,
      value: chorusDepth,
      onChange: (value) => {
        setChorusDepth(value);
        chorusEffect?.setDepth(value);
      },
    },
    {
      name: "Delay",
      min: 0.1,
      max: 10,
      step: 0.1,
      value: chorusDelay,
      unit: "ms",

      onChange: (value) => {
        setChorusDelay(value);
        chorusEffect?.setDelayTime(value);
      },
    },
    {
      name: "Mix",
      min: 0,
      max: 1,
      step: 0.01,
      value: chorusMix,

      onChange: (value) => {
        setChorusMix(value);
        chorusEffect?.setMix(value);
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Audio Effects Lab
          </h1>
          <p className="text-gray-400 mt-2">
            Professional Audio Processing Suite
          </p>
        </header>

        <div className="space-y-8">
          <button
            onClick={isActive ? stopAudio : startAudio}
            className="w-full px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300"
            style={{
              background: isActive
                ? "linear-gradient(45deg, #ff0055, #ff0000)"
                : "linear-gradient(45deg, #00ff9d, #00b8ff)",
              boxShadow: `0 0 30px ${isActive ? "#ff005555" : "#00ff9d55"}`,
            }}
          >
            {isActive ? "Stop Effects" : "Start Effects"}
          </button>

          <div className="grid gap-6 md:grid-cols-2">
            <EffectControl name="Reverb" parameters={reverbParameters} />
            <EffectControl name="Chorus" parameters={chorusParameters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAudioFX;
