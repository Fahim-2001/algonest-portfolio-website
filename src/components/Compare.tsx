import { Check, Minus, X } from "@phosphor-icons/react/dist/ssr";
import { home } from "@/content/site";
import { Reveal } from "./Reveal";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

type Kind = "yes" | "no" | "partial";

function Mark({ kind, label }: { kind: Kind; label: string }) {
  const Icon = kind === "yes" ? Check : kind === "no" ? X : Minus;
  return (
    <span
      className={`inline-flex flex-col items-center gap-1 text-xs sm:flex-row sm:gap-1.5 sm:text-[0.9375rem] ${
        kind === "yes" ? "font-medium text-accent-text" : "text-muted"
      }`}
    >
      <Icon size={16} weight="bold" aria-hidden="true" />
      {label}
    </span>
  );
}

/**
 * AlgoNest against an agency and a direct hire. Text carries every value, the
 * icons repeat it, and the AlgoNest column fills in row by row when the table
 * comes into view.
 */
export function Compare() {
  const { compare } = home.why;
  const kind = (v: string): Kind =>
    compare.positive.includes(v) ? "yes" : compare.negative.includes(v) ? "no" : "partial";

  return (
    <div className="mt-20 md:mt-28">
      <h3 className="h3">{compare.heading}</h3>
      <Reveal className="compare mt-8 overflow-x-auto rounded-[20px] border border-line bg-surface">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{compare.caption}</caption>
          <thead>
            <tr className="border-b border-line">
              <td className="label px-4 py-4 !text-muted md:px-8">{compare.corner}</td>
              {compare.columns.map((col, c) => (
                <th
                  key={col}
                  scope="col"
                  style={i(0)}
                  className={`px-2 py-4 text-center font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] sm:px-4 md:px-6 md:text-xs ${
                    c === compare.us ? "compare-us text-accent-text" : "text-muted"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row, r) => (
              <tr key={row.label} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-4 py-5 text-[0.9375rem] font-medium leading-snug md:px-8 md:text-base">
                  {row.label}
                </th>
                {row.values.map((v, c) => (
                  <td
                    key={c}
                    style={i(r + 1)}
                    className={`px-2 py-5 text-center sm:px-4 md:px-6 ${c === compare.us ? "compare-us" : ""}`}
                  >
                    <Mark kind={kind(v)} label={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </div>
  );
}
