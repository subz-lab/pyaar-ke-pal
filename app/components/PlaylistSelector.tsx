"use client";

import React, { useState, useRef, useEffect } from "react";
import { type Playlist } from "@/app/lib/playlists";
import { RotatingVinylIcon } from "@/app/components/Player";

interface PlaylistSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  playlists: Playlist[];
  currentPlaylistId: string;
  onSelectPlaylist: (id: string) => void;
}

export function PlaylistSelector({
  isOpen,
  onClose,
  playlists,
  currentPlaylistId,
  onSelectPlaylist,
}: PlaylistSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const initialIdx = playlists.findIndex((p) => p.id === currentPlaylistId);
    if (initialIdx !== -1) {
      setActiveIndex(initialIdx);
    }
  }, [currentPlaylistId, playlists, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % playlists.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + playlists.length) % playlists.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 40;
    const isRightSwipe = distance < -40;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentCard = playlists[activeIndex] || playlists[0];
  const isCurrentlyPlaying = currentCard.id === currentPlaylistId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-up">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/95 via-black/95 to-black/98 shadow-[0_16px_64px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl z-10 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10">
              <RotatingVinylIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Select Playlist</h3>
              <p className="text-[11px] text-white/50">Swipe left or right to change playlist</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Carousel Area */}
        <div className="p-6 flex flex-col items-center select-none">
          {/* Main Card View */}
          <div className="relative w-full max-w-xs aspect-square rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 group">
            <img
              src={currentCard.cover}
              alt={currentCard.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Status Badge */}
            {isCurrentlyPlaying && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/90 text-black font-semibold text-xs shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                Playing Now
              </div>
            )}

            {/* Bottom Card Meta */}
            <div className="absolute bottom-4 left-4 right-4 text-left">
              {currentCard.hindiTitle && (
                <p className="text-lg font-serif text-amber-300 drop-shadow">
                  {currentCard.hindiTitle}
                </p>
              )}
              <h4 className="text-xl font-bold text-white leading-tight">
                {currentCard.name}
              </h4>
              <p className="text-xs text-white/70 mt-0.5">
                {currentCard.subtitle} • {currentCard.tracks.length} songs
              </p>
            </div>

            {/* Navigation Arrows on Card */}
            {playlists.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous Playlist"
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next Playlist"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-xs text-white/60 text-center max-w-xs leading-relaxed">
            {currentCard.description}
          </p>

          {/* Pagination Indicators */}
          <div className="flex items-center gap-2 mt-4">
            {playlists.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to playlist ${p.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-6 bg-amber-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Select Button */}
          <button
            onClick={() => {
              onSelectPlaylist(currentCard.id);
              onClose();
            }}
            disabled={isCurrentlyPlaying}
            className={`mt-6 w-full max-w-xs py-3 rounded-full font-semibold text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
              isCurrentlyPlaying
                ? "bg-white/10 text-white/50 cursor-default border border-white/10"
                : "bg-amber-400 hover:bg-amber-300 text-black font-bold shadow-amber-500/20"
            }`}
          >
            {isCurrentlyPlaying ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Currently Active
              </>
            ) : (
              <>
                <RotatingVinylIcon className="w-4 h-4 text-black" />
                Play This Playlist
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
