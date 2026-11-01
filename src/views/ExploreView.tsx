import React, { useState, useMemo } from 'react';
import { MediaItem, MediaType, CategoryKey } from '../types';
import { MediaCard } from '../components/MediaCard';
import { filterMedia } from '../utils/logic';
import { Search, Filter, SlidersHorizontal, X, Film, Check } from 'lucide-react';

interface ExploreViewProps {
  mediaItems: MediaItem[];
  watchlist: string[];
  initialTypeFilter?: MediaType | 'all';
  initialCategory?: CategoryKey | 'all';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onPlay: (item: MediaItem) => void;
  onSelect: (item: MediaItem) => void;
  onToggleWatchlist: (item: MediaItem) => void;
}

const CATEGORY_TABS: { key: CategoryKey | 'all'; label: string }[] = [
  { key: 'all', label: 'كافة التصنيفات' },
  { key: 'comedy', label: 'كوميديا اجتماعية' },
  { key: 'talkshow', label: 'برامج وحوارات' },
  { key: 'drama', label: 'دراما وتشويق' },
  { key: 'documentary', label: 'وثائقيات' },
  { key: 'culture', label: 'ثقافة ومجتمع' },
  { key: 'shorts', label: 'محتوى قصير' },
];

const TYPE_FILTERS: { key: MediaType | 'all'; label: string }[] = [
  { key: 'all', label: 'الكل' },
  { key: 'series', label: 'مسلسلات' },
  { key: 'show', label: 'برامج' },
  { key: 'short', label: 'مقاطع سريعة' },
];

export const ExploreView: React.FC<ExploreViewProps> = ({
  mediaItems,
  watchlist,
  initialTypeFilter = 'all',
  initialCategory = 'all',
  searchQuery,
  onSearchChange,
  onPlay,
  onSelect,
  onToggleWatchlist,
}) => {
  const [selectedType, setSelectedType] = useState<MediaType | 'all'>(initialTypeFilter);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>(initialCategory);
  const [sortBy, setSortBy] = useState<'latest' | 'views' | 'trending'>('latest');

  // Filter media based on current criteria
  const filteredItems = useMemo(() => {
    return filterMedia(mediaItems, searchQuery, selectedType, selectedCategory, sortBy);
  }, [mediaItems, searchQuery, selectedType, selectedCategory, sortBy]);

  const resetFilters = () => {
    onSearchChange('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSortBy('latest');
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedType !== 'all' ||
    selectedCategory !== 'all' ||
    sortBy !== 'latest';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" dir="rtl">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#234536]/40">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            مكتبة استكشاف أعمال بَث
          </h1>
          <p className="text-xs sm:text-sm text-[#A3BDBC] mt-1">
            تصفح المحتوى الأصلي والبرامج الحوارية والوثائقيات والاسكتشات القصيرة
          </p>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center gap-3">
          <span className="text-xs bg-[#234536]/40 text-[#7F903E] border border-[#234536] px-3 py-1 rounded-full font-bold">
            {filteredItems.length} عمل متاح
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar & Primary Type Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث بالعنوان، الكلمات الدلالية، الممثلين، أو صناع العمل..."
            className="w-full bg-[#0B2D33] border border-[#234536] rounded-2xl py-3 pr-11 pl-10 text-sm text-white placeholder-[#A3BDBC]/60 focus:outline-none focus:border-[#7F903E] transition-colors"
          />
          <Search className="w-5 h-5 text-[#A3BDBC] absolute right-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3.5 top-3.5 text-[#A3BDBC] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 bg-[#0B2D33] border border-[#234536] rounded-2xl px-4 py-2">
          <SlidersHorizontal className="w-4 h-4 text-[#7F903E] shrink-0" />
          <span className="text-xs text-[#A3BDBC] shrink-0">الترتيب:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-transparent text-xs sm:text-sm text-white focus:outline-none cursor-pointer text-right"
          >
            <option value="latest" className="bg-[#0B2D33]">الأحدث إنتاجاً</option>
            <option value="views" className="bg-[#0B2D33]">الأكثر مشاهدة</option>
            <option value="trending" className="bg-[#0B2D33]">الأكثر تفاعلاً (Trending)</option>
          </select>
        </div>
      </div>

      {/* Type Toggle Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#A3BDBC] ml-2">نوع العمل:</span>
        {TYPE_FILTERS.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setSelectedType(tf.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedType === tf.key
                ? 'bg-[#234536] text-white border border-[#7F903E]'
                : 'bg-[#0B2D33] text-[#A3BDBC] hover:bg-[#234536]/40 hover:text-white border border-transparent'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Category Horizontal Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {CATEGORY_TABS.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              selectedCategory === cat.key
                ? 'bg-[#7F903E] text-white border-[#7F903E] shadow-sm'
                : 'bg-[#052329] text-[#A3BDBC] border-[#234536]/80 hover:border-white/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
          {filteredItems.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              isInWatchlist={watchlist.includes(item.id)}
              onSelect={onSelect}
              onPlay={onPlay}
              onToggleWatchlist={onToggleWatchlist}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 px-4 bg-[#0B2D33]/40 border border-[#234536]/40 rounded-3xl space-y-4">
          <div className="w-16 h-16 bg-[#234536]/40 rounded-full flex items-center justify-center mx-auto text-[#A3BDBC]">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">
            لم نجد نتائج مطابقة لبحثك
          </h3>
          <p className="text-xs sm:text-sm text-[#A3BDBC] max-w-md mx-auto leading-relaxed">
            جرّب تغيير كلمات البحث أو إزالة بعض الفلاتر المحددة لاستعراض مزيد من الأعمال المتاحة في مكتبة بَث.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-full bg-[#7F903E] text-white text-xs font-bold hover:bg-[#8ea047] transition-colors"
          >
            إعادة تعيين كافة الفلاتر
          </button>
        </div>
      )}

    </div>
  );
};

export default ExploreView;
