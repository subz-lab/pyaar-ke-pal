"use client";

import React, { useRef } from "react";
import type { PlayerState } from "@/app/hooks/usePlayer";
import { getAssetPath } from "@/app/lib/playlists";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Custom Rotating Vinyl Record Icon for Changing Playlists
export function RotatingVinylIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0">
      <svg
        className={`${className} animate-spin text-amber-400`}
        style={{ animationDuration: "5s" }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        {/* Outer Vinyl Disc */}
        <circle cx="12" cy="12" r="9.5" fill="rgba(245, 166, 35, 0.15)" stroke="currentColor" strokeWidth="1.5" />
        {/* Groove Lines */}
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="3 1.5" opacity="0.7" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {/* Center Label & Hole */}
        <circle cx="12" cy="12" r="2.8" fill="#F5A623" stroke="none" />
        <circle cx="12" cy="12" r="0.9" fill="#000000" stroke="none" />
      </svg>
    </span>
  );
}

interface PlayerProps {
  player: PlayerState;
  onOpenTrackList: () => void;
  onOpenPlaylistSelector: () => void;
}

export function Player({
  player,
  onOpenTrackList,
  onOpenPlaylistSelector,
}: PlayerProps) {
  const {
    currentPlaylist,
    currentTrack,
    isPlaying,
    elapsed,
    duration,
    toggle,
    next,
    prev,
    seek,
  } = player;

  const desktopSeekRef = useRef<HTMLDivElement>(null);
  const mobileSeekRef = useRef<HTMLDivElement>(null);

  const handleSeekClick = (
    e: React.MouseEvent<HTMLDivElement>,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const fraction = Math.max(0, Math.min(1, clickX / rect.width));
    seek(fraction);
  };

  const progressPercent = duration > 0 ? (elapsed / duration) * 100 : 0;

  return (
    <div className="w-full max-w-xl animate-fade-in-up">
      {/* ─── DESKTOP PLAYER (hidden sm:flex) ─── */}
      <div className="hidden sm:flex items-center gap-4 rounded-full p-3 pr-6 glass-card select-none">
        {/* Spinning vinyl */}
        <div className="relative w-[80px] h-[80px] shrink-0 rounded-full overflow-hidden shadow-2xl ring-1 ring-white/20">
          <img
            src={getAssetPath(currentTrack.cover)}
            alt={currentTrack.title}
            className={`w-full h-full object-cover vinyl-spin ${!isPlaying ? "vinyl-paused" : ""}`}
          />
          <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-black/70 ring-2 ring-white/40 z-10 pointer-events-none" />
        </div>

        {/* Info & Seek */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
          <div className="flex items-center justify-between min-w-0">
            <div className="flex flex-col min-w-0 pr-2">
              <h2 className="text-[15px] font-semibold text-white truncate leading-tight tracking-wide">
                {currentTrack.title}
              </h2>
              <p className="text-[12.5px] text-white/75 truncate font-normal leading-snug">
                {currentTrack.artist}
              </p>
            </div>

            {/* Rotating Vinyl Playlist Button */}
            <button
              onClick={onOpenPlaylistSelector}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-[11.5px] font-semibold text-amber-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/10"
              title="Change Playlist"
            >
              <RotatingVinylIcon className="w-4 h-4" />
              <span className="truncate max-w-[100px]">{currentPlaylist.name}</span>
              <svg className="w-3 h-3 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[10.5px] font-mono tabular-nums text-white/60 min-w-[28px] text-right">
              {formatTime(elapsed)}
            </span>
            <div
              ref={desktopSeekRef}
              onClick={(e) => handleSeekClick(e, desktopSeekRef)}
              className="seek-container flex-1"
            >
              <div className="seek-rail">
                <div className="seek-fill" style={{ width: `${progressPercent}%` }}>
                  <div className="seek-knob" />
                </div>
              </div>
            </div>
            <span className="text-[10.5px] font-mono tabular-nums text-white/60 min-w-[28px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Transport Controls */}
        <div className="flex items-center gap-2 shrink-0 pl-1">
          {/* Rotating Vinyl Change Playlist Transport Icon */}
          <button
            onClick={onOpenPlaylistSelector}
            aria-label="Change Playlist"
            className="transport-btn p-1 text-amber-400/90 hover:text-amber-300"
            title="Change Playlist"
          >
            <RotatingVinylIcon className="w-5 h-5" />
          </button>

          {/* Song List Button */}
          <button
            onClick={onOpenTrackList}
            aria-label="Song List"
            className="transport-btn p-1"
            title="Song List"
          >
            <svg className="w-[19px] h-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h10m-10 4h6" />
            </svg>
          </button>

          <button onClick={prev} aria-label="Previous Track" className="transport-btn p-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all transform active:scale-95 shadow-md"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button onClick={next} aria-label="Next Track" className="transport-btn p-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── MOBILE PLAYER (sm:hidden) ─── */}
      <div className="sm:hidden flex flex-col gap-3.5 rounded-2xl p-4 glass-card select-none">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden shadow-xl ring-1 ring-white/20">
            <img
              src={getAssetPath(currentTrack.cover)}
              alt={currentTrack.title}
              className={`w-full h-full object-cover vinyl-spin ${!isPlaying ? "vinyl-paused" : ""}`}
            />
            <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-black/70 ring-2 ring-white/40 z-10 pointer-events-none" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-[14px] font-semibold text-white truncate leading-tight">
              {currentTrack.title}
            </h2>
            <p className="text-[12px] text-white/75 truncate mt-0.5">
              {currentTrack.artist}
            </p>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onOpenPlaylistSelector}
              aria-label="Change Playlist"
              className="px-2.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[11.5px] font-semibold text-amber-300 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <RotatingVinylIcon className="w-4 h-4" />
              <span>Playlist</span>
            </button>
            <button
              onClick={onOpenTrackList}
              aria-label="Song List"
              className="transport-btn p-1.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h10m-10 4h6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div
            ref={mobileSeekRef}
            onClick={(e) => handleSeekClick(e, mobileSeekRef)}
            className="seek-container w-full"
          >
            <div className="seek-rail">
              <div className="seek-fill" style={{ width: `${progressPercent}%` }}>
                <div className="seek-knob" />
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[10.5px] font-mono tabular-nums text-white/60 px-0.5">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 pt-0.5">
          <button onClick={prev} aria-label="Previous Track" className="transport-btn p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button onClick={next} aria-label="Next Track" className="transport-btn p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
