import { tracks, type Track } from "./tracks";
import playlist2Data from "../../scratch/playlist2_tracks.json";

export interface Playlist {
  id: string;
  name: string;
  hindiTitle?: string;
  subtitle: string;
  description: string;
  cover: string;
  bgWide: string;
  bgTall: string;
  gradientOverlay?: string;
  tracks: Track[];
}

export function getAssetPath(path: string): string {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (typeof window !== "undefined") {
    const pathPrefix = window.location.pathname.startsWith("/pyaar-ke-pal")
      ? "/pyaar-ke-pal"
      : "";
    if (pathPrefix && !cleanPath.startsWith(pathPrefix)) {
      return `${pathPrefix}${cleanPath}`;
    }
  }
  return cleanPath;
}

export const playlist2Tracks: Track[] = playlist2Data as Track[];

export const playlists: Playlist[] = [
  {
    id: "pyaar-ke-pal",
    name: "Pyaar Ke Pal",
    hindiTitle: "प्यार के पल",
    subtitle: "Nostalgic Melodies",
    description: "Timeless romantic classics from KK, Kishore Kumar, Rafi, Nusrat & legendary icons.",
    cover: "/bg/scene-tall.png",
    bgWide: "/bg/scene-wide.png",
    bgTall: "/bg/scene-tall.png",
    gradientOverlay: "from-black/35 via-transparent to-black/60",
    tracks: tracks,
  },
  {
    id: "playlist-2",
    name: "Deepshit",
    hindiTitle: "Deepshit",
    subtitle: "by Tee 🌙☕",
    description: "Curated 38 soulful hits by Nusrat Fateh Ali Khan, Arijit Singh, KK, Atif Aslam & Kailash Kher.",
    cover: "/playlist2-cover.jpeg",
    bgWide: "/playlist2-cover.jpeg",
    bgTall: "/playlist2-cover.jpeg",
    gradientOverlay: "from-black/60 via-black/30 to-black/80",
    tracks: playlist2Tracks,
  },
];

export function getPlaylist(id: string): Playlist {
  return playlists.find((p) => p.id === id) || playlists[0];
}
