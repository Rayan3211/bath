import { MediaItem, WaitlistEntry, CategoryKey, MediaType } from '../types';

/**
 * Filter and sort media items by search query, type, category, and sorting criterion
 */
export function filterMedia(
  items: MediaItem[],
  query: string = '',
  typeFilter: MediaType | 'all' = 'all',
  categoryFilter: CategoryKey | 'all' = 'all',
  sortBy: 'latest' | 'views' | 'trending' = 'latest'
): MediaItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items
    .filter((item) => {
      // Must be published
      if (!item.published) return false;

      // Type filter
      if (typeFilter !== 'all' && item.type !== typeFilter) {
        return false;
      }

      // Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }

      // Query search in Arabic & English title, synopsis, tags, creator
      if (normalizedQuery) {
        const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
        const enTitleMatch = item.englishTitle?.toLowerCase().includes(normalizedQuery);
        const synopsisMatch = item.synopsis.toLowerCase().includes(normalizedQuery);
        const tagsMatch = item.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
        const creatorMatch = item.creator?.toLowerCase().includes(normalizedQuery);

        if (!titleMatch && !enTitleMatch && !synopsisMatch && !tagsMatch && !creatorMatch) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'views') {
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      if (sortBy === 'trending') {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      }
      // default: latest
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

/**
 * Validates a waitlist lead entry before submission
 */
export function validateWaitlistLead(
  contact: string,
  consent: boolean,
  existingLeads: WaitlistEntry[] = []
): { isValid: boolean; error?: string; contactType?: 'email' | 'phone'; normalizedContact?: string } {
  if (!contact || !contact.trim()) {
    return { isValid: false, error: 'يرجى إدخال البريد الإلكتروني أو رقم الجوال' };
  }

  const cleanContact = contact.trim();

  // Email format check
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanContact);
  // Phone format check (Saudi digits, e.g. 05XXXXXXXX, 9665XXXXXXXX, +9665XXXXXXXX, or 9 digits)
  const isPhone = /^(\+?966|0)?5[0-9]{8}$/.test(cleanContact.replace(/[\s-]/g, ''));

  if (!isEmail && !isPhone) {
    return {
      isValid: false,
      error: 'يرجى إدخال بريد إلكتروني صحيح أو رقم جوال سعودي (مثال: 05xxxxxxxx)',
    };
  }

  if (!consent) {
    return {
      isValid: false,
      error: 'يجب الموافقة على سياسة الخصوصية والتواصل بشأن المنصة للمتابعة',
    };
  }

  const normalized = isEmail
    ? cleanContact.toLowerCase()
    : cleanContact.replace(/[\s-]/g, '');

  // Duplicate check
  const duplicate = existingLeads.some(
    (lead) =>
      lead.contact.toLowerCase() === normalized ||
      lead.contact.replace(/[\s-]/g, '') === normalized
  );

  if (duplicate) {
    return {
      isValid: false,
      error: 'هذا البريد الإلكتروني أو الرقم مسجل مسبقاً في قائمة الاهتمام. شكراً لشغفك!',
    };
  }

  return {
    isValid: true,
    contactType: isEmail ? 'email' : 'phone',
    normalizedContact: normalized,
  };
}

/**
 * Toggles an item ID in watchlist
 */
export function toggleWatchlistId(currentWatchlist: string[], mediaId: string): string[] {
  if (currentWatchlist.includes(mediaId)) {
    return currentWatchlist.filter((id) => id !== mediaId);
  }
  return [...currentWatchlist, mediaId];
}

/**
 * Aggregates KPI indicators for the founder dashboard and investor evaluation
 */
export function calculateKPIs(items: MediaItem[], leads: WaitlistEntry[]) {
  const totalItems = items.length;
  const publishedCount = items.filter((i) => i.published).length;
  const totalViews = items.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const totalLeads = leads.length;

  // Category distribution from user preferences
  const categoryTally: Record<string, number> = {
    comedy: 0,
    talkshow: 0,
    drama: 0,
    documentary: 0,
    culture: 0,
    shorts: 0,
  };

  leads.forEach((lead) => {
    lead.preferredCategories.forEach((cat) => {
      if (categoryTally[cat] !== undefined) {
        categoryTally[cat]++;
      }
    });
  });

  // Source plan distribution
  const planTally: Record<string, number> = {
    free: 0,
    monthly: 0,
    annual: 0,
    general: 0,
  };

  leads.forEach((l) => {
    const plan = l.sourcePlan?.toLowerCase() || '';
    if (plan.includes('شهري')) planTally.monthly++;
    else if (plan.includes('سنوي')) planTally.annual++;
    else if (plan.includes('مجان')) planTally.free++;
    else planTally.general++;
  });

  // Hypothetical conversion rate benchmark
  // (In MVP testing, benchmarked against 1000 simulated unique test visitors)
  const simulatedVisitors = Math.max(1000, totalLeads * 14);
  const conversionRate = totalLeads > 0 ? ((totalLeads / simulatedVisitors) * 100).toFixed(1) : '0';

  return {
    totalItems,
    publishedCount,
    totalViews,
    totalLeads,
    categoryTally,
    planTally,
    conversionRate: `${conversionRate}%`,
    simulatedVisitors,
  };
}
