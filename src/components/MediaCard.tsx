import React from 'react';
import { MediaItem } from '../types';
import { Play, Plus, Check, Clock, Film } from 'lucide-react';

interface MediaCardProps {
  item: MediaItem;
  isInWatchlist: boolean;
  onSelect: (item: MediaItem) => void;
  onPlay: (item: MediaItem) => void;
  onToggleWatchlist: (item: MediaItem) => void;
  featuredAspect?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  isInWatchlist,
  onSelect,
  onPlay,
  onToggleWatchlist,
  featuredAspect = false,
}) => {
  const [imgSrc, setImgSrc] = React.useState(featuredAspect ? item.backdropUrl : item.posterUrl);
  return (
    <div
      className="group relative bg-[#0B2D33] rounded-xl overflow-hidden border border-[#234536]/50 hover:border-[#7F903E] transition-all duration-300 hover:shadow-xl hover:shadow-[#052329]/80 flex flex-col cursor-pointer select-none"
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      aria-label={`عرض تفاصيل ${item.title}`}
    >
      {/* Thumbnail / Poster Container */}
      <div className={`relative w-full overflow-hidden bg-[#052329] ${featuredAspect ? 'aspect-video' : 'aspect-[3/4]'}`}>
        <img
          src={imgSrc}
          alt={item.title}
          loading="lazy"
          onError={() => {
            setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80');
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#052329] via-[#052329]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          {item.isExclusive && (
            <span className="bg-[#234536]/90 backdrop-blur-md text-[#F1F5F2] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#7F903E]/40">
              أصلي
            </span>
          )}
          <span className="bg-[#052329]/80 backdrop-blur-md text-[#A3BDBC] text-[10px] font-semibold px-1.5 py-0.5 rounded border border-[#234536]/50">
            {item.rating}
          </span>
        </div>

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#052329]/50 backdrop-blur-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
            className="w-11 h-11 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            title="مشاهدة الآن"
            aria-label={`مشاهدة ${item.title}`}
          >
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist(item);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
              isInWatchlist
                ? 'bg-[#234536] text-white border-[#7F903E]'
                : 'bg-[#052329]/80 text-white border-white/40 hover:border-white'
            }`}
            title={isInWatchlist ? 'إزالة من قائمتي' : 'إضافة إلى قائمتي'}
            aria-label={isInWatchlist ? 'إزالة من قائمتي' : 'إضافة إلى قائمتي'}
          >
            {isInWatchlist ? <Check className="w-4 h-4 text-[#7F903E]" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>

        {/* Duration / Episodes Pill */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] text-[#E8F0EA] bg-[#052329]/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
          <Clock className="w-3 h-3 text-[#7F903E]" />
          <span>{item.durationOrEpisodes}</span>
        </div>
      </div>

      {/* Card Metadata info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between text-right">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#A3BDBC] mb-1">
            <span className="text-[#7F903E] font-medium">{item.categoryLabel}</span>
            <span>{item.releaseYear}</span>
          </div>
          <h3 className="text-white font-bold text-base line-clamp-1 group-hover:text-[#7F903E] transition-colors font-heading">
            {item.title}
          </h3>
          <p className="text-xs text-[#A3BDBC]/80 line-clamp-2 mt-1 leading-relaxed">
            {item.synopsis}
          </p>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5 pt-2 border-t border-[#234536]/30 overflow-hidden text-[10px] text-[#A3BDBC]/60">
            {item.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx}>#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
