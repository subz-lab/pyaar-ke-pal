"use client";

import { useListenerCount } from "@/app/hooks/useListenerCount";

interface ListenerCountProps {
  onClick?: () => void;
}

export function ListenerCount({ onClick }: ListenerCountProps) {
  const count = useListenerCount();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 hover:border-amber-400/40 backdrop-blur-md text-xs font-medium text-white/80 select-none shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <span className="relative flex h-2 w-2">
        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="tabular-nums font-semibold text-white">
        {count.toLocaleString()}
      </span>
      <span className="text-white/60 group-hover:text-amber-200 transition-colors">
        listening now
      </span>
      <svg
        className="w-3 h-3 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
