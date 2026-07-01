// Fixed: Swapped "advancement" key to "predicted" to map one-to-one with database fields
const data = {
  predicted: { correct: 80.9, wrong: 19.1 },
  multinomial: { correct: 71.4, wrong: 28.6 },
  complement: { correct: 57.1, wrong: 42.9 },
  bernoulli: { correct: 47.6, wrong: 52.4 },
  gaussian: { correct: 42.8, wrong: 57.2 },
};

export default function ModelChartCard({ model, setModel }) {
  const current = data[model] || data.predicted;

  return (
    <div className="bg-white border border-zinc-200 p-6">
      {/* Stark Tab Controllers */}
      <div className="flex flex-wrap gap-1 mb-8 bg-zinc-100 p-1 max-w-max border border-zinc-200">
        {Object.keys(data).map((key) => (
          <button
            key={key}
            onClick={() => setModel(key)}
            className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider font-bold transition-colors duration-150 rounded-none ${
              model === key
                ? "bg-black text-white"
                : "text-zinc-500 hover:text-black hover:bg-white"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Reconstructed Chart: Swapped rounded green donut for a high-density, flat split bar bar */}
      <div className="flex flex-col md:flex-row items-stretch gap-8">
        {/* Metric Value Block */}
        <div className="border border-black bg-black text-white p-6 min-w-[200px] flex flex-col justify-center items-center font-mono">
          <span className="text-[10px] uppercase tracking-widest text-zinc-400">
            ACCURACY_RATE
          </span>
          <span className="text-4xl font-black tracking-tighter mt-2">
            {current.correct}%
          </span>
          <span className="text-[9px] text-zinc-500 uppercase mt-1">
            Verified Correct
          </span>
        </div>

        {/* Linear Distribution Graph */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2">
            <span>Valid Vector ({current.correct}%)</span>
            <span>Error Vector ({current.wrong}%)</span>
          </div>

          {/* Stacked Percentage Bar */}
          <div className="h-8 w-full flex border border-zinc-300 p-0.5 bg-zinc-50">
            <div
              className="bg-zinc-800 transition-all duration-300"
              style={{ width: `${current.correct}%` }}
            />
            <div
              className="bg-zinc-200 border-l border-white transition-all duration-300"
              style={{ width: `${current.wrong}%` }}
            />
          </div>

          <p className="text-xs text-zinc-500 font-mono mt-4 uppercase tracking-tight">
            Log Summary // System error rate currently clocks at{" "}
            <span className="font-bold text-zinc-900">{current.wrong}%</span>{" "}
            for the selected evaluation subset.
          </p>
        </div>
      </div>
    </div>
  );
}
