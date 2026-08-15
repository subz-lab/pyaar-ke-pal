"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { playlists, type Playlist } from "@/app/lib/playlists";
import type { Track } from "@/app/lib/tracks";

export interface PlayerState {
  currentPlaylist: Playlist;
  currentPlaylistIndex: number;
  playlists: Playlist[];
  currentTrack: Track;
  currentIndex: number;
  isPlaying: boolean;
  elapsed: number;
  duration: number;
  isLoading: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (fraction: number) => void;
  selectTrack: (index: number) => void;
  switchPlaylist: (idOrIndex: string | number) => void;
  nextPlaylist: () => void;
  prevPlaylist: () => void;
}

export function usePlayer(): PlayerState {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingPlay = useRef(false);

  const currentPlaylist = playlists[playlistIndex] || playlists[0];
  const activeTracks = currentPlaylist.tracks;
  const currentTrack = activeTracks[currentIndex] || activeTracks[0];
  const [duration, setDuration] = useState(currentTrack?.duration || 240);

  // Initialize audio element
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setElapsed(Math.floor(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration));
      }
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      pendingPlay.current = true;
      setCurrentIndex((prev) => (prev + 1) % activeTracks.length);
    };

    const handleError = (e: Event) => {
      console.warn("Audio element error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [activeTracks.length]);

  // Update track src when currentIndex or active tracks change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    setElapsed(0);
    setDuration(currentTrack.duration || 240);

    if (currentTrack.audioUrl) {
      audio.src = currentTrack.audioUrl;
      audio.load();

      if (pendingPlay.current || isPlaying) {
        setIsLoading(true);
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.warn("Autoplay blocked or play error:", err);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, currentTrack]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsLoading(true);
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Play failed:", err);
        setIsPlaying(false);
        setIsLoading(false);
      });
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    pendingPlay.current = true;
    setCurrentIndex((i) => (i + 1) % activeTracks.length);
  }, [activeTracks.length]);

  const prev = useCallback(() => {
    pendingPlay.current = true;
    setCurrentIndex((i) => (i - 1 + activeTracks.length) % activeTracks.length);
  }, [activeTracks.length]);

  const seek = useCallback(
    (fraction: number) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const target = fraction * duration;
      audio.currentTime = target;
      setElapsed(Math.floor(target));
    },
    [duration]
  );

  const selectTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < activeTracks.length) {
        pendingPlay.current = true;
        setCurrentIndex(index);
      }
    },
    [activeTracks.length]
  );

  const switchPlaylist = useCallback(
    (idOrIndex: string | number) => {
      let targetIdx = 0;
      if (typeof idOrIndex === "number") {
        targetIdx = (idOrIndex + playlists.length) % playlists.length;
      } else {
        const found = playlists.findIndex((p) => p.id === idOrIndex);
        if (found !== -1) targetIdx = found;
      }

      if (targetIdx !== playlistIndex) {
        const wasPlaying = isPlaying;
        if (audioRef.current) {
          audioRef.current.pause();
        }
        pendingPlay.current = wasPlaying;
        setPlaylistIndex(targetIdx);
        setCurrentIndex(0);
      }
    },
    [playlistIndex, isPlaying]
  );

  const nextPlaylist = useCallback(() => {
    switchPlaylist(playlistIndex + 1);
  }, [playlistIndex, switchPlaylist]);

  const prevPlaylist = useCallback(() => {
    switchPlaylist(playlistIndex - 1);
  }, [playlistIndex, switchPlaylist]);

  return {
    currentPlaylist,
    currentPlaylistIndex: playlistIndex,
    playlists,
    currentTrack,
    currentIndex,
    isPlaying,
    elapsed,
    duration,
    isLoading,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
    selectTrack,
    switchPlaylist,
    nextPlaylist,
    prevPlaylist,
  };
}
