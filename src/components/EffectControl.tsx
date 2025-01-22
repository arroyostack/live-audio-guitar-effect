import React from "react";

export interface EffectParameter {
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
}

interface EffectControlProps {
  name: string;
  parameters: EffectParameter[];
}

export const EffectControl: React.FC<EffectControlProps> = ({
  name,
  parameters,
}) => {
  const getRotationStyle = (value: number, min: number, max: number) => {
    const percentage = (value - min) / (max - min);
    const degrees = percentage * 270 - 135; // -135 to 135 degrees rotation
    return `rotate(${degrees}deg)`;
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl p-6 shadow-2xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">
          {name}
        </h3>
        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/50 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {parameters.map((param) => (
          <div
            key={param.name}
            className="flex flex-col items-center space-y-3"
          >
            <div className="relative w-20 h-20 group">
              <div
                className="absolute inset-0 rounded-full border-2 border-emerald-400/30 
                         group-hover:border-emerald-400/50 transition-colors duration-200"
              />
              <div
                className="absolute top-1/2 left-1/2 w-0.5 h-[40%] bg-emerald-400 origin-bottom 
                         shadow-[0_0_10px] shadow-emerald-400/30"
                style={{
                  transform: `translate(-50%, -100%) ${getRotationStyle(
                    param.value,
                    param.min,
                    param.max
                  )}`,
                }}
              />
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={param.step}
                value={param.value}
                onChange={(e) => param.onChange(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            <div className="text-center">
              <span className="block text-sm text-gray-400 mb-1">
                {param.name}
              </span>
              <span className="font-mono text-sm text-emerald-400 shadow-[0_0_10px] shadow-emerald-400/30">
                {param.value.toFixed(2)}
                {param.unit || ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
