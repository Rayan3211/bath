import { MediaItem, WaitlistEntry, UserProfile } from '../types';
import { INITIAL_MEDIA_ITEMS, INITIAL_WAITLIST_LEADS } from '../data/mockData';

const MEDIA_KEY = 'bath_media_items';
const WATCHLIST_KEY = 'bath_watchlist';
const WAITLIST_KEY = 'bath_waitlist_leads';
const USER_KEY = 'bath_user_session';
const ADMIN_KEY = 'bath_admin_authenticated';

// Default guest profile
const DEFAULT_USER: UserProfile = {
  id: 'guest-001',
  name: 'زائر تجريبي',
  email: 'guest@bath.sa',
  plan: 'free',
  watchlist: ['bath-001', 'bath-002'],
};

export const StorageService = {
  getMediaItems(): MediaItem[] {
    try {
      const data = localStorage.getItem(MEDIA_KEY);
      if (!data) {
        localStorage.setItem(MEDIA_KEY, JSON.stringify(INITIAL_MEDIA_ITEMS));
        return INITIAL_MEDIA_ITEMS;
      }
      const parsed: MediaItem[] = JSON.parse(data);
      // Ensure any newly updated initial URLs are patched
      return parsed.map((item) => {
        const initial = INITIAL_MEDIA_ITEMS.find((init) => init.id === item.id);
        if (initial && item.posterUrl.includes('photo-1536240478700')) {
          return { ...item, posterUrl: initial.posterUrl };
        }
        return item;
      });
    } catch {
      return INITIAL_MEDIA_ITEMS;
    }
  },

  saveMediaItems(items: MediaItem[]): void {
    try {
      localStorage.setItem(MEDIA_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save media items to localStorage', e);
    }
  },

  getWatchlist(): string[] {
    try {
      const data = localStorage.getItem(WATCHLIST_KEY);
      if (!data) {
        const initialList = ['bath-001', 'bath-002'];
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(initialList));
        return initialList;
      }
      return JSON.parse(data);
    } catch {
      return ['bath-001', 'bath-002'];
    }
  },

  saveWatchlist(watchlist: string[]): void {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist', e);
    }
  },

  getWaitlistLeads(): WaitlistEntry[] {
    try {
      const data = localStorage.getItem(WAITLIST_KEY);
      if (!data) {
        localStorage.setItem(WAITLIST_KEY, JSON.stringify(INITIAL_WAITLIST_LEADS));
        return INITIAL_WAITLIST_LEADS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_WAITLIST_LEADS;
    }
  },

  addWaitlistLead(lead: WaitlistEntry): void {
    try {
      const leads = this.getWaitlistLeads();
      const updated = [lead, ...leads];
      localStorage.setItem(WAITLIST_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add waitlist lead', e);
    }
  },

  getUser(): UserProfile {
    try {
      const data = localStorage.getItem(USER_KEY);
      if (!data) {
        localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
        return DEFAULT_USER;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_USER;
    }
  },

  saveUser(user: UserProfile): void {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user session', e);
    }
  },

  isAdminAuthenticated(): boolean {
    try {
      return localStorage.getItem(ADMIN_KEY) === 'true';
    } catch {
      return false;
    }
  },

  setAdminAuthenticated(auth: boolean): void {
    try {
      localStorage.setItem(ADMIN_KEY, auth ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to set admin auth', e);
    }
  },

  resetAllData(): void {
    try {
      localStorage.setItem(MEDIA_KEY, JSON.stringify(INITIAL_MEDIA_ITEMS));
      localStorage.setItem(WAITLIST_KEY, JSON.stringify(INITIAL_WAITLIST_LEADS));
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(['bath-001', 'bath-002']));
      localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
    } catch (e) {
      console.error('Failed to reset data', e);
    }
  },
};
