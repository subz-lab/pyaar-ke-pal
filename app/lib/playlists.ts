import { tracks, type Track } from "./tracks";
import playlist2Data from "../../scratch/playlist2_tracks.json";

export interface Playlist {
  id: string;
  name: string;
  hindiTitle?: string;
  subtitle: string;
  description: string;
  cover: string;
  tracks: Track[];
}

export const playlist2Tracks: Track[] = playlist2Data as Track[];

export const playlists: Playlist[] = [
  {
    id: "pyaar-ke-pal",
    name: "Pyaar Ke Pal",
    hindiTitle: "प्यार के पल",
    subtitle: "Nostalgic Melodies",
    description: "Timeless romantic classics from KK, Kishore Kumar, Rafi, Nusrat & legendary icons.",
    cover: "https://c.saavncdn.com/179/Om-Shanti-Om-Hindi-2007-20241205141724-500x500.jpg",
    tracks: tracks,
  },
  {
    id: "playlist-2",
    name: "Dil Se Dil Tak",
    hindiTitle: "दिल से दिल तक",
    subtitle: "Soulful Favorites",
    description: "Handpicked gems by Nusrat Fateh Ali Khan, Arijit Singh, KK, Atif Aslam & Kailash Kher.",
    cover: "/playlist2-cover.jpeg",
    tracks: playlist2Tracks,
  },
];

export function getPlaylist(id: string): Playlist {
  return playlists.find((p) => p.id === id) || playlists[0];
}
