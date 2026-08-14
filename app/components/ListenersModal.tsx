"use client";

import React, { useState, useEffect, useCallback } from "react";
import { tracks } from "@/app/lib/tracks";

/* ── Types ─────────────────────────────────────────────────── */
interface Listener {
  id: string;
  name: string;
  city: string;
  avatarHue: number;
  trackTitle: string;
  trackArtist: string;
  timeAgo: string;
  isLive: boolean;
  isCurrentUser?: boolean;
}

interface ListenHistory {
  trackTitle: string;
  trackArtist: string;
  timestamp: number;
}

/* ── Simulated other listeners (rotate dynamically) ──────── */
const PEOPLE = [
  { name: "Rohan Verma",    city: "Mumbai",     hue: 25  },
  { name: "Ananya Sharma",  city: "New Delhi",  hue: 340 },
  { name: "Aarav Patel",    city: "Bengaluru",  hue: 160 },
  { name: "Priya Nair",     city: "Kolkata",    hue: 280 },
  { name: "Siddharth Rao",  city: "Pune",       hue: 200 },
  { name: "Meera Joshi",    city: "Jaipur",     hue: 45  },
  { name: "Kabir Khan",     city: "Hyderabad",  hue: 0   },
  { name: "Ishaan Malhotra",city: "Chandigarh", hue: 120 },
  { name: "Zara Sheikh",    city: "Lucknow",    hue: 300 },
  { name: "Dev Kapoor",     city: "Ahmedabad",  hue: 60  },
  { name: "Nandini Das",    city: "Chennai",    hue: 220 },
  { name: "Arjun Reddy",    city: "Visakhapatnam", hue: 15 },
];

function timeAgoStr(ms: number): string {
  const sec = Math.floor((Date.now() - ms) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  return `${hr}h ago`;
}

/* ── Component ─────────────────────────────────────────────── */
interface ListenersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrackTitle: string;
  currentTrackArtist: string;
}

