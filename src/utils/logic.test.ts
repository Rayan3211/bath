import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterMedia,
  validateWaitlistLead,
  toggleWatchlistId,
  calculateKPIs,
} from './logic';
import { MediaItem, WaitlistEntry } from '../types';

const sampleItems: MediaItem[] = [
  {
    id: 'item-1',
    title: 'يوميات الحارة',
    englishTitle: 'Al-Hara',
    type: 'series',
    category: 'comedy',
    categoryLabel: 'كوميديا',
    synopsis: 'مفارقات شباب في الرياض',
    detailedDescription: '',
    backdropUrl: '',
    posterUrl: '',
    rating: '+13',
    releaseYear: 2026,
    durationOrEpisodes: '8 حلقات',
    isTrending: true,
    tags: ['كوميديا', 'الرياض'],
    episodes: [],
    sampleVideoUrl: '',
    published: true,
    viewsCount: 15000,
    createdAt: '2026-02-01',
  },
  {
    id: 'item-2',
    title: 'خارج النص',
    englishTitle: 'Off Script',
    type: 'show',
    category: 'talkshow',
    categoryLabel: 'حوارات',
    synopsis: 'حوارات غير مسبوقة',
    detailedDescription: '',
    backdropUrl: '',
    posterUrl: '',
    rating: 'عام',
    releaseYear: 2026,
    durationOrEpisodes: '12 حلقة',
    isTrending: false,
    tags: ['حوار', 'بودكاست'],
    episodes: [],
    sampleVideoUrl: '',
    published: true,
    viewsCount: 25000,
    createdAt: '2026-01-10',
  },
  {
    id: 'item-3',
    title: 'مشروع مسودة غير منشور',
    type: 'movie',
    category: 'drama',
    categoryLabel: 'دراما',
    synopsis: 'قيد التطوير',
    detailedDescription: '',
    backdropUrl: '',
    posterUrl: '',
    rating: 'عام',
    releaseYear: 2026,
    durationOrEpisodes: 'فيلم',
    tags: [],
    episodes: [],
    sampleVideoUrl: '',
    published: false,
    viewsCount: 0,
    createdAt: '2026-02-10',
  },
];

test('filterMedia filters by query search correctly in Arabic', () => {
  const result = filterMedia(sampleItems, 'حارة');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'item-1');
});

test('filterMedia excludes unpublished items', () => {
  const result = filterMedia(sampleItems, 'مسودة');
  assert.equal(result.length, 0);
});

test('filterMedia sorts by views count descending', () => {
  const result = filterMedia(sampleItems, '', 'all', 'all', 'views');
  assert.equal(result[0].id, 'item-2'); // 25,000 views
  assert.equal(result[1].id, 'item-1'); // 15,000 views
});

test('validateWaitlistLead validates email and phone inputs', () => {
  // Invalid email
  const badEmail = validateWaitlistLead('invalid-email', true, []);
  assert.equal(badEmail.isValid, false);

  // Valid email
  const validEmail = validateWaitlistLead('test@domain.com', true, []);
  assert.equal(validEmail.isValid, true);
  assert.equal(validEmail.contactType, 'email');

  // Valid Saudi phone
  const validPhone = validateWaitlistLead('0501234567', true, []);
  assert.equal(validPhone.isValid, true);
  assert.equal(validPhone.contactType, 'phone');

  // Missing consent
  const noConsent = validateWaitlistLead('test@domain.com', false, []);
  assert.equal(noConsent.isValid, false);

  // Duplicate detection
  const existing: WaitlistEntry[] = [
    {
      id: '1',
      contact: 'test@domain.com',
      contactType: 'email',
      preferredCategories: [],
      consent: true,
      createdAt: '2026-01-01',
    },
  ];
  const duplicate = validateWaitlistLead('test@domain.com', true, existing);
  assert.equal(duplicate.isValid, false);
});

test('toggleWatchlistId adds and removes media IDs', () => {
  let list: string[] = [];
  list = toggleWatchlistId(list, 'bath-001');
  assert.deepEqual(list, ['bath-001']);

  list = toggleWatchlistId(list, 'bath-002');
  assert.deepEqual(list, ['bath-001', 'bath-002']);

  list = toggleWatchlistId(list, 'bath-001');
  assert.deepEqual(list, ['bath-002']);
});

test('calculateKPIs tallies totals and categories correctly', () => {
  const leads: WaitlistEntry[] = [
    {
      id: 'l1',
      contact: 'a@a.com',
      contactType: 'email',
      preferredCategories: ['comedy', 'talkshow'],
      consent: true,
      createdAt: '2026-01-01',
      sourcePlan: 'شهري (19.99 ر.س)',
    },
    {
      id: 'l2',
      contact: 'b@b.com',
      contactType: 'email',
      preferredCategories: ['comedy'],
      consent: true,
      createdAt: '2026-01-01',
      sourcePlan: 'سنوي (199 ر.س)',
    },
  ];

  const kpis = calculateKPIs(sampleItems, leads);
  assert.equal(kpis.totalItems, 3);
  assert.equal(kpis.publishedCount, 2);
  assert.equal(kpis.totalViews, 40000);
  assert.equal(kpis.totalLeads, 2);
  assert.equal(kpis.categoryTally.comedy, 2);
  assert.equal(kpis.categoryTally.talkshow, 1);
  assert.equal(kpis.planTally.monthly, 1);
  assert.equal(kpis.planTally.annual, 1);
});
