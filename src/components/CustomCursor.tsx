"use client";

import { useEffect, useState } from "react";

type CursorMode = "default" | "badge" | "lens";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -120, y: -120 });
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const zone = target?.closest("[data-cursor]") as HTMLElement | null;

      if (zone) {
        const nextMode = (zone.getAttribute("data-cursor") as CursorMode) || "badge";
        setMode(nextMode);
        setLabel(zone.getAttribute("data-cursor-label") || "");
      } else {
        setMode("default");
        setLabel("");
      }
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      {/* Ambient Spotlight */}
      <div
        className="absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-3xl"
        style={{ left: pos.x, top: pos.y }}
      />

      {/* Dynamic Reticle */}
      <div
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pressed ? 0.86 : 1})`,
        }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
      >
        {mode === "lens" && (
          <div className="relative flex h-24 w-24 items-center justify-center border border-white/75 bg-white/[0.03] backdrop-blur-[1px]">
            <span className="absolute -left-px -top-px h-3.5 w-3.5 border-l-2 border-t-2 border-white" />
            <span className="absolute -right-px -top-px h-3.5 w-3.5 border-r-2 border-t-2 border-white" />
            <span className="absolute -bottom-px -left-px h-3.5 w-3.5 border-b-2 border-l-2 border-white" />
            <span className="absolute -bottom-px -right-px h-3.5 w-3.5 border-b-2 border-r-2 border-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-red-500" />
            {label && (
              <span className="absolute -bottom-6 whitespace-nowrap bg-white px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-black">
                {label}
              </span>
            )}
          </div>
        )}

        {mode === "badge" && (
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-wider text-black shadow-xl">
            <span>{label || "OPEN"}</span>
            <span>↗</span>
          </div>
        )}

        {mode === "default" && (
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 rounded-full border border-white/35" />
            <div className="absolute h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        )}
      </div>
    </div>
  );
}