import { useEffect, useRef } from 'react';

interface NeonColor {
  r: number;
  g: number;
  b: number;
  hex: string;
}

// Hyper-Vibrant Neon Dots Palette (Crisp, punchy, colorful dots)
const NEON_PALETTE: NeonColor[] = [
  { r: 0, g: 245, b: 255, hex: '#00f5ff' },   // Electric Neon Cyan
  { r: 255, g: 0, b: 128, hex: '#ff0080' },   // Vivid Magenta / Pink
  { r: 168, g: 50, b: 255, hex: '#a832ff' },  // Deep Electric Violet
  { r: 0, g: 255, b: 140, hex: '#00ff8c' },   // Radiant Neon Green
  { r: 255, g: 220, b: 0, hex: '#ffdc00' },   // Bright Electric Gold
  { r: 255, g: 80, b: 0, hex: '#ff5000' },    // Fiery Neon Coral
  { r: 0, g: 140, b: 255, hex: '#008cff' },   // Cyber Electric Blue
  { r: 255, g: 16, b: 170, hex: '#ff10aa' },  // Neon Fuchsia
];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalVx: number;
  originalVy: number;
  depth: number; // 0.4 (background) to 1.2 (foreground)
  color: NeonColor;
  behavior: 'attract' | 'repel' | 'drift';
  chaseSpeed: number;
  targetX?: number; // Dynamic target when assembling into JOJO
  targetY?: number;
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: NeonColor;
}

interface AmbientGlow {
  baseX: number;
  baseY: number;
  radius: number;
  color: NeonColor;
  speedX: number;
  speedY: number;
  phase: number;
}

interface LetterStar {
  dx: number;
  dy: number;
  letterIndex: number;
  connectsTo: number[];
}

