import { useEffect, useRef, useState } from 'react';
import { Download, Eraser, PaintBucket, Pencil, Trash2, Undo2 } from 'lucide-react';

const SIZE = 16;
const PALETTE = ['#2B1B2E', '#6B2D5C', '#944883', '#D4E157', '#C6D83B', '#FAF8F5', '#EAD0E3', '#635066', '#3D2242', '#E8A598', '#4A6FA5', '#160D18'];
type Tool = 'draw' | 'erase' | 'fill';
const KEY = 'pixel-art-v1';

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const g = raw && JSON.parse(raw);
    if (Array.isArray(g) && g.length === SIZE * SIZE) return g;
  } catch { /* storage unavailable */ }
  return Array(SIZE * SIZE).fill('');
}

function flood(grid: string[], i: number, color: string) {
  const target = grid[i];
  if (target === color) return grid;
  const out = [...grid], stack = [i];
  while (stack.length) {
    const k = stack.pop()!;
    if (out[k] !== target) continue;
    out[k] = color;
    const x = k % SIZE, y = Math.floor(k / SIZE);
    if (x > 0) stack.push(k - 1);
    if (x < SIZE - 1) stack.push(k + 1);
    if (y > 0) stack.push(k - SIZE);
    if (y < SIZE - 1) stack.push(k + SIZE);
  }
  return out;
}

const TOOLS: [Tool, string, typeof Pencil][] = [['draw', 'Draw', Pencil], ['erase', 'Erase', Eraser], ['fill', 'Fill', PaintBucket]];

export function PixelArt() {
  const [grid, setGrid] = useState<string[]>(load);
  const [color, setColor] = useState(PALETTE[4]);
  const [tool, setTool] = useState<Tool>('draw');
  const [history, setHistory] = useState<string[][]>([]);
  const painting = useRef(false);
  const board = useRef<HTMLDivElement>(null);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(grid)); } catch { /* ignore */ } }, [grid]);

  const cellAt = (e: React.PointerEvent) => {
    const r = board.current!.getBoundingClientRect();
    const x = Math.floor(((e.clientX - r.left) / r.width) * SIZE), y = Math.floor(((e.clientY - r.top) / r.height) * SIZE);
    return x < 0 || y < 0 || x >= SIZE || y >= SIZE ? -1 : y * SIZE + x;
  };
  const apply = (i: number) => {
    if (i < 0) return;
    setGrid((g) => {
      if (tool === 'fill') return flood(g, i, tool === 'fill' ? color : '');
      const v = tool === 'erase' ? '' : color;
      if (g[i] === v) return g;
      const n = [...g]; n[i] = v; return n;
    });
  };
  const down = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setHistory((h) => [...h.slice(-49), grid]);
    painting.current = tool !== 'fill';
    apply(cellAt(e));
  };
  const move = (e: React.PointerEvent) => { if (painting.current) apply(cellAt(e)); };
  const stop = () => { painting.current = false; };

  const undo = () => setHistory((h) => { if (!h.length) return h; setGrid(h[h.length - 1]); return h.slice(0, -1); });
  const clear = () => { setHistory((h) => [...h.slice(-49), grid]); setGrid(Array(SIZE * SIZE).fill('')); };
  const download = () => {
    const S = 32, c = document.createElement('canvas');
    c.width = c.height = SIZE * S;
    const ctx = c.getContext('2d')!;
    grid.forEach((col, i) => { if (col) { ctx.fillStyle = col; ctx.fillRect((i % SIZE) * S, Math.floor(i / SIZE) * S, S, S); } });
    const a = document.createElement('a'); a.download = 'my-pixel-art.png'; a.href = c.toDataURL('image/png'); a.click();
  };

  const btn = 'inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-4 py-2.5 text-[13px] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-inherit';

  return (
    <div className="grid gap-8 border border-[var(--line)] bg-[var(--card)] p-5 md:grid-cols-[1fr_1fr] md:gap-10 md:p-8">
      <div className="mx-auto w-full max-w-[460px]">
        <div
          ref={board} role="application" aria-label="16 by 16 pixel canvas. Click or drag to paint."
          className="grid-paper-off grid w-full touch-none select-none cursor-crosshair border border-[var(--ink)]/40 bg-[#fbf9f2]"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, aspectRatio: '1' }}
          onPointerDown={down} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop}
        >
          {grid.map((c, i) => <div key={i} style={{ background: c || undefined, boxShadow: 'inset 0 0 0 .5px rgba(32,61,54,.14)' }} />)}
        </div>
        <p className="mono soft mt-3 text-[11px]">Click or drag to paint. Your art is saved in this browser.</p>
      </div>
      <div className="flex flex-col justify-center gap-6">
        <div>
          <p className="eyebrow soft mb-3">Tool</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tools">
            {TOOLS.map(([t, label, Icon]) => (
              <button key={t} type="button" aria-pressed={tool === t} onClick={() => setTool(t)} className={`${btn} ${tool === t ? 'bg-[var(--ink)] text-[var(--paper)]' : ''}`}><Icon size={14} /> {label}</button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow soft mb-3">Colour</p>
          <div className="grid grid-cols-6 gap-2 sm:max-w-[320px]" role="group" aria-label="Colour palette">
            {PALETTE.map((p) => (
              <button key={p} type="button" aria-label={`Colour ${p}`} aria-pressed={color === p} onClick={() => { setColor(p); if (tool === 'erase') setTool('draw'); }}
                className="aspect-square rounded-full border border-[var(--ink)]/30 transition-transform hover:scale-110" style={{ background: p, outline: color === p ? '3px solid var(--coral)' : 'none', outlineOffset: 2 }} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={undo} disabled={!history.length} className={btn}><Undo2 size={14} /> Undo</button>
          <button type="button" onClick={clear} className={btn}><Trash2 size={14} /> Clear</button>
          <button type="button" onClick={download} className={btn}><Download size={14} /> Save PNG</button>
        </div>
      </div>
    </div>
  );
}