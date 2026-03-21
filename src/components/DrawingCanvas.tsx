import React, { useRef, useEffect, useState, useCallback } from "react";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomColor(seed: number): string {
  const r = Math.floor(seededRandom(seed) * 255);
  const g = Math.floor(seededRandom(seed + 1) * 255);
  const b = Math.floor(seededRandom(seed + 2) * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

interface DrawingCanvasProps {
  brushSize: number;
  onStrokeCountChange?: (count: number) => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ brushSize, onStrokeCountChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Stroke[]>(() => {
    try {
      const saved = localStorage.getItem("drawing-strokes");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const currentStrokeRef = useRef<Stroke | null>(null);
  const strokeIdRef = useRef(0);
  const lastEndPointRef = useRef<{ point: Point; color: string } | null>(null);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, stroke: Stroke | null) => {
    if (!stroke || stroke.points.length === 0) return;

    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw dot at start
    const first = stroke.points[0];
    ctx.beginPath();
    ctx.arc(first.x, first.y, stroke.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = stroke.color;
    ctx.fill();

    if (stroke.points.length < 2) return;

    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

    for (let i = 1; i < stroke.points.length; i++) {
      const prev = stroke.points[i - 1];
      const curr = stroke.points[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
    }

    const last = stroke.points[stroke.points.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "hsl(0, 0%, 12%)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const stroke of strokes) {
      drawStroke(ctx, stroke);
    }
    if (currentStrokeRef.current) {
      drawStroke(ctx, currentStrokeRef.current);
    }
  }, [strokes, drawStroke]);

  const redrawRef = useRef(redraw);
  redrawRef.current = redraw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement!;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = parent.clientWidth + "px";
      canvas.style.height = parent.clientHeight + "px";
      redrawRef.current();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    localStorage.setItem("drawing-strokes", JSON.stringify(strokes));
  }, [strokes]);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getPos(e);
    strokeIdRef.current += 1;
    const color = getRandomColor(strokeIdRef.current * 3);
    currentStrokeRef.current = { points: [pos], color, width: brushSize };
    setIsDrawing(true);
    redraw();
  }, [getPos, brushSize, redraw]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !currentStrokeRef.current) return;
    const pos = getPos(e);
    currentStrokeRef.current.points.push(pos);
    redraw();
  }, [isDrawing, getPos, redraw]);

  const stopDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (currentStrokeRef.current && currentStrokeRef.current.points.length > 0) {
      const pts = currentStrokeRef.current.points;
      lastEndPointRef.current = {
        point: pts[pts.length - 1],
        color: currentStrokeRef.current.color,
      };
      setStrokes(prev => {
        const next = [...prev, currentStrokeRef.current!];
        onStrokeCountChange?.(next.length);
        return next;
      });
    }
    currentStrokeRef.current = null;
    setIsDrawing(false);
  }, [onStrokeCountChange]);

  const generateShape = useCallback((cx: number, cy: number, seed: number): Point[] => {
    const size = 30 + seededRandom(seed * 7) * 60;
    const shapeType = Math.floor(seededRandom(seed * 13) * 5);
    const points: Point[] = [];
    const rotation = seededRandom(seed * 17) * Math.PI * 2;

    if (shapeType === 0) {
      // Star
      const spikes = 5 + Math.floor(seededRandom(seed * 19) * 4);
      for (let i = 0; i <= spikes * 2; i++) {
        const angle = rotation + (i * Math.PI) / spikes;
        const r = i % 2 === 0 ? size : size * 0.4;
        points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
      }
      points.push(points[0]);
    } else if (shapeType === 1) {
      // Circle
      const segments = 30;
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push({ x: cx + Math.cos(angle) * size, y: cy + Math.sin(angle) * size });
      }
    } else if (shapeType === 2) {
      // Triangle
      for (let i = 0; i <= 3; i++) {
        const angle = rotation + (i * 2 * Math.PI) / 3;
        points.push({ x: cx + Math.cos(angle) * size, y: cy + Math.sin(angle) * size });
      }
    } else if (shapeType === 3) {
      // Hexagon
      for (let i = 0; i <= 6; i++) {
        const angle = rotation + (i * Math.PI) / 3;
        points.push({ x: cx + Math.cos(angle) * size, y: cy + Math.sin(angle) * size });
      }
    } else {
      // Spiral
      const turns = 2 + seededRandom(seed * 23) * 2;
      const steps = 50;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const angle = rotation + t * turns * Math.PI * 2;
        const r = t * size;
        points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
      }
    }
    return points;
  }, []);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const pos: Point = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    strokeIdRef.current += 1;
    const seed = strokeIdRef.current * 3 + Date.now();
    const color = getRandomColor(seed);
    const points = generateShape(pos.x, pos.y, seed);
    const shapeStroke: Stroke = { points, color, width: brushSize };
    lastEndPointRef.current = { point: pos, color };
    setStrokes(prev => {
      const next = [...prev, shapeStroke];
      onStrokeCountChange?.(next.length);
      return next;
    });
  }, [brushSize, onStrokeCountChange, generateShape]);

  const clearCanvas = useCallback(() => {
    setStrokes([]);
    currentStrokeRef.current = null;
    strokeIdRef.current = 0;
    lastEndPointRef.current = null;
    onStrokeCountChange?.(0);
  }, [onStrokeCountChange]);

  const exportCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const undo = useCallback(() => {
    setStrokes(prev => {
      const next = prev.slice(0, -1);
      onStrokeCountChange?.(next.length);
      return next;
    });
  }, [onStrokeCountChange]);

  return (
    <div className="relative flex-1 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onDoubleClick={handleDoubleClick}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={exportCanvas}
          disabled={strokes.length === 0}
          className="rounded-lg bg-primary/80 px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary active:scale-95 disabled:opacity-30"
        >
          Save PNG
        </button>
        <button
          onClick={undo}
          disabled={strokes.length === 0}
          className="rounded-lg bg-card/80 px-3 py-1.5 text-xs font-medium text-card-foreground backdrop-blur-sm transition-all hover:bg-card active:scale-95 disabled:opacity-30"
        >
          Undo
        </button>
        <button
          onClick={clearCanvas}
          disabled={strokes.length === 0}
          className="rounded-lg bg-destructive/80 px-3 py-1.5 text-xs font-medium text-destructive-foreground backdrop-blur-sm transition-all hover:bg-destructive active:scale-95 disabled:opacity-30"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
