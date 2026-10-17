import { useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';

// Small seeded PRNG so a "resample" is reproducible and the SSR/first paint is stable.
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(1 - r())) * Math.cos(2 * Math.PI * r());
}

const N = 48, W = 520, H = 320, PAD = 28;

export function Playground() {
  const [noise, setNoise] = useState(0.35);
  const [seed, setSeed] = useState(7);

  const { pts, slope, intercept, r2 } = useMemo(() => {
    const r = mulberry32(seed);
    const noises = Array.from({ length: N }, () => gauss(r));
    const xs = Array.from({ length: N }, (_, i) => i / (N - 1));
    const ys = xs.map((x, i) => 0.15 + 0.7 * x + noises[i] * noise * 0.5);
    const mx = xs.reduce((a, b) => a + b) / N, my = ys.reduce((a, b) => a + b) / N;
    let sxy = 0, sxx = 0, syy = 0;
    xs.forEach((x, i) => { sxy += (x - mx) * (ys[i] - my); sxx += (x - mx) ** 2; syy += (ys[i] - my) ** 2; });
    const slope = sxy / sxx, intercept = my - slope * mx;
    return { pts: xs.map((x, i) => [x, ys[i]] as const), slope, intercept, r2: (sxy * sxy) / (sxx * syy) };
  }, [noise, seed]);

  const sx = (x: number) => PAD + x * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - Math.max(-0.1, Math.min(1.1, y)) * (H - 2 * PAD);
  const verdict = r2 > 0.8 ? 'A clear signal.' : r2 > 0.4 ? 'Visible, but wobbly.' : 'Mostly noise. Be careful what you conclude.';

  return (
    <div className="grid gap-8 border border-[var(--line)] bg-[var(--card)] p-5 md:grid-cols-[1.35fr_.65fr] md:gap-10 md:p-8">
      <div><svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Scatter plot with fitted line, R squared ${r2.toFixed(2)}`}>
        <rect x="0" y="0" width={W} height={H} fill="#e4e9dd" className="grid-paper" />
        <line x1={sx(0)} x2={sx(1)} y1={sy(0.15)} y2={sy(0.85)} stroke="#203d36" strokeOpacity=".35" strokeDasharray="5 6" />
        <line x1={sx(0)} x2={sx(1)} y1={sy(intercept)} y2={sy(intercept + slope)} stroke="#dc775b" strokeWidth="3" strokeLinecap="round" />
        {pts.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r="4.5" fill="#203d36" fillOpacity=".85" stroke="#f3f0e6" strokeWidth="1.5" style={{ transition: 'cx .35s, cy .35s' }} />)}
      </svg>
      <p className="mono soft mt-3 text-[11px]">Dashed: the true relationship. Coral: what a regression recovers.</p></div>
      <div className="flex flex-col justify-center gap-6">
        <div>
          <label htmlFor="noise" className="eyebrow soft">Noise level · {Math.round(noise * 100)}%</label>
          <input id="noise" type="range" min="0" max="1" step="0.01" value={noise} onChange={(e) => setNoise(+e.target.value)} />
        </div>
        <dl className="grid grid-cols-2 gap-4">
          <div><dt className="eyebrow soft">R²</dt><dd className="display text-4xl font-semibold" data-testid="stat-r2">{r2.toFixed(2)}</dd></div>
          <div><dt className="eyebrow soft">Slope</dt><dd className="display text-4xl font-semibold">{slope.toFixed(2)}</dd></div>
        </dl>
        <p className="text-[15px] leading-[1.6]" aria-live="polite">{verdict} <span className="soft">The true slope is 0.70.</span></p>
        <button type="button" onClick={() => setSeed((s) => s + 1)} className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--ink)] px-5 py-3 text-[13px] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]">
          <RefreshCw size={14} /> Draw a new sample
        </button>
      </div>
    </div>
  );
}
