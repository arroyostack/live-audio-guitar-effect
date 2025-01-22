# Guitar Effect Test 🎸

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tone.js](https://img.shields.io/badge/Tone.js-F734D7?style=for-the-badge&logo=javascript&logoColor=white)
![SWC](https://img.shields.io/badge/SWC-FFFFFF?style=for-the-badge&logo=swc&logoColor=black)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

A minimal prototype to test Tone.js capabilities with microphone input. Experimenting with basic audio effects like reverb and chorus using Web Audio API.

## 🎯 Features

- Real-time audio processing
- Professional-grade reverb effect
- Rich chorus modulation
- Low-latency performance
- Interactive parameter controls
- Modern, responsive UI
- Signal Chain Design: mic -> inputGain -> filter -> compressor reverb -> output

Signal Chain Design: mic -> inputGain -> filter -> reverb -> compressor -> output

## 🚀 Quick Start

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Run development server
pnpm dev

🛠️ Built With
React 18 - UI framework
TypeScript - Type safety
Tone.js - Audio processing
Vite - Build tool
Tailwind CSS - Styling

📦 Project Structure
src/
├── audio-effects/
│   ├── ReverbEffect.ts    # Reverb processor
│   └── ChorusEffect.ts    # Chorus processor
├── components/
│   ├── LiveAudioFX.tsx    # Main audio interface
│   └── EffectControl.tsx  # Dynamic Parameter controls
└── App.tsx

🎛️ Available Effects
- Reverb
- Chorus

📝 Requirements
Node.js 18+
Modern browser with Web Audio API support
Microphone access
🎓 Learn More
Tone.js Documentation
Web Audio API
React Documentation
```
