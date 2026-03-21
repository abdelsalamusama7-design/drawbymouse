import React from "react";

interface ToolbarProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  strokeCount: number;
}

const Toolbar: React.FC<ToolbarProps> = ({ brushSize, onBrushSizeChange, strokeCount }) => {
  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Brush
          </span>
          <input
            type="range"
            min={2}
            max={40}
            value={brushSize}
            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
            className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-border accent-primary sm:w-32"
          />
          <span className="min-w-[2ch] text-xs tabular-nums text-muted-foreground">
            {brushSize}
          </span>
        </div>
        <div
          className="rounded-full border border-border"
          style={{
            width: Math.max(8, brushSize),
            height: Math.max(8, brushSize),
            backgroundColor: "hsl(var(--foreground))",
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs text-muted-foreground">
          {strokeCount} stroke{strokeCount !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-1">
          {[4, 8, 16, 30].map((size) => (
            <button
              key={size}
              onClick={() => onBrushSizeChange(size)}
              className={`flex h-8 w-8 items-center justify-center rounded-md text-xs transition-all active:scale-95 ${
                brushSize === size
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
