"use client";

import React, { useRef, useState } from "react";
import { soundFx } from "@/utils/soundFx";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  cursorMode?: "badge" | "lens";
  cursorLabel?: string;
}

export function TiltCard({
  children,
  className = "",
  cursorMode = "badge",
  cursorLabel = "VIEW",
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => (cursorMode === "lens" ? soundFx.playShutter() : soundFx.playClick())}
      data-cursor={cursorMode}
      data-cursor-label={cursorLabel}
      style={{ transform }}
      className={`rounded-2xl border border-white/12 bg-[#10141d]/85 p-6 backdrop-blur-md transition-transform duration-200 ease-out hover:border-cyan-300/35 ${className}`}
    >
      {children}
    </div>
  );
}