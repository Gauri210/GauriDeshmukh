import type { Art } from '@/content';

const INK = '#203d36';
const CORAL = '#dc775b';
const LIME = '#d5dc83';

const Label = ({ children }: { children: string }) => (
  <span className="absolute left-4 bottom-3 mono text-[9.5px] uppercase tracking-wider text-[var(--soft)] bg-[var(--paper)]/90 px-2 py-0.5 rounded-md border border-[var(--ink)]/10 select-none pointer-events-none z-10">
    {children}
  </span>
);

export function Artwork({ kind }: { kind: Art }) {
  const base = 'project-art grid-paper relative h-full w-full overflow-hidden select-none transition-transform duration-500 bg-[var(--card)]';

  // 1. AKSHAR: a Modi script handwriting canvas with a live OCR bounding box
  if (kind === 'akshar') {
    return (
      <div className={base} role="img" aria-label="Modi script handwriting canvas with a live OCR bounding box">
        <svg viewBox="0 0 380 180" className="absolute inset-0 h-full w-full">
          <line x1="40" y1="95" x2="340" y2="95" stroke={INK} strokeOpacity="0.12" strokeDasharray="4 6" />
          <line x1="40" y1="135" x2="340" y2="135" stroke={INK} strokeOpacity="0.08" />
          <rect x="115" y="28" width="150" height="125" rx="4" fill="none" stroke={CORAL} strokeWidth="1.5" strokeDasharray="5 5" strokeOpacity="0.6" />
          <path d="M110 38 V 28 H 120 M265 28 H 255 V 38 M110 143 V 153 H 120 M265 153 H 255 V 143" stroke={CORAL} strokeWidth="2" fill="none" />
          <path
            d="M135 48 H 245 M188 48 V 138 M188 88 C 160 88 140 100 140 118 C 140 136 166 142 188 126 M188 88 C 215 88 238 104 238 124 C 238 142 212 144 196 132"
            fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          />
          {[{ cx: 135, cy: 48 }, { cx: 188, cy: 48 }, { cx: 245, cy: 48 }, { cx: 188, cy: 88 }, { cx: 140, cy: 118 }, { cx: 188, cy: 138 }, { cx: 238, cy: 124 }].map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r="2.5" fill={i === 1 ? CORAL : LIME} stroke={INK} strokeWidth="1" />
          ))}
        </svg>
        <Label>Modi script · live OCR canvas, in progress</Label>
      </div>
    );
  }

  // 2. FINLENS: semantic RAG retrieval over a 10-K
  if (kind === 'finlens') {
    return (
      <div className={base} role="img" aria-label="Financial document RAG retrieval diagram">
        <svg viewBox="0 0 380 180" className="absolute inset-0 h-full w-full">
          <g transform="translate(32, 28)">
            <rect width="90" height="114" rx="3" fill="#FCFAF8" stroke={INK} strokeWidth="1.2" />
            <line x1="12" y1="18" x2="48" y2="18" stroke={CORAL} strokeWidth="3" strokeLinecap="round" />
            <line x1="12" y1="28" x2="78" y2="28" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
            <line x1="12" y1="36" x2="68" y2="36" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
            <rect x="8" y="54" width="74" height="28" rx="2" fill={LIME} fillOpacity="0.45" stroke={INK} strokeWidth="1" strokeDasharray="2 2" />
            <line x1="12" y1="62" x2="78" y2="62" stroke={INK} strokeOpacity="0.85" strokeWidth="2" />
            <line x1="12" y1="92" x2="74" y2="92" stroke={INK} strokeOpacity="0.2" strokeWidth="2" />
          </g>
          <path d="M122 96 C 160 96 170 65 210 65" fill="none" stroke={CORAL} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M122 96 C 160 96 170 115 210 115" fill="none" stroke={INK} strokeWidth="1.5" strokeOpacity="0.4" />
          <g transform="translate(225, 25)">
            <circle cx="20" cy="40" r="6" fill={CORAL} stroke={INK} strokeWidth="1.5" />
            <text x="32" y="44" fill={INK} fontSize="9" fontFamily="monospace" fontWeight="bold">QUERY</text>
            {[{ cx: 65, cy: 25, score: '0.91' }, { cx: 85, cy: 55, score: '0.86' }, { cx: 50, cy: 85, score: '0.78' }].map((n, i) => (
              <g key={i}>
                <line x1="20" y1="40" x2={n.cx} y2={n.cy} stroke={i === 0 ? CORAL : INK} strokeWidth={i === 0 ? '1.6' : '1'} strokeOpacity={i === 0 ? 0.9 : 0.3} strokeDasharray={i === 0 ? undefined : '2 2'} />
                <circle cx={n.cx} cy={n.cy} r="5" fill={i === 0 ? LIME : '#FAF8F5'} stroke={INK} strokeWidth="1.5" />
                <text x={n.cx + 9} y={n.cy + 3} fill="var(--coral-text)" fontSize="8" fontFamily="monospace">{n.score}</text>
              </g>
            ))}
          </g>
        </svg>
        <Label>Financial 10-K · RAG retrieval</Label>
      </div>
    );
  }

  // 3. PCOS DETECTION: ultrasound follicles with CNN vs Naive Bayes
  if (kind === 'pcos') {
    return (
      <div className={base} role="img" aria-label="Ultrasound image with follicle detection, CNN versus Naive Bayes">
        <svg viewBox="0 0 380 180" className="absolute inset-0 h-full w-full">
          <path d="M 120 18 L 40 148 A 120 120 0 0 0 200 148 Z" fill={INK} fillOpacity="0.08" stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" />
          <ellipse cx="120" cy="92" rx="52" ry="36" fill="#f7f4eb" stroke={INK} strokeWidth="1.5" />
          {[{ cx: 85, cy: 82, r: 8 }, { cx: 102, cy: 68, r: 7 }, { cx: 126, cy: 66, r: 8 }, { cx: 148, cy: 80, r: 7.5 }, { cx: 154, cy: 102, r: 8 }, { cx: 135, cy: 116, r: 7 }, { cx: 98, cy: 112, r: 8.5 }].map((f, i) => (
            <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill={INK} fillOpacity="0.25" stroke={CORAL} strokeWidth="1.2" />
          ))}
          <g transform="translate(205, 36)">
            <rect width="145" height="95" rx="3" fill="#FCFAF8" stroke={INK} strokeWidth="1.2" />
            <text x="14" y="24" fill={INK} fontSize="9" fontFamily="monospace" fontWeight="bold">CNN (4-BLOCK)</text>
            <rect x="14" y="30" width="117" height="8" rx="2" fill={INK} fillOpacity="0.12" />
            <rect x="14" y="30" width="116" height="8" rx="2" fill={LIME} stroke={INK} strokeWidth="0.8" />
            <text x="14" y="50" fill="var(--soft)" fontSize="8" fontFamily="monospace">ACC 78.8% · REC 99.0%</text>
            <text x="14" y="68" fill={INK} fontSize="9" fontFamily="monospace" fontWeight="bold">NAIVE BAYES</text>
            <rect x="14" y="74" width="117" height="8" rx="2" fill={INK} fillOpacity="0.12" />
            <rect x="14" y="74" width="64" height="8" rx="2" fill={CORAL} stroke={INK} strokeWidth="0.8" />
            <text x="14" y="93" fill="var(--soft)" fontSize="8" fontFamily="monospace">ACC 61.2% · REC 54.7%</text>
          </g>
        </svg>
        <Label>CNN vs Naive Bayes · ultrasound classification</Label>
      </div>
    );
  }

  // 4. GROUPTHINK IN MAS: Asch-style multi-agent deliberation
  if (kind === 'groupthink') {
    return (
      <div className={base} role="img" aria-label="Multi-agent deliberation graph, group versus a contrarian agent">
        <svg viewBox="0 0 380 180" className="absolute inset-0 h-full w-full">
          <line x1="85" y1="75" x2="165" y2="45" stroke={INK} strokeWidth="1.6" strokeOpacity="0.4" />
          <line x1="165" y1="45" x2="245" y2="75" stroke={INK} strokeWidth="1.6" strokeOpacity="0.4" />
          <line x1="85" y1="75" x2="165" y2="115" stroke={INK} strokeWidth="1.6" strokeOpacity="0.4" />
          <line x1="165" y1="115" x2="245" y2="75" stroke={INK} strokeWidth="1.6" strokeOpacity="0.4" />
          <line x1="245" y1="75" x2="320" y2="75" stroke={CORAL} strokeWidth="2" strokeDasharray="4 4" />
          {[
            { cx: 85, cy: 75, role: 'Peer A' },
            { cx: 165, cy: 45, role: 'Peer B' },
            { cx: 165, cy: 115, role: 'Peer C' },
            { cx: 245, cy: 75, role: 'Group (76%)', fill: LIME },
            { cx: 320, cy: 75, role: 'Contrarian', fill: CORAL },
          ].map((agent, i) => (
            <g key={i}>
              <circle cx={agent.cx} cy={agent.cy} r={i >= 3 ? 15 : 13} fill={agent.fill || '#FAF8F5'} stroke={INK} strokeWidth="1.5" />
              <text x={agent.cx} y={agent.cy + (agent.cy > 70 ? 25 : -18)} fill={INK} fontSize="8" fontFamily="monospace" textAnchor="middle">{agent.role}</text>
            </g>
          ))}
        </svg>
        <Label>Asch-style conformity test on LLM agents</Label>
      </div>
    );
  }

  // 5. USD/INR, GOLD & CRUDE: VAR beating ARIMA
  if (kind === 'macro-var') {
    return (
      <div className={base} role="img" aria-label="USD/INR, gold and crude oil forecast comparing VAR and ARIMA">
        <svg viewBox="0 0 380 180" className="absolute inset-0 h-full w-full">
          <line x1="30" y1="45" x2="350" y2="45" stroke={INK} strokeOpacity="0.08" strokeDasharray="3 4" />
          <line x1="30" y1="85" x2="350" y2="85" stroke={INK} strokeOpacity="0.08" strokeDasharray="3 4" />
          <line x1="30" y1="125" x2="350" y2="125" stroke={INK} strokeOpacity="0.08" strokeDasharray="3 4" />
          <line x1="240" y1="28" x2="240" y2="148" stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" strokeOpacity="0.45" />
          <polygon points="240,88 350,58 350,118 240,88" fill={CORAL} fillOpacity="0.12" />
          <path d="M 30 115 Q 80 125, 120 100 T 190 92 T 240 88 T 290 82 T 350 72" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 30 68 Q 75 52, 115 78 T 185 82 T 240 76 T 295 62 T 350 56" fill="none" stroke={CORAL} strokeWidth="2" strokeLinecap="round" />
          <path d="M 30 138 Q 85 142, 125 128 T 195 118 T 240 106 T 285 102 T 350 96" fill="none" stroke="#8fa46b" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <Label>USD/INR, gold, crude · VAR beat ARIMA on a 60-day holdout</Label>
      </div>
    );
  }

  return (
    <div className={base} role="img">
      <Label>Project artwork</Label>
    </div>
  );
}