// Well-proportioned, unmistakable, readable letter coordinates for J - O - J - O (32 stars)
// Letter width: ~48px, height: ~76px, letter gap: ~26px
const JOJO_LETTERS: LetterStar[] = [
  // --- Letter 1: 'J' (indices 0..7) ---
  // Top bar:
  { dx: -120, dy: -38, letterIndex: 0, connectsTo: [1] },
  { dx: -100, dy: -38, letterIndex: 0, connectsTo: [2, 3] },
  { dx: -80, dy: -38, letterIndex: 0, connectsTo: [] },
  // Vertical stem descending:
  { dx: -100, dy: -18, letterIndex: 0, connectsTo: [4] },
  { dx: -100, dy: 6, letterIndex: 0, connectsTo: [5] },
  { dx: -100, dy: 26, letterIndex: 0, connectsTo: [6] },
  // Bottom curve:
  { dx: -112, dy: 38, letterIndex: 0, connectsTo: [7] },
  { dx: -128, dy: 24, letterIndex: 0, connectsTo: [] },

  // --- Letter 2: 'O' (indices 8..15, smooth elliptical loop centered at -35) ---
  { dx: -35, dy: -38, letterIndex: 1, connectsTo: [9] },
  { dx: -18, dy: -27, letterIndex: 1, connectsTo: [10] },
  { dx: -12, dy: 0, letterIndex: 1, connectsTo: [11] },
  { dx: -18, dy: 27, letterIndex: 1, connectsTo: [12] },
  { dx: -35, dy: 38, letterIndex: 1, connectsTo: [13] },
  { dx: -52, dy: 27, letterIndex: 1, connectsTo: [14] },
  { dx: -58, dy: 0, letterIndex: 1, connectsTo: [15] },
  { dx: -52, dy: -27, letterIndex: 1, connectsTo: [8] },

  // --- Letter 3: 'J' (indices 16..23) ---
  // Top bar:
  { dx: 15, dy: -38, letterIndex: 2, connectsTo: [17] },
  { dx: 35, dy: -38, letterIndex: 2, connectsTo: [18, 19] },
  { dx: 55, dy: -38, letterIndex: 2, connectsTo: [] },
  // Vertical stem descending:
  { dx: 35, dy: -18, letterIndex: 2, connectsTo: [20] },
  { dx: 35, dy: 6, letterIndex: 2, connectsTo: [21] },
  { dx: 35, dy: 26, letterIndex: 2, connectsTo: [22] },
  // Bottom curve:
  { dx: 23, dy: 38, letterIndex: 2, connectsTo: [23] },
  { dx: 7, dy: 24, letterIndex: 2, connectsTo: [] },

  // --- Letter 4: 'O' (indices 24..31, smooth elliptical loop centered at 100) ---
  { dx: 100, dy: -38, letterIndex: 3, connectsTo: [25] },
  { dx: 117, dy: -27, letterIndex: 3, connectsTo: [26] },
  { dx: 123, dy: 0, letterIndex: 3, connectsTo: [27] },
  { dx: 117, dy: 27, letterIndex: 3, connectsTo: [28] },
  { dx: 100, dy: 38, letterIndex: 3, connectsTo: [29] },
  { dx: 83, dy: 27, letterIndex: 3, connectsTo: [30] },
  { dx: 77, dy: 0, letterIndex: 3, connectsTo: [31] },
  { dx: 83, dy: -27, letterIndex: 3, connectsTo: [24] },
];

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
    targetX: window.innerWidth * 0.5,
    targetY: window.innerHeight * 0.5,
    isInside: false,
    influence: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // High density of crisp, hyper-vibrant neon dots (110 - 130 nodes)
    const nodeCount = Math.min(Math.floor((width * height) / 9500), 125);
    const nodes: Node[] = [];

    // Dynamic Re-Assembly Constellation Controller
    const constellation = {
      phase: 'idle' as 'idle' | 'forming' | 'holding' | 'dissolving',
      timer: 300, // Starts forming leisurely after ~5s
      activeIndices: [] as number[],
      centerX: 0,
      centerY: 0,
      opacity: 0,
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reset active constellation gracefully on window resize
      constellation.phase = 'idle';
      constellation.timer = 300;
      constellation.opacity = 0;
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].targetX = undefined;
        nodes[i].targetY = undefined;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseRef.current.isInside) {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        mouseRef.current.isInside = true;
      }
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    // 1. Quiet, soft atmospheric ambient glow (subtle, non-distracting)
    const ambientGlows: AmbientGlow[] = [
      { baseX: 0.2, baseY: 0.25, radius: 450, color: NEON_PALETTE[2], speedX: 0.0004, speedY: 0.0005, phase: 0 },
      { baseX: 0.8, baseY: 0.75, radius: 500, color: NEON_PALETTE[0], speedX: 0.0005, speedY: 0.0004, phase: 2.5 },
    ];

    // Populate nodes
    for (let i = 0; i < nodeCount; i++) {
      const depth = Math.random() * 0.8 + 0.4;
      const vx = (Math.random() - 0.5) * 0.45 * depth;
      const vy = (Math.random() - 0.5) * 0.45 * depth;
      const radius = depth > 0.8 ? Math.random() * 0.8 + 2.2 : Math.random() * 0.6 + 1.3;
      const color = NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)];
      const rand = Math.random();
      // ~35% chase cursor, ~40% flee/repel away, ~25% serene drifters
      const behavior: 'attract' | 'repel' | 'drift' =
        rand < 0.35 ? 'attract' : rand < 0.75 ? 'repel' : 'drift';
      const chaseSpeed = Math.random() * 0.045 + 0.03;

      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius,
        originalVx: vx,
        originalVy: vy,
        depth,
        color,
        behavior,
        chaseSpeed,
      });
    }

    resize();

    const pulses: Pulse[] = [];
    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      mouse.influence += ((mouse.isInside ? 1 : 0) - mouse.influence) * 0.08;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const isDark = document.documentElement.classList.contains('dark');
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const parallaxFactorX = (mouse.x - centerX) * 0.02 * mouse.influence;
      const parallaxFactorY = (mouse.y - centerY) * 0.02 * mouse.influence;

      // --- STEP 1: Soft Ambient Background Lighting ---
      const glowAlpha = isDark ? 0.04 : 0.025;
      for (let i = 0; i < ambientGlows.length; i++) {
        const g = ambientGlows[i];
        const gx = width * g.baseX + Math.sin(time * g.speedX + g.phase) * (width * 0.05);
        const gy = height * g.baseY + Math.cos(time * g.speedY + g.phase) * (height * 0.05);

        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, g.radius);
        grad.addColorStop(0, `rgba(${g.color.r}, ${g.color.g}, ${g.color.b}, ${glowAlpha})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(gx, gy, g.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- DYNAMIC RE-ASSEMBLY STATE MACHINE (Slow, Graceful Cosmic Alignment) ---
      constellation.timer--;

      if (constellation.phase === 'forming') {
        // Smoothly fade in constellation lines over 450 frames (~7.5s)
        constellation.opacity = Math.min((1 - constellation.timer / 450) * 0.75, 0.75);
      } else if (constellation.phase === 'holding') {
        constellation.opacity = 0.75;
      } else if (constellation.phase === 'dissolving') {
        // Smoothly fade out constellation lines
        constellation.opacity = Math.max((constellation.timer / 180) * 0.75, 0);
      } else {
        constellation.opacity = 0;
      }

      if (constellation.timer <= 0) {
        if (constellation.phase === 'idle') {
          // Select an open celestial location on screen (upper-right quadrant on desktop)
          const isMobile = width < 768;
          const minX = isMobile ? width * 0.35 : width * 0.60;
          const maxX = isMobile ? width * 0.65 : Math.max(width * 0.68, width - 280);
          const minY = isMobile ? height * 0.16 : height * 0.20;
          const maxY = isMobile ? height * 0.35 : height * 0.42;

          constellation.centerX = minX + Math.random() * (maxX - minX);
          constellation.centerY = minY + Math.random() * (maxY - minY);

          // Optimal Spatial Matching: Assign each specific letter star position
          // to the physically closest ambient node so trajectory paths never cross
          const scale = isMobile ? 0.75 : Math.min(Math.max(width * 0.001, 0.95), 1.25);
          const available = nodes.map((_, i) => i);
          const assignedIndices: number[] = new Array(JOJO_LETTERS.length);

          for (let k = 0; k < JOJO_LETTERS.length; k++) {
            const letter = JOJO_LETTERS[k];
            const targetX = constellation.centerX + letter.dx * scale;
            const targetY = constellation.centerY + letter.dy * scale;

            let bestNodeIdx = available[0];
            let bestDistSq = Infinity;
            let bestAvailPos = 0;

            for (let a = 0; a < available.length; a++) {
              const nodeIdx = available[a];
              const n = nodes[nodeIdx];
              const dSq = (n.x - targetX) ** 2 + (n.y - targetY) ** 2;
              if (dSq < bestDistSq) {
                bestDistSq = dSq;
                bestNodeIdx = nodeIdx;
                bestAvailPos = a;
              }
            }

            assignedIndices[k] = bestNodeIdx;
            available.splice(bestAvailPos, 1);

            nodes[bestNodeIdx].targetX = targetX;
            nodes[bestNodeIdx].targetY = targetY;
          }

          constellation.activeIndices = assignedIndices;
          constellation.phase = 'forming';
          constellation.timer = 320; // Smooth, gentle glide (~5.3s)
        } else if (constellation.phase === 'forming') {
          constellation.phase = 'holding';
          constellation.timer = 380; // ~6.3s clear hold
        } else if (constellation.phase === 'holding') {
          constellation.phase = 'dissolving';
          constellation.timer = 150; // ~2.5s dissolve
          for (const idx of constellation.activeIndices) {
            nodes[idx].targetX = undefined;
            nodes[idx].targetY = undefined;
          }
        } else if (constellation.phase === 'dissolving') {
          constellation.phase = 'idle';
          constellation.activeIndices = [];
          constellation.timer = Math.floor(Math.random() * 200 + 400); // ~7 - 10s idle
        }
      }

      // Pre-calculate positions
      const renderedX = new Float32Array(nodes.length);
      const renderedY = new Float32Array(nodes.length);

      // --- STEP 2: Node Drift, Gentle Assembly & Break-up Physics ---
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Screen edge bounds
        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.originalVx *= -1;
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.originalVy *= -1;
        }

        // Gentle, Slow Celestial Drift into Constellation
        if (node.targetX !== undefined && node.targetY !== undefined) {
          const progress = constellation.phase === 'forming' ? (1 - constellation.timer / 320) : 1;
          const pull = 0.005 + progress * 0.016;

          // Organic sway so it breathes while formed
          const swayX = Math.sin(time * 0.016 + i) * 2;
          const swayY = Math.cos(time * 0.02 + i * 1.2) * 2;

          node.vx += (node.targetX + swayX - node.x) * pull;
          node.vy += (node.targetY + swayY - node.y) * pull;

          // Gentle velocity damping so stars glide smoothly into position
          const currentSpeed = Math.hypot(node.vx, node.vy);
          if (currentSpeed > 0.95) {
            node.vx = (node.vx / currentSpeed) * 0.95;
            node.vy = (node.vy / currentSpeed) * 0.95;
          }

          node.vx *= 0.93;
          node.vy *= 0.93;
        }

        // Cursor Chase & Evade Interaction (CAN BREAK UP CONSTELLATION)
        if (mouse.influence > 0.05) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distSq = dx * dx + dy * dy;

          if (node.behavior === 'attract') {
            const chaseRange = 260;
            const orbitRadius = 40;

            if (distSq < chaseRange * chaseRange && distSq > orbitRadius * orbitRadius) {
              const dist = Math.sqrt(distSq);
              const pull = (1 - dist / chaseRange) * node.chaseSpeed * mouse.influence;
              const angle = Math.atan2(dy, dx);
              node.vx += Math.cos(angle) * pull;
              node.vy += Math.sin(angle) * pull;
              node.vx *= 0.96;
              node.vy *= 0.96;
            } else if (distSq <= orbitRadius * orbitRadius) {
              const orbitAngle = Math.atan2(dy, dx) + Math.PI * 0.5;
              node.vx += Math.cos(orbitAngle) * 0.05;
              node.vy += Math.sin(orbitAngle) * 0.05;
            } else if (node.targetX === undefined) {
              node.vx += (node.originalVx - node.vx) * 0.025;
              node.vy += (node.originalVy - node.vy) * 0.025;
            }
          } else if (node.behavior === 'repel') {
            const fleeRange = 120;
            if (distSq < fleeRange * fleeRange) {
              const dist = Math.sqrt(distSq);
              const push = ((fleeRange - dist) / fleeRange) * 0.08 * mouse.influence;
              const angle = Math.atan2(-dy, -dx);
              node.vx += Math.cos(angle) * push;
              node.vy += Math.sin(angle) * push;
            } else if (node.targetX === undefined) {
              node.vx += (node.originalVx - node.vx) * 0.02;
              node.vy += (node.originalVy - node.vy) * 0.02;
            }
          } else if (node.targetX === undefined) {
            node.vx += (node.originalVx - node.vx) * 0.015;
            node.vy += (node.originalVy - node.vy) * 0.015;
          }
        } else if (node.targetX === undefined) {
          node.vx += (node.originalVx - node.vx) * 0.015;
          node.vy += (node.originalVy - node.vy) * 0.015;
        }

        renderedX[i] = node.x + parallaxFactorX * node.depth;
        renderedY[i] = node.y + parallaxFactorY * node.depth;
      }

      // If cursor directly enters the active constellation, scatter it and trigger dissolution
      if (
        (constellation.phase === 'holding' || constellation.phase === 'forming') &&
        mouse.influence > 0.25
      ) {
        const mouseDistToCenter = Math.hypot(mouse.x - constellation.centerX, mouse.y - constellation.centerY);
        if (mouseDistToCenter < 140) {
          constellation.phase = 'dissolving';
          constellation.timer = 90;
          for (const idx of constellation.activeIndices) {
            nodes[idx].targetX = undefined;
            nodes[idx].targetY = undefined;
          }
        }
      }

      // --- STEP 3: Readable Constellation Letter Strokes (J - O - J - O) ---
      if (constellation.opacity > 0.02 && constellation.activeIndices.length === JOJO_LETTERS.length) {
        const letterColors = [
          NEON_PALETTE[0], // J: Cyan
          NEON_PALETTE[1], // O: Magenta
          NEON_PALETTE[2], // J: Violet
          NEON_PALETTE[3], // O: Emerald
        ];

        ctx.lineWidth = 1.6;
        for (let k = 0; k < JOJO_LETTERS.length; k++) {
          const letter = JOJO_LETTERS[k];
          if (!letter.connectsTo || letter.connectsTo.length === 0) continue;

          const n1Idx = constellation.activeIndices[k];
          const x1 = renderedX[n1Idx];
          const y1 = renderedY[n1Idx];
          const color = letterColors[letter.letterIndex];

          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity * (isDark ? 0.85 : 0.65)})`;

          for (const targetK of letter.connectsTo) {
            const n2Idx = constellation.activeIndices[targetK];
            const x2 = renderedX[n2Idx];
            const y2 = renderedY[n2Idx];

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // --- STEP 4: Ambient Dynamic Geometric Connection Threads ---
      const connectionDist = 78;
      const connectionDistSq = connectionDist * connectionDist;
      const activeConnections: { from: number; to: number; color: NeonColor }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const x1 = renderedX[i];
        const y1 = renderedY[i];
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          // Prevent ambient lines from cross-connecting inside the constellation
          if (n1.targetX !== undefined && nodes[j].targetX !== undefined) continue;

          const x2 = renderedX[j];
          const y2 = renderedY[j];
          const dx = x1 - x2;
          const dy = y1 - y2;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            activeConnections.push({ from: i, to: j, color: n1.color });

            const alpha = (1 - dist / connectionDist) * (isDark ? 0.32 : 0.2);
            ctx.strokeStyle = `rgba(${n1.color.r}, ${n1.color.g}, ${n1.color.b}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // --- STEP 5: Subtle Cursor Connection ---
      if (mouse.influence > 0.05) {
        const cursorConnectDist = 130;
        const cursorConnectDistSq = cursorConnectDist * cursorConnectDist;

        for (let i = 0; i < nodes.length; i++) {
          const nx = renderedX[i];
          const ny = renderedY[i];
          const dx = nx - mouse.x;
          const dy = ny - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < cursorConnectDistSq) {
            const dist = Math.sqrt(distSq);
            const intensity = (1 - dist / cursorConnectDist) * mouse.influence;
            const lineAlpha = intensity * (isDark ? 0.45 : 0.3);
            const c = nodes[i].color;

            ctx.strokeStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          }
        }
      }

      // --- STEP 6: Crisp, Solid, Hyper-Vibrant Neon Dots (Zero Blurry Halos) ---
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.fillStyle = node.color.hex;
        ctx.beginPath();
        ctx.arc(renderedX[i], renderedY[i], node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- STEP 7: Fast Multi-Color Energy Pulses ---
      if (Math.random() < 0.035 && activeConnections.length > 0 && pulses.length < 10) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        pulses.push({
          fromIndex: conn.from,
          toIndex: conn.to,
          progress: 0,
          speed: Math.random() * 0.022 + 0.014,
          color: conn.color,
        });
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const x1 = renderedX[p.fromIndex];
        const y1 = renderedY[p.fromIndex];
        const x2 = renderedX[p.toIndex];
        const y2 = renderedY[p.toIndex];
        const px = x1 + (x2 - x1) * p.progress;
        const py = y1 + (y2 - y1) * p.progress;

        ctx.fillStyle = p.color.hex;
        ctx.beginPath();
        ctx.arc(px, py, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
