import { rows } from "../../data/rows";

// High contrast typographic markers replacing soft colored pills
function Badge({ value }) {
  if (value === "Positive") {
    return (
      <span className="inline-block border border-black bg-black text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
        PASSED
      </span>
    );
  }
  if (value === "Negative") {
    return (
      <span className="inline-block border border-zinc-300 bg-zinc-100 text-zinc-400 line-through px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
        FAILED
      </span>
    );
  }
  return (
    <span className="inline-block border border-zinc-200 text-zinc-500 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
      STATIC
    </span>
  );
}

export default function PredictionTable() {
  return (
    <div className="border border-zinc-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-black font-mono text-[11px] uppercase tracking-wider text-zinc-400 bg-zinc-50">
              <th className="p-4 font-bold text-zinc-900">
                Sequence Context / Review String
              </th>
              <th className="p-4 font-bold text-zinc-900">Actual</th>
              <th className="p-4 font-bold text-zinc-900">Ensemble</th>
              <th className="p-4 font-bold text-zinc-400">Multinomial</th>
              <th className="p-4 font-bold text-zinc-400">Complement</th>
              <th className="p-4 font-bold text-zinc-400">Gaussian</th>
              <th className="p-4 font-bold text-zinc-400">Bernoulli</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100 text-xs">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-zinc-50/70 transition-colors duration-100"
              >
                {/* Text sequence output container */}
                <td className="p-4 max-w-[280px] font-sans text-zinc-800 leading-relaxed">
                  <p className="truncate" title={row.reviews}>
                    {row.reviews}
                  </p>
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge value={row.actual} />
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge value={row.predicted} />
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge value={row.multinomial} />
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge value={row.complement} />
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge value={row.gaussian} />
                </td>

                <td className="p-4 whitespace-nowrap">
                  <Badge value={row.bernoulli} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
