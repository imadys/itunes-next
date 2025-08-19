export type Podcast = {
  id: number;
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  artworkUrl600: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  feedUrl: string;
  genres: string[];
  searchKeyword: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Episode = {
  id: number;
  trackId: number;
  title: string;
  artistName: string;
  collectionName: string;
  trackViewUrl: string;
  image: string;
  audioUrl: string;
  duration: string;
  episodeNumber: number;
  episodeType: string;
  podcastId: number;
  pubDate: Date;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  shortDescription: string;
  podcast: Podcast;
}