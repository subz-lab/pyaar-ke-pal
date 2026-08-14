"use client";

import { useClock } from "@/app/hooks/useClock";

export function Clock() {
  const time = useClock();

  return (
    <div className="flex items-center gap-2 text-xs tracking-wider text-white/70 font-mono select-none drop-shadow">
      <svg
        className="w-3.5 h-3.5 text-white/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="tabular-nums">{time || "12:00:00 AM"}</span>
    </div>
  );
}
