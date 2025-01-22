import * as Tone from "tone";

export class ReverbEffect {
  private inputGain: Tone.Gain;
  private reverb: Tone.Reverb;
  private filter: Tone.Filter;
  private compressor: Tone.Compressor;
  private mic: Tone.UserMedia;

  constructor(decay: number = 3, mix: number = 0.5, filterFreq: number = 2000) {
    // Initialize audio context with performance settings
    Tone.setContext(
      new Tone.Context({
        latencyHint: "interactive",
        lookAhead: 0,
      })
    );

    // Input gain for optimal signal level
    this.inputGain = new Tone.Gain(1.5);

    // High-performance reverb
    this.reverb = new Tone.Reverb({
      decay: decay,
      wet: mix,
      preDelay: 0.01,
    });

    // Precise filter for tone shaping
    this.filter = new Tone.Filter({
      frequency: filterFreq,
      type: "lowpass",
      rolloff: -12,
      Q: 0.5,
    });

    // Fast-acting compressor
    this.compressor = new Tone.Compressor({
      threshold: -20,
      ratio: 3,
      attack: 0.003,
      release: 0.05,
      knee: 2,
    });

    // Optimized signal chain
    this.mic = new Tone.UserMedia();
    this.mic.connect(this.inputGain);
    this.inputGain.connect(this.filter);
    this.filter.connect(this.reverb);
    this.reverb.connect(this.compressor);
    this.compressor.toDestination();
  }

  setInputGain(value: number): void {
    this.inputGain.gain.value = value;
  }

  setFilterFreq(freq: number): void {
    this.filter.frequency.value = freq;
  }

  setFilterQ(value: number): void {
    this.filter.Q.value = value;
  }

  setCompressorThreshold(value: number): void {
    this.compressor.threshold.value = value;
  }

  setCompressorRatio(value: number): void {
    this.compressor.ratio.value = value;
  }

  setMix(value: number): void {
    this.reverb.wet.value = value;
  }

  setDecay(value: number): void {
    this.reverb.decay = value;
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
    this.reverb.dispose();
    this.filter.dispose();
    this.compressor.dispose();
  }
}
