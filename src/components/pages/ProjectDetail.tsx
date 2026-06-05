import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Project, projectsData } from '../../data/projects';
import { FaGithub, FaPlay, FaUndo } from 'react-icons/fa';

interface ProjectDetailProps {
  projectIndex: number;
  onNavigateBack: () => void;
  onSelectProject: (index: number) => void;
}

interface Point {
  x: number;
  y: number;
}

const COLS = 14;
const ROWS = 7;
const START: Point = { x: 1, y: 3 };
const GOAL: Point = { x: 12, y: 3 };

// Breadth-First Search (BFS) pathfinder for real-time grid navigation
const findPath = (grid: number[][]): Point[] => {
  const queue: Point[][] = [[START]];
  const visited = new Set<string>();
  visited.add(`${START.x},${START.y}`);

  while (queue.length > 0) {
    const path = queue.shift()!;
    const curr = path[path.length - 1];

    if (curr.x === GOAL.x && curr.y === GOAL.y) {
      return path;
    }

    const directions = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    for (const dir of directions) {
      const nx = curr.x + dir.x;
      const ny = curr.y + dir.y;

      if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS) {
        if (grid[ny][nx] !== 1 && !visited.has(`${nx},${ny}`)) {
          visited.add(`${nx},${ny}`);
          queue.push([...path, { x: nx, y: ny }]);
        }
      }
    }
  }
  return [];
};

