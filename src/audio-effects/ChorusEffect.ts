import * as Tone from "tone";

export class ChorusEffect {
  private inputGain: Tone.Gain;
  private chorus: Tone.Chorus;
  private filter: Tone.Filter;
  private outputGain: Tone.Gain;
  private mic: Tone.UserMedia;

  constructor(
    frequency: number = 1.5,
    delayTime: number = 3.5,
    depth: number = 0.8,
    mix: number = 0.7
  ) {
    // Input gain for strong modulation source
    this.inputGain = new Tone.Gain(2.0);

    // Professional chorus configuration
    this.chorus = new Tone.Chorus({
      frequency: frequency, // Rate of modulation
      delayTime: delayTime, // Base delay time
      depth: depth, // Modulation depth
      wet: mix, // Effect mix
      type: "sine", // Smooth modulation waveform
      spread: 180, // Full stereo width
      feedback: 0.4, // Internal feedback for richness
    }).start(); // Activate modulation

    // Tone shaping filter
    this.filter = new Tone.Filter({
      frequency: 5000, // Wide frequency range
      type: "lowpass",
      rolloff: -12,
      Q: 1,
    });

    // Output level control
    this.outputGain = new Tone.Gain(1.5);

    // Optimized signal path
    this.mic = new Tone.UserMedia();
    this.mic.connect(this.inputGain);
    this.inputGain.connect(this.chorus);
    this.chorus.connect(this.filter);
    this.filter.connect(this.outputGain);
    this.outputGain.toDestination();
  }

  setFrequency(value: number): void {
    this.chorus.frequency.value = value;
  }

  setDelayTime(value: number): void {
    this.chorus.delayTime = value;
  }

  setDepth(value: number): void {
    this.chorus.depth = value;
  }

  setMix(value: number): void {
    this.chorus.wet.value = value;
  }

  setFilterFreq(freq: number): void {
    this.filter.frequency.value = freq;
  }

  setInputGain(value: number): void {
    this.inputGain.gain.value = value;
  }

  setOutputGain(value: number): void {
    this.outputGain.gain.value = value;
  }

  async start(): Promise<void> {
    await Tone.start();
    await this.mic.open();
  }

  stop(): void {
    this.mic.close();
  }

  dispose(): void {
    this.mic.close();
    this.inputGain.dispose();
    this.chorus.dispose();
    this.filter.dispose();
    this.outputGain.dispose();
  }
}
