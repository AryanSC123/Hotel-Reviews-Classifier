import { useState } from "react";
import { analyzeReview } from "../services/api";

export default function Playground() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleRun = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await analyzeReview(text);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 py-12 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* ==========================================
          STARK REGISTRATION HEADER
          ========================================== */}
      <header className="border-b border-black pb-6 mb-8">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-1">
          [ SANDBOX ]
        </p>
        <h1 className="text-3xl font-black font-mono tracking-tighter">
          PLAYGROUND_INFERENCE
        </h1>
      </header>

      {/* INPUT CONTROL BLOCK */}
      <div className="border border-zinc-200 bg-white p-5 transition-all duration-200 focus-within:border-black">
        <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2">
          Input Evaluation Sequence
        </label>
        <textarea
          className="w-full h-28 p-3 border border-zinc-200 rounded-none focus:border-zinc-400 outline-none text-sm leading-relaxed text-zinc-800 placeholder-zinc-300 resize-none"
          placeholder="Enter custom validation string or live review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleRun}
            disabled={loading || !text.trim()}
            className="px-6 py-2 bg-black text-white font-mono text-xs uppercase tracking-wider font-bold transition hover:bg-zinc-800 disabled:opacity-20 rounded-none"
          >
            {loading ? "Processing..." : "Run Pipeline"}
          </button>
        </div>
      </div>

      {/* COMPILATION PAYLOAD OUTPUTS */}
      {data && (
        <div className="mt-12 space-y-10">
          <div>
            <div className="border-b border-zinc-200 pb-2 mb-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                [01] Integrated Synthesis
              </h2>
            </div>
            <ResultsOverview data={data} />
          </div>

          <div>
            <div className="border-b border-zinc-200 pb-2 mb-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                [02] Parallel Execution Outputs
              </h2>
            </div>
            <ModelGrid data={data} />
          </div>

          <div>
            <div className="border-b border-zinc-200 pb-2 mb-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                [03] Granular Token Matrix
              </h2>
            </div>
            <AspectAnalysis data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================
    1. RESULTS OVERVIEW (Ensemble Block)
    ========================================== */
function ResultsOverview({ data }) {
  return (
    <div className="border border-black bg-black text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <span className="inline-block bg-zinc-800 text-zinc-300 font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 mb-1">
          Aggregated Result
        </span>
        <h2 className="text-lg font-bold font-mono uppercase tracking-tight">
          Ensemble Pipeline Prediction
        </h2>
        <p className="text-xs text-zinc-400 mt-1 max-w-xl">
          The finalized model determination computed via combined distribution
          weights from all active sub-classifiers.
        </p>
      </div>

      <div className="bg-zinc-950 border border-zinc-800 p-4 min-w-[180px] w-full sm:w-auto text-center font-mono self-stretch sm:self-auto flex flex-col justify-center">
        <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
          Class Decided
        </span>
        <span className="text-xl font-black text-white tracking-tight uppercase block mt-1">
          {data.prediction}
        </span>
      </div>
    </div>
  );
}

/* ==========================================
    2. MODEL GRID (Architecture Performance)
    ========================================== */
function ModelGrid({ data }) {
  const models = [
    { name: "Bernoulli NB", value: data.bernoulli },
    { name: "Complement NB", value: data.complement },
    { name: "Gaussian NB", value: data.gaussian },
    { name: "Multinomial NB", value: data.multinomial },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {models.map((m, i) => (
        <div
          key={i}
          className="bg-white border border-zinc-200 p-4 transition-all duration-150 hover:border-black flex flex-col justify-between"
        >
          <div>
            <span className="text-[9px] font-mono text-zinc-400 block">
              PIPELINE_0{i + 1}
            </span>
            <h3 className="font-bold font-mono text-sm text-zinc-900 mt-0.5">
              {m.name}
            </h3>
          </div>
          <div className="mt-6 pt-2 border-t border-zinc-100 font-mono text-base font-black text-zinc-900 uppercase">
            {m.value || "NULL_VALUE"}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ==========================================
    3. ASPECT ANALYSIS (Token Weight Map)
    ========================================== */
function AspectAnalysis({ data }) {
  if (!data.results?.length) return null;

  return (
    <div className="space-y-4">
      {data.results.map((item, idx) => {
        const isPositive = item.sentiment === "Positive";

        return (
          <div key={idx} className="border border-zinc-200 bg-white p-5">
            {/* Header Data Segment */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
              <div>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
                  Target Domain
                </span>
                <h3 className="text-base font-bold font-mono text-zinc-900 uppercase">
                  {item.aspect}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500">
                  Confidence Match:
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 border ${
                    isPositive
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-800"
                      : "bg-rose-50/50 border-rose-200 text-rose-800"
                  }`}
                >
                  {item.sentiment.toUpperCase()} [
                  {Math.round(item.confidence * 100)}%]
                </span>
              </div>
            </div>

            {/* Analyzed Scope Context */}
            <div className="my-4 bg-zinc-50 border-l-2 border-zinc-300 p-3">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Extracted Subsequence Context:
              </span>
              <p className="text-xs text-zinc-600 font-sans italic">
                "{item.context_analyzed}"
              </p>
            </div>

            {/* Individual Structural Weights */}
            <div className="mt-4">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Calculated Probability Shift Log:
              </span>
              <div className="flex flex-wrap gap-2">
                {item.word_impacts.map(([word, weight], i) => {
                  const isImpactPositive = weight > 0;
                  return (
                    <span
                      key={i}
                      className={`text-[11px] font-mono px-2 py-1 border transition-colors duration-150 hover:bg-zinc-50 ${
                        isImpactPositive
                          ? "border-zinc-200 text-zinc-800"
                          : "border-zinc-200 text-zinc-400 line-through decoration-zinc-300"
                      }`}
                    >
                      {word}{" "}
                      <span className="font-bold text-[10px] text-zinc-500 ml-1">
                        ({isImpactPositive ? "+" : ""}
                        {weight.toFixed(2)})
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
