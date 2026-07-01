import { useState } from "react";
import PredictionTable from "../components/analytics/PredictionTable";
import ModelChartCard from "../components/analytics/ModelChartCard";

export default function Analytics() {
  // Fixed: Initialized missing state hooks to manage active model comparison
  const [model, setModel] = useState("predicted");

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 py-12 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <header className="border-b border-black pb-6 mb-10">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">
          [ SYSTEM_METRICS ]
        </p>
        <h1 className="text-3xl font-black font-mono tracking-tighter uppercase">
          Analytics_Dashboard
        </h1>
      </header>

      {/* Grid Layout Container */}
      <div className="space-y-10">
        <section>
          <div className="border-b border-zinc-200 pb-2 mb-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              [01] Model Accuracy Distribution
            </h2>
          </div>
          <ModelChartCard model={model} setModel={setModel} />
        </section>

        <section>
          <div className="border-b border-zinc-200 pb-2 mb-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              [02] Prediction Matrix Evaluation
            </h2>
          </div>
          <PredictionTable />
        </section>
      </div>
    </div>
  );
}
