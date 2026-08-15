"use client";

import React from "react";
import { type Playlist } from "@/app/lib/playlists";
import { type Track } from "@/app/lib/tracks";

interface TrackListProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  currentPlaylist?: Playlist;
  playlists?: Playlist[];
  onSelectPlaylist?: (id: string) => void;
}

export function TrackList({
  isOpen,
  onClose,
  currentIndex,
  isPlaying,
  onSelectTrack,
  currentPlaylist,
  playlists = [],
  onSelectPlaylist,
}: TrackListProps) {
  if (!isOpen) return null;

  const activeTracks: Track[] = currentPlaylist ? currentPlaylist.tracks : [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in-up">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Track List Panel */}
      <div className="relative w-full max-w-lg max-h-[80vh] rounded-t-3xl sm:rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/95 to-black/98 shadow-[0_-8px_64px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl z-10 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex flex-col border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <svg
                  className="w-4.5 h-4.5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {currentPlaylist ? currentPlaylist.name : "All Songs"}
                </h3>
                <p className="text-[11px] text-white/50">
                  {activeTracks.length} nostalgic melodies
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Playlist selector tabs if multiple playlists exist */}
          {playlists.length > 1 && onSelectPlaylist && (
            <div className="flex items-center gap-2 px-6 pb-3 overflow-x-auto scrollbar-none">
              {playlists.map((pl) => {
                const isTabActive = currentPlaylist?.id === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => onSelectPlaylist(pl.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      isTabActive
                        ? "bg-amber-400 text-black font-semibold shadow-md"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {pl.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Scrollable Track List */}
        <div className="flex-1 overflow-y-auto py-2">
          {activeTracks.map((track, index) => {
            const isActive = index === currentIndex;

            return (
              <button
                key={`${track.id}-${index}`}
                onClick={() => {
                  onSelectTrack(index);
                  onClose();
                }}
                className={`w-full flex items-center gap-3.5 px-5 py-3 text-left transition-all hover:bg-white/[0.06] ${
                  isActive
                    ? "bg-amber-500/10 border-l-2 border-amber-400"
                    : "border-l-2 border-transparent"
                }`}
              >
                {/* Track number / Playing indicator */}
                <div className="w-7 text-center shrink-0">
                  {isActive && isPlaying ? (
                    <div className="flex items-end justify-center gap-[2px] h-4">
                      <span className="w-[3px] bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "60%", animationDelay: "0s" }} />
                      <span className="w-[3px] bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "100%", animationDelay: "0.15s" }} />
                      <span className="w-[3px] bg-amber-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" style={{ height: "40%", animationDelay: "0.3s" }} />
                    </div>
                  ) : (
                    <span
                      className={`text-xs font-mono tabular-nums ${
                        isActive ? "text-amber-400 font-bold" : "text-white/35"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Cover art (small) */}
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 ring-1 ring-white/10 shadow-md">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title and Artist */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[13px] font-semibold truncate leading-tight ${
                      isActive ? "text-amber-300" : "text-white/90"
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="text-[11px] text-white/50 truncate mt-0.5">
                    {track.artist}
                  </p>
                </div>

                {/* Duration */}
                <span className="text-[11px] font-mono tabular-nums text-white/30 shrink-0">
                  {Math.floor(track.duration / 60)}:
                  {String(track.duration % 60).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