export function ListenersModal({
  isOpen,
  onClose,
  currentTrackTitle,
  currentTrackArtist,
}: ListenersModalProps) {
  const [userName, setUserName] = useState("");
  const [userCity, setUserCity] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [history, setHistory] = useState<ListenHistory[]>([]);
  const [simListeners, setSimListeners] = useState<Listener[]>([]);

  // Load user profile from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedName = localStorage.getItem("pyaar_listener_name");
    const savedCity = localStorage.getItem("pyaar_listener_city");
    if (savedName) {
      setUserName(savedName);
      setUserCity(savedCity || "India");
      setIsJoined(true);
    }
    // Load listening history
    const savedHistory = localStorage.getItem("pyaar_listen_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch { /* ignore */ }
    }
  }, []);

  // Record current track to history when modal opens or track changes
  useEffect(() => {
    if (!currentTrackTitle) return;
    setHistory((prev) => {
      // Don't add duplicate if the most recent entry is the same track
      if (prev.length > 0 && prev[0].trackTitle === currentTrackTitle) {
        return prev;
      }
      const newEntry: ListenHistory = {
        trackTitle: currentTrackTitle,
        trackArtist: currentTrackArtist,
        timestamp: Date.now(),
      };
      const updated = [newEntry, ...prev].slice(0, 50); // keep last 50
      if (typeof window !== "undefined") {
        localStorage.setItem("pyaar_listen_history", JSON.stringify(updated));
      }
      return updated;
    });
  }, [currentTrackTitle, currentTrackArtist]);

  // Generate dynamic simulated listeners
  const regenerateSimListeners = useCallback(() => {
    const count = 4 + Math.floor(Math.random() * 5); // 4–8 listeners
    const shuffled = [...PEOPLE].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    const listeners: Listener[] = selected.map((p, i) => {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      const isLive = i < count - 1; // last one is "recent"
      return {
        id: `sim-${i}`,
        name: p.name,
        city: p.city,
        avatarHue: p.hue,
        trackTitle: randomTrack.title,
        trackArtist: randomTrack.artist,
        timeAgo: isLive
          ? "Listening now"
          : `${Math.floor(Math.random() * 15) + 1}m ago`,
        isLive,
      };
    });

    setSimListeners(listeners);
  }, []);

  // Regenerate every time modal opens
  useEffect(() => {
    if (isOpen) {
      regenerateSimListeners();
    }
  }, [isOpen, regenerateSimListeners]);

  // Rotate simulated listeners every 20s while open
  useEffect(() => {
    if (!isOpen) return;
    const id = setInterval(regenerateSimListeners, 20000);
    return () => clearInterval(id);
  }, [isOpen, regenerateSimListeners]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    localStorage.setItem("pyaar_listener_name", userName);
    localStorage.setItem("pyaar_listener_city", userCity || "India");
    setIsJoined(true);
  };

  if (!isOpen) return null;

  // Build final listener list: current user (if joined) + simulated
  const allListeners: Listener[] = [];
  if (isJoined) {
    allListeners.push({
      id: "user-me",
      name: `${userName} (You)`,
      city: userCity || "India",
      avatarHue: 40,
      trackTitle: currentTrackTitle,
      trackArtist: currentTrackArtist,
      timeAgo: "Listening now",
      isLive: true,
      isCurrentUser: true,
    });
  }
  allListeners.push(...simListeners);

  const liveListeners = allListeners.filter((l) => l.isLive);
  const recentListeners = allListeners.filter((l) => !l.isLive);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in-up">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />

      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-gradient-to-b from-zinc-900/90 to-black/95 shadow-[0_24px_64px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl p-6 sm:p-7 z-10 max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white tracking-wide">Who&apos;s Listening</h3>
              <p className="text-xs text-white/60">{liveListeners.length} live · {recentListeners.length} recent</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Join Form */}
        <div className="py-3 border-b border-white/10 shrink-0">
          {!isJoined ? (
            <form onSubmit={handleJoin} className="flex flex-col gap-2.5 bg-white/5 p-3.5 rounded-2xl border border-white/10">
              <span className="text-xs font-medium text-amber-300">✨ Join the Live Listening Room</span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" placeholder="Your Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400" required />
                <input type="text" placeholder="City (e.g. Mumbai)" value={userCity} onChange={(e) => setUserCity(e.target.value)} className="w-full sm:w-36 bg-black/40 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-amber-400" />
                <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-4 py-1.5 rounded-xl transition-all shadow-md shrink-0">Join</button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
                <span className="text-xs text-amber-200">You are active as <strong className="text-white">{userName}</strong> from <span className="text-amber-300">{userCity}</span></span>
              </div>
              <button onClick={() => setIsJoined(false)} className="text-[11px] text-white/50 hover:text-white underline">Edit</button>
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          {/* Live Listeners */}
          {liveListeners.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-emerald-400 font-semibold mb-2 px-1">🟢 Live Now</h4>
              <div className="space-y-2">
                {liveListeners.map((l) => (
                  <ListenerRow key={l.id} listener={l} />
                ))}
              </div>
            </div>
          )}

          {/* Recent Listeners */}
          {recentListeners.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-2 px-1">⏳ Recently Active</h4>
              <div className="space-y-2">
                {recentListeners.map((l) => (
                  <ListenerRow key={l.id} listener={l} />
                ))}
              </div>
            </div>
          )}

          {/* Your Listening History */}
          {history.length > 0 && (
            <div>
              <h4 className="text-[11px] uppercase tracking-widest text-amber-400/70 font-semibold mb-2 px-1">🎧 Your Listening History</h4>
              <div className="space-y-1.5">
                {history.slice(0, 15).map((h, i) => (
                  <div key={`${h.trackTitle}-${i}`} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/80 truncate font-medium">{h.trackTitle}</p>
                      <p className="text-[10px] text-white/40 truncate">{h.trackArtist}</p>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 shrink-0 ml-2">{timeAgoStr(h.timestamp)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Listener Row sub-component ────────────────────────────── */
function ListenerRow({ listener }: { listener: Listener }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
      listener.isCurrentUser
        ? "bg-amber-500/15 border-amber-500/30"
        : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08]"
    }`}>
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0"
          style={{
            background: `linear-gradient(135deg, hsl(${listener.avatarHue}, 70%, 50%), hsl(${listener.avatarHue + 30}, 60%, 35%))`,
          }}
        >
          {listener.name.charAt(0)}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white truncate">{listener.name}</span>
            {listener.isCurrentUser && (
              <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded-full font-bold">YOU</span>
            )}
          </div>
          <span className="text-[11px] text-white/50 truncate">
            📍 {listener.city} · <span className="text-amber-200/70">{listener.trackTitle}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        {listener.isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />}
        <span className="text-[10.5px] font-mono text-white/40">{listener.timeAgo}</span>
      </div>
    </div>
  );
}
