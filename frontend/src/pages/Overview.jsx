import React from "react";
import { models } from "../data/models";
import ModelCard from "../components/cards/ModelCard";

export default function Overview() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 py-12 px-6 sm:px-12 max-w-7xl mx-auto">
      {/* ==========================================
          HEADER SECTION (Minimalist / Bold)
          ========================================== */}
      <header className="border-b border-black pb-8 mb-12">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-2">
          Architecture Performance Evaluation
        </p>
        <h1 className="text-4xl font-black font-mono tracking-tighter sm:text-5xl">
          NAIVE_BAYES_SUITE
        </h1>
        <p className="mt-4 text-zinc-600 max-w-2xl text-base leading-relaxed">
          A granular comparison of mathematical classification variants trained
          on text processing distributions. This dashboard surfaces underlying
          assumptions, localized constraints, and baseline performance
          analytics.
        </p>
      </header>

      {/* ==========================================
          PURE TAILWIND PIPELINE TIMELINE
          ========================================== */}
      <section className="mb-16">
        <div className="border-b border-zinc-200 pb-3 mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <span className="text-zinc-400">[01]</span> Engineering Pipeline Log
          </h2>
        </div>

        {/* Custom Timeline Container */}
        <div className="relative border-l border-zinc-200 ml-2 md:ml-4 space-y-8 my-6">
          {/* Timeline Event 1 */}
          <div className="relative pl-6 md:pl-8">
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-black ring-4 ring-[#fafafa]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-sm font-bold font-mono text-zinc-900">
                Phase 1: Tokenization & Text Binarization
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                Iterative Data Cleaning
              </span>
            </div>
            <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed">
              Cleaned and normalized raw alpha-numeric characters. We removed
              high-frequency stop words and applied lemmatization pipelines to
              map variable word suffixes back to common baseline structural
              roots.
            </p>
          </div>

          {/* Timeline Event 2 */}
          <div className="relative pl-6 md:pl-8">
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-black ring-4 ring-[#fafafa]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-sm font-bold font-mono text-zinc-900">
                Phase 2: Mathematical Feature Engineering
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                TF-IDF vs Count Mapping
              </span>
            </div>
            <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed">
              Constructed sparse vector matrices. For standard Multinomial
              environments, we calculated vocabulary frequency counts, while for
              Bernoulli architectures, data tokens were forced into boolean
              binary truth maps.
            </p>
          </div>

          {/* Timeline Event 3 */}
          <div className="relative pl-6 md:pl-8">
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-black ring-4 ring-[#fafafa]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-sm font-bold font-mono text-zinc-900">
                Phase 3: Correcting Distribution Anomalies
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                Hyperparameter Control
              </span>
            </div>
            <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed">
              Integrated Laplace smoothing alpha constants ($\alpha = 1.0$)
              across all calculation layers. This prevents zero-probability
              division math failures whenever the live testing suite encounters
              phrases unseen during model training.
            </p>
          </div>

          {/* Timeline Event 4 */}
          <div className="relative pl-6 md:pl-8">
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-black ring-4 ring-[#fafafa]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
              <h3 className="text-sm font-bold font-mono text-zinc-900">
                Phase 4: Selecting the Production Target
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">
                Ensemble Isolation Matrix
              </span>
            </div>
            <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed">
              Isolated model metrics across multi-class datasets. Evaluated
              baseline performance vulnerabilities under synthetic class
              imbalance to identify the exact boundaries where standard models
              collapse.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          MODEL COMPARISON MATRIX GRID
          ========================================== */}
      <section className="mb-16">
        <div className="border-b border-zinc-200 pb-3 mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <span className="text-zinc-400">[02]</span> Pipeline Architecture
            Profiles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {models.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>

      {/* ==========================================
          THE FINAL MODEL DIFFERENTIATOR
          ========================================== */}
      <section>
        <div className="border-b border-zinc-200 pb-3 mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2">
            <span className="text-zinc-400">[03]</span> The Core Differentiator
          </h2>
        </div>

        <div className="border border-black bg-black text-white p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="max-w-2xl">
            <span className="inline-block bg-zinc-800 text-zinc-300 font-mono font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 mb-3">
              Production Architecture Benchmark
            </span>
            <h3 className="text-xl font-bold font-mono tracking-tight mb-3">
              Why Multinomial & Complement Models Dominating Text Workflows
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Standard Gaussian models look for strict continuous coordinates,
              making them structurally incompatible with token vectors. In
              contrast, text patterns live or die based on structural frequency
              distribution. By pairing standard <strong>Multinomial</strong>{" "}
              modeling with <strong>Complement</strong> smoothing techniques,
              our finalized stack explicitly counters class frequency
              imbalances—ensuring rare phrases or minority target classes aren't
              completely drowned out by high-frequency inputs.
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950 p-5 font-mono w-full md:w-64 self-stretch flex flex-col justify-center">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">
              Peak Suite Accuracy
            </div>
            <div className="text-4xl font-black text-white tracking-tighter">
              89.1%
            </div>
            <div className="text-[11px] text-zinc-400 mt-3 border-t border-zinc-800 pt-2">
              Driven by optimized count token smoothing mechanics.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
