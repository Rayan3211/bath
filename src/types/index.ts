export type MediaType = 'series' | 'show' | 'movie' | 'short';

export type CategoryKey = 'comedy' | 'talkshow' | 'drama' | 'documentary' | 'culture' | 'shorts';

export interface Episode {
  id: string;
  title: string;
  episodeNumber: number;
  seasonNumber: number;
  duration: string;
  synopsis: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  englishTitle?: string;
  type: MediaType;
  category: CategoryKey;
  categoryLabel: string;
  synopsis: string;
  detailedDescription: string;
  backdropUrl: string;
  posterUrl: string;
  rating: string; // e.g. "PG-13", "+16", "عام"
  releaseYear: number;
  durationOrEpisodes: string; // e.g. "8 حلقات" or "45 دقيقة"
  isFeatured?: boolean;
  isTrending?: boolean;
  isExclusive?: boolean;
  tags: string[];
  cast?: string[];
  creator?: string;
  episodes: Episode[];
  sampleVideoUrl: string;
  published: boolean;
  viewsCount: number;
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  fullName?: string;
  contact: string;
  contactType: 'email' | 'phone';
  preferredCategories: CategoryKey[];
  expectations?: string;
  consent: boolean;
  createdAt: string;
  sourcePlan?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: 'none' | 'free' | 'monthly' | 'annual';
  watchlist: string[];
  subscriptionDate?: string;
}

export type ViewState =
  | { type: 'home' }
  | { type: 'explore'; filterType?: MediaType | 'all'; category?: CategoryKey }
  | { type: 'series' }
  | { type: 'shows' }
  | { type: 'movies' }
  | { type: 'shorts' }
  | { type: 'details'; mediaId: string }
  | { type: 'player'; mediaId: string; episodeId?: string }
  | { type: 'watchlist' }
  | { type: 'subscriptions' }
  | { type: 'investors' }
  | { type: 'admin' };
