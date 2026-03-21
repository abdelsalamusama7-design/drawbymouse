import React, { useState } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";
import Toolbar from "@/components/Toolbar";

const Index = () => {
  const [brushSize, setBrushSize] = useState(8);
  const [strokeCount, setStrokeCount] = useState(0);

  return (
    <div className="flex h-screen flex-col bg-background">
      <Toolbar
        brushSize={brushSize}
        onBrushSizeChange={setBrushSize}
        strokeCount={strokeCount}
      />
      <DrawingCanvas brushSize={brushSize} onStrokeCountChange={setStrokeCount} />
      <div className="flex items-center justify-center border-t border-border bg-card px-4 py-2">
        <p className="text-[11px] text-muted-foreground">
          Draw on the canvas — each stroke gets a random color • Inspired by Kivy's painting example
        </p>
      </div>
    </div>
  );
};

export default Index;
