import React from "react";

export default function ModelCard({ model }) {
  return (
    <div className="group border border-zinc-200 bg-white transition-all duration-200 hover:border-black flex flex-col justify-between">
      {/* Visual Header */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-zinc-200 bg-zinc-50">
        <img
          src={model.image}
          alt={model.title}
          className="h-full w-full object-cover grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:scale-[1.01]"
        />
        <div className="absolute top-3 left-3 bg-black text-[10px] uppercase tracking-widest text-white px-2 py-0.5 font-mono font-bold">
          {model.badge}
        </div>
      </div>

      {/* Content Space */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-zinc-900 font-mono tracking-tight">
              {model.title}
            </h3>
            <span className="text-lg font-black text-zinc-900 font-mono">
              {(model.accuracy * 100).toFixed(1)}%
            </span>
          </div>

          <p className="text-xs text-zinc-500 font-mono mb-4 border-l border-zinc-300 pl-2 py-0.5">
            {model.mathematicalAssumption}
          </p>

          <p className="text-sm text-zinc-600 leading-relaxed mb-4">
            {model.description}
          </p>
        </div>

        {/* Technical Footer Details */}
        <div className="pt-4 border-t border-dashed border-zinc-200 space-y-2">
          <div className="text-[11px] leading-normal text-zinc-700">
            <strong className="text-black font-mono block text-[10px] uppercase tracking-wider mb-0.5">
              Optimal Conditions:
            </strong>
            {model.bestFor}
          </div>
          <div className="text-[11px] leading-normal text-zinc-500">
            <strong className="text-zinc-400 font-mono block text-[10px] uppercase tracking-wider mb-0.5">
              Known Constraints:
            </strong>
            {model.limitations}
          </div>
        </div>
      </div>
    </div>
  );
}
