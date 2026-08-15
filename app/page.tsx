"use client";

import React, { useState } from "react";
import { Clock } from "@/app/components/Clock";
import { ListenerCount } from "@/app/components/ListenerCount";
import { SocialLinks } from "@/app/components/SocialLinks";
import { Player } from "@/app/components/Player";
import { TrackList } from "@/app/components/TrackList";
import { ListenersModal } from "@/app/components/ListenersModal";
import { PlaylistSelector } from "@/app/components/PlaylistSelector";
import { usePlayer } from "@/app/hooks/usePlayer";

export default function Home() {
  const player = usePlayer();
  const [isListenersOpen, setIsListenersOpen] = useState(false);
  const [isTrackListOpen, setIsTrackListOpen] = useState(false);
  const [isPlaylistSelectorOpen, setIsPlaylistSelectorOpen] = useState(false);

  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* 1. Fixed background div (-z-20) */}
      <div className="fixed inset-0 -z-20 hero-bg bg-cover bg-center transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* 2. Fixed grain overlay (-z-10) */}
      <div className="fixed inset-0 -z-10 grain mix-blend-overlay opacity-30 pointer-events-none" />

      {/* 3. Top Row Header */}
      <header className="w-full z-10 flex items-center justify-between px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex-1 flex justify-start">
          <Clock />
        </div>
        <div className="flex-1 flex justify-center">
          <ListenerCount onClick={() => setIsListenersOpen(true)} />
        </div>
        <div className="flex-1 flex justify-end">
          <SocialLinks />
        </div>
      </header>

      {/* Middle visual element */}
      <div className="z-0 my-auto text-center px-4 pointer-events-none select-none transition-all duration-500">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-wider text-white/90 drop-shadow-[0_0_25px_rgba(245,166,35,0.4)]">
          {player.currentPlaylist.hindiTitle || player.currentPlaylist.name}
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-white/60 tracking-widest uppercase font-mono">
          {player.currentPlaylist.subtitle}
        </p>
      </div>

      {/* 4. Bottom-anchored Player */}
      <footer className="w-full z-10 flex justify-center px-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Player
          player={player}
          onOpenTrackList={() => setIsTrackListOpen(true)}
          onOpenPlaylistSelector={() => setIsPlaylistSelectorOpen(true)}
        />
      </footer>

      {/* Track List Modal */}
      <TrackList
        isOpen={isTrackListOpen}
        onClose={() => setIsTrackListOpen(false)}
        currentIndex={player.currentIndex}
        isPlaying={player.isPlaying}
        onSelectTrack={(i) => {
          player.selectTrack(i);
          setIsTrackListOpen(false);
        }}
        currentPlaylist={player.currentPlaylist}
        playlists={player.playlists}
        onSelectPlaylist={(id) => {
          player.switchPlaylist(id);
        }}
      />

      {/* Playlist Swiper & Selector Modal */}
      <PlaylistSelector
        isOpen={isPlaylistSelectorOpen}
        onClose={() => setIsPlaylistSelectorOpen(false)}
        playlists={player.playlists}
        currentPlaylistId={player.currentPlaylist.id}
        onSelectPlaylist={(id) => {
          player.switchPlaylist(id);
        }}
      />

      {/* Who's Listening Modal */}
      <ListenersModal
        isOpen={isListenersOpen}
        onClose={() => setIsListenersOpen(false)}
        currentTrackTitle={player.currentTrack.title}
        currentTrackArtist={player.currentTrack.artist}
      />
    </main>
  );
}
