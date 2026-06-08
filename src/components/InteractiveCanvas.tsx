import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalVx: number;
  originalVy: number;
}

interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
}

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Create floating network nodes
    const nodeCount = Math.min(Math.floor((width * height) / 18000), 75);
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const vx = (Math.random() - 0.5) * 0.35;
      const vy = (Math.random() - 0.5) * 0.35;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius: Math.random() * 2 + 1,
        originalVx: vx,
        originalVy: vy,
      });
    }

    // Active data pulses traveling along connections
    const pulses: Pulse[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse coordinates (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const isDark = document.documentElement.classList.contains('dark');
      const connectionDist = 115;
      const connectionDistSq = connectionDist * connectionDist;
      const mouseInfluenceDist = 140;

      // Color scheme based on active theme
      const nodeColor = isDark ? 'rgba(120, 255, 209, 0.25)' : 'rgba(0, 128, 128, 0.2)';
      const lineColor = isDark ? 'rgba(120, 255, 209, 0.06)' : 'rgba(0, 128, 128, 0.05)';
      const pulseColor = isDark ? 'rgba(120, 255, 209, 0.55)' : 'rgba(0, 128, 128, 0.45)';

      // 1. Move nodes and apply mouse interaction
      nodes.forEach((node) => {
        // Normal drift
        node.x += node.vx;
        node.y += node.vy;

        // Boundary bounce
        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.originalVx *= -1;
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.originalVy *= -1;
        }

        // Mouse attraction/repulsion field
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist) {
            // Push nodes away from mouse cursor gently
            const force = (mouseInfluenceDist - dist) / mouseInfluenceDist;
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * 0.6;
            const pushY = Math.sin(angle) * force * 0.6;

            node.vx += (node.originalVx + pushX - node.vx) * 0.08;
            node.vy += (node.originalVy + pushY - node.vy) * 0.08;
          } else {
            // Return to original speed
            node.vx += (node.originalVx - node.vx) * 0.04;
            node.vy += (node.originalVy - node.vy) * 0.04;
          }
        }
      });

      // 2. Draw connections (broadphase optimized with squared distance checks)
      const activeConnections: { from: number; to: number }[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            activeConnections.push({ from: i, to: j });

            // Fade opacity based on distance
            const alpha = (connectionDist - dist) / connectionDist;
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = alpha * 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw nodes
      nodes.forEach((node) => {
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Update and spawn pulses
      // Spawn new pulses randomly along active connections
      if (Math.random() < 0.04 && activeConnections.length > 0 && pulses.length < 15) {
        const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        pulses.push({
          fromIndex: conn.from,
          toIndex: conn.to,
          progress: 0,
          speed: Math.random() * 0.015 + 0.008,
        });
      }

      // Draw active pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const fromNode = nodes[p.fromIndex];
        const toNode = nodes[p.toIndex];

        // Interpolated pulse coordinates
        const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

        ctx.fillStyle = pulseColor;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
