import React, { useRef } from 'react';
import { MediaItem } from '../types';
import { MediaCard } from './MediaCard';
import { ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';

interface ContentRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  watchlist: string[];
  onSelect: (item: MediaItem) => void;
  onPlay: (item: MediaItem) => void;
  onToggleWatchlist: (item: MediaItem) => void;
  onViewMore?: () => void;
  featuredAspect?: boolean;
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  subtitle,
  items,
  watchlist,
  onSelect,
  onPlay,
  onToggleWatchlist,
  onViewMore,
  featuredAspect = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-4 my-2">
      <div className="flex items-end justify-between mb-3 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#7F903E] rounded-full inline-block"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading tracking-tight">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#A3BDBC] mt-0.5 pr-3.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onViewMore && (
            <button
              onClick={onViewMore}
              className="text-xs sm:text-sm text-[#7F903E] hover:text-[#9bb04d] font-semibold flex items-center gap-1 hover:underline ml-2"
            >
              <span>عرض المزيد</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full bg-[#0B2D33] border border-[#234536] text-[#E8F0EA] hover:bg-[#234536] hover:text-white transition-colors"
              aria-label="تمرير لليمين"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full bg-[#0B2D33] border border-[#234536] text-[#E8F0EA] hover:bg-[#234536] hover:text-white transition-colors"
              aria-label="تمرير لليسار"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 lg:px-8 pb-3"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`shrink-0 ${
              featuredAspect
                ? 'w-64 sm:w-80 md:w-96'
                : 'w-40 sm:w-48 md:w-56'
            }`}
          >
            <MediaCard
              item={item}
              isInWatchlist={watchlist.includes(item.id)}
              onSelect={onSelect}
              onPlay={onPlay}
              onToggleWatchlist={onToggleWatchlist}
              featuredAspect={featuredAspect}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentRow;
