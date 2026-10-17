import { useEffect, useRef, useState } from 'react';

type ShapeType = 'circle' | 'github' | 'star' | 'diamond' | 'sparkle' | 'polygon';

interface Ripple {
  id: number;
  x: number;
  y: number;
  shape: ShapeType;
  color: string;
}

const GITHUB_SHAPES: ShapeType[] = ['github', 'star', 'diamond', 'sparkle'];

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isGithubLink, setIsGithubLink] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [currentShape, setCurrentShape] = useState<ShapeType>('circle');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const posRef = useRef(pos);
  posRef.current = pos;
  const trailingPosRef = useRef(trailingPos);
  trailingPosRef.current = trailingPos;

  const shapeIndexRef = useRef(0);

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // Check target hierarchy for clickable/github
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const githubLink = target.closest('a[href*="github.com"]');
      const clickable = target.closest('a, button, input, textarea, select, [role="button"], [tabindex="0"]');

      setIsGithubLink(!!githubLink);
      setIsPointer(!!clickable);
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      const target = e.target as HTMLElement | null;
      const githubLink = target?.closest('a[href*="github.com"]');

      let pickedShape: ShapeType = 'circle';
      let rippleColor = 'var(--coral)';

      if (githubLink) {
        // Cycle through cool shapes
        const nextIdx = (shapeIndexRef.current + 1) % GITHUB_SHAPES.length;
        shapeIndexRef.current = nextIdx;
        pickedShape = GITHUB_SHAPES[nextIdx];
        rippleColor = '#2B1B2E';
      } else {
        pickedShape = 'circle';
      }

      setCurrentShape(pickedShape);

      // Create burst ripple
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        shape: pickedShape,
        color: rippleColor,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      // Remove after animation completes
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 750);
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
      // Reset shape back to circle after short delay if not holding
      setTimeout(() => {
        setCurrentShape('circle');
      }, 350);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth trailing animation loop
    let animId: number;
    const animate = () => {
      setTrailingPos((prev) => {
        const dx = posRef.current.x - prev.x;
        const dy = posRef.current.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18,
        };
      });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Render SVG or inner shape based on shape type
  const renderShapeContent = (shape: ShapeType, size: number) => {
    switch (shape) {
      case 'github':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--ink)] drop-shadow-sm"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        );
      case 'star':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[var(--coral)] drop-shadow-sm animate-pulse"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      case 'sparkle':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[var(--coral-text)]"
          >
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
        );
      case 'diamond':
        return (
          <div
            style={{ width: size, height: size }}
            className="rotate-45 border-2 border-[var(--coral)] bg-[var(--coral)]/20 rounded-[2px]"
          />
        );
      case 'circle':
      default:
        return null;
    }
  };

  const isSpecialShape = currentShape !== 'circle';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Click ripples / bursts */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        >
          {ripple.shape === 'circle' ? (
            <div
              className="rounded-full border-2 border-[var(--coral)] animate-ping"
              style={{ width: '40px', height: '40px', opacity: 0.8 }}
            />
          ) : (
            <div className="scale-up-fade flex items-center justify-center">
              {renderShapeContent(ripple.shape, 32)}
            </div>
          )}
        </div>
      ))}

      {/* Main Halo Ring (trailing with soft inertia) */}
      <div
        className={`cursor-halo absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[border-color,background-color,width,height,transform] duration-200 ease-out flex items-center justify-center ${
          isGithubLink
            ? 'border-[var(--coral)] bg-[var(--coral)]/10 ring-2 ring-[var(--coral)]/30'
            : isPointer
            ? 'border-[var(--ink)] bg-[var(--ink)]/10'
            : 'border-[var(--ink)]/50 bg-[var(--coral)]/5'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            isMouseDown ? 0.75 : isGithubLink ? 1.4 : isPointer ? 1.25 : 1
          })`,
          width: isSpecialShape ? '46px' : isGithubLink ? '44px' : '36px',
          height: isSpecialShape ? '46px' : isGithubLink ? '44px' : '36px',
          boxShadow: isGithubLink
            ? '0 0 16px rgba(107, 45, 92, 0.45)'
            : '0 0 10px rgba(43, 27, 46, 0.15)',
        }}
      >
        {isSpecialShape && renderShapeContent(currentShape, 22)}
      </div>

      {/* Dot at exact cursor position */}
      {!isSpecialShape && (
        <div
          className={`cursor-dot absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
            isGithubLink
              ? 'bg-[var(--coral)] ring-2 ring-[var(--paper)]'
              : 'bg-[var(--ink)]'
          }`}
          style={{
            transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
              isMouseDown ? 1.6 : isGithubLink ? 1.3 : 1
            })`,
            width: isGithubLink ? '8px' : '6px',
            height: isGithubLink ? '8px' : '6px',
          }}
        />
      )}
    </div>
  );
}