export default function ProjectDetail({ projectIndex, onNavigateBack, onSelectProject }: ProjectDetailProps) {
  const project: Project = projectsData[projectIndex];
  const totalProjects = projectsData.length;
  const nextIndex = (projectIndex + 1) % totalProjects;
  const nextProject = projectsData[nextIndex];

  // Pathfinding Simulator States
  const [grid, setGrid] = useState<number[][]>(() =>
    Array(ROWS).fill(null).map(() => Array(COLS).fill(0))
  );
  const [path, setPath] = useState<Point[]>([]);
  const [robotPos, setRobotPos] = useState<Point>(START);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visitedHistory, setVisitedHistory] = useState<Point[]>([]);

  useEffect(() => {
    const calculatedPath = findPath(grid);
    setPath(calculatedPath);
    setRobotPos(START);
    setVisitedHistory([]);
  }, [grid, projectIndex]); // recalculate if grid or project changes

  const toggleWall = (r: number, c: number) => {
    if (isAnimating) return;
    if ((r === START.y && c === START.x) || (r === GOAL.y && c === GOAL.x)) return;

    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = next[r][c] === 1 ? 0 : 1;
      return next;
    });
  };

  const clearGrid = () => {
    if (isAnimating) return;
    setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
  };

  const runSimulation = () => {
    if (isAnimating || path.length === 0) return;
    setIsAnimating(true);
    setRobotPos(START);
    setVisitedHistory([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step >= path.length) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }

      const currentPos = path[step];
      setRobotPos(currentPos);
      setVisitedHistory((prev) => [...prev, currentPos]);
      step++;
    }, 180);
  };

  const isCellInPath = (r: number, c: number) => {
    return path.some((p) => p.x === c && p.y === r);
  };

  const isCellVisited = (r: number, c: number) => {
    return visitedHistory.some((p) => p.x === c && p.y === r);
  };

  return (
    <div className="min-h-screen px-6 md:px-12 max-w-5xl mx-auto pt-32 pb-16 select-none">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onNavigateBack}
        className="group flex items-center gap-2 mb-10 text-textSecondary hover:text-accent font-display text-sm font-bold tracking-wider uppercase focus:outline-none"
      >
        <span className="transform group-hover:-translate-x-1.5 transition-all duration-200">
          ←
        </span>
        Back to work
      </motion.button>

      {/* Grid Layout: Left Description, Right Meta Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-borderAccent pb-12">
        <div className="md:col-span-2 flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-textPrimary leading-none"
          >
            {project.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-lg md:text-xl text-accent font-medium leading-relaxed"
          >
            {project.shortDescription}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-sm sm:text-base text-textSecondary leading-relaxed"
          >
            {project.detailedDescription}
          </motion.p>
        </div>

        {/* Metadata Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col gap-6 border-t md:border-t-0 md:border-l border-borderAccent pt-8 md:pt-0 md:pl-10"
        >
          <div>
            <span className="block text-[10px] font-display font-bold tracking-widest text-textSecondary/50 uppercase mb-1">
              Timeline
            </span>
            <span className="font-sans text-sm font-bold text-textPrimary">
              {project.date}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-display font-bold tracking-widest text-textSecondary/50 uppercase mb-1">
              Role
            </span>
            <span className="font-sans text-sm font-bold text-textPrimary">
              {project.role}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-display font-bold tracking-widest text-textSecondary/50 uppercase mb-1">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-sans text-[10px] tracking-wide uppercase px-2 py-0.5 rounded border border-borderAccent bg-surface text-textSecondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-borderAccent">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-xs font-display font-bold tracking-wider text-textPrimary hover:text-accent uppercase transition-colors"
              >
                <FaGithub size={16} />
                GitHub Repository
                <span className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all">
                  ↗
                </span>
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Visual Block Section (Conditional Pathfinder Widget for ROS 2) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 w-full rounded-2xl bg-surface border border-borderAccent flex flex-col justify-between overflow-hidden relative shadow-sm"
      >
        {/* Top Control Bar (Mac style) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-borderAccent bg-bg/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80 block" />
            <span className="text-[10px] font-mono ml-4 text-textSecondary/40 tracking-wider">
              {project.id === 'cyberrunner' ? 'ros2-navigation-slam.py' : `${project.title.toLowerCase().replace(/\s+/g, '-')}.log`}
            </span>
          </div>

          {project.id === 'cyberrunner' && (
            <div className="flex gap-4">
              <button
                onClick={runSimulation}
                disabled={isAnimating || path.length === 0}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-accent text-bg text-[10px] font-display font-bold tracking-wider uppercase disabled:opacity-40 hover:bg-accentHover transition-colors"
              >
                <FaPlay size={8} /> Execute SLAM Path
              </button>
              <button
                onClick={clearGrid}
                disabled={isAnimating}
                className="flex items-center gap-1.5 px-3 py-1 rounded border border-borderAccent text-textSecondary text-[10px] font-display font-bold tracking-wider uppercase disabled:opacity-40 hover:text-textPrimary transition-colors"
              >
                <FaUndo size={8} /> Clear Obstacles
              </button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="p-6 relative overflow-hidden bg-gradient-to-br from-bg/10 via-surface to-accent/5">
          {project.id === 'cyberrunner' ? (
            <div className="flex flex-col items-center gap-4">
              <div className="text-center mb-2">
                <h4 className="font-display text-sm font-bold text-textPrimary uppercase tracking-wider">
                  Interactive Pathfinding Simulation
                </h4>
                <p className="font-sans text-[10px] text-textSecondary mt-0.5">
                  Click/tap cells to place walls and watch the CyberRunner robot route around them.
                </p>
              </div>

              {/* Pathfinding Grid */}
              <div className="grid gap-1 border border-borderAccent p-1 bg-bg/20 rounded-lg max-w-full overflow-x-auto" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                {grid.map((row, r) =>
                  row.map((val, c) => {
                    const isStart = r === START.y && c === START.x;
                    const isGoal = r === GOAL.y && c === GOAL.x;
                    const isRobot = r === robotPos.y && c === robotPos.x;
                    const isInCalculatedPath = isCellInPath(r, c);
                    const isVisited = isCellVisited(r, c);

                    let cellClass = 'bg-surface/50 border-zinc-200 dark:border-zinc-800';
                    let cellContent = null;

                    if (val === 1) {
                      cellClass = 'bg-zinc-800 dark:bg-zinc-700 border-zinc-700'; // Obstacle Wall
                    } else if (isRobot) {
                      cellClass = 'bg-accent border-accent text-bg scale-95'; // Robot (CyberRunner)
                      cellContent = (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                          <path d="M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm4 7H8v8h8V9z" />
                        </svg>
                      );
                    } else if (isStart) {
                      cellClass = 'border-accent bg-accent/20 text-accent'; // Start position
                      cellContent = <span className="text-[8px] font-bold">START</span>;
                    } else if (isGoal) {
                      cellClass = 'border-red-500 bg-red-500/20 text-red-500'; // Goal position
                      cellContent = <span className="text-[8px] font-bold">GOAL</span>;
                    } else if (isInCalculatedPath) {
                      cellClass = isVisited
                        ? 'bg-accent/40 border-accent/60'
                        : 'bg-accent/15 border-accent/30'; // Visited path cells vs future path cells
                    }

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => toggleWall(r, c)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 border flex items-center justify-center rounded transition-all duration-200 cursor-pointer hover:border-accent ${cellClass}`}
                      >
                        {cellContent}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Status Message */}
              <div className="font-mono text-[10px] text-textSecondary tracking-wide mt-2">
                {path.length === 0 ? (
                  <span className="text-red-500 font-bold">⚠️ SLAM ERROR: Goal Unreachable (Path Blocked)</span>
                ) : isAnimating ? (
                  <span className="text-accent animate-pulse font-bold">▶ ROS2 STATE: Traversing path... ({robotPos.x}, {robotPos.y})</span>
                ) : (
                  <span>✓ NAVIGATION ENGINE: Ready | Path Length: {path.length} steps</span>
                )}
              </div>
            </div>
          ) : (
            // Standard Visual Cards for other projects
            <div className="flex-1 flex flex-col justify-center items-center p-6 min-h-[220px]">
              <div className="text-center z-10 flex flex-col items-center gap-2">
                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-textPrimary">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-textSecondary max-w-sm">
                  {project.role} // {project.date}
                </p>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-accent/5 blur-[80px]" />
              <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-borderAccent blur-[40px]" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Bottom Next Project Navigation */}
      <div className="mt-20 pt-10 border-t border-borderAccent flex flex-col items-end">
        <span className="text-[10px] font-display font-bold tracking-widest text-textSecondary/50 uppercase mb-1">
          Next Project
        </span>
        <button
          onClick={() => onSelectProject(nextIndex)}
          className="group flex flex-col items-end text-right focus:outline-none"
        >
          <span className="font-display text-2xl sm:text-4xl font-bold text-textPrimary group-hover:text-accent transition-colors duration-200">
            {nextProject.title} →
          </span>
          <span className="font-sans text-xs text-textSecondary mt-1">
            {nextProject.role}
          </span>
        </button>
      </div>
    </div>
  );
}
