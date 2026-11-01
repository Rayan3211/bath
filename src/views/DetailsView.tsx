import React from 'react';
import { MediaItem, Episode } from '../types';
import { MediaCard } from '../components/MediaCard';
import { 
  Play, 
  Plus, 
  Check, 
  Clock, 
  Calendar, 
  Film, 
  ArrowRight, 
  Sparkles, 
  ListVideo,
  Eye
} from 'lucide-react';

interface DetailsViewProps {
  mediaId: string;
  mediaItems: MediaItem[];
  watchlist: string[];
  onPlay: (item: MediaItem, episode?: Episode) => void;
  onToggleWatchlist: (item: MediaItem) => void;
  onSelectSimilar: (item: MediaItem) => void;
  onBack: () => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  mediaId,
  mediaItems,
  watchlist,
  onPlay,
  onToggleWatchlist,
  onSelectSimilar,
  onBack,
}) => {
  const item = mediaItems.find((i) => i.id === mediaId) || mediaItems[0];
  const inWatchlist = watchlist.includes(item.id);

  // Similar items in the same category or type
  const similarItems = mediaItems
    .filter((i) => i.id !== item.id && (i.category === item.category || i.type === item.type))
    .slice(0, 4);

  return (
    <div className="space-y-10 pb-16" dir="rtl">
      
      {/* Top Details Hero Backdrop */}
      <div className="relative w-full min-h-[460px] md:h-[60vh] max-h-[600px] overflow-hidden select-none">
        <img
          src={item.backdropUrl}
          alt={item.title}
          className="w-full h-full object-cover object-center filter brightness-75"
        />

        {/* Brand Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#052329] via-[#052329]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052329] via-[#052329]/60 to-transparent w-full md:w-3/4" />

        {/* Back Button */}
        <div className="absolute top-6 right-4 sm:right-8 z-20">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#052329]/80 hover:bg-[#234536] text-[#E8F0EA] hover:text-white border border-[#234536] text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
            aria-label="الرجوع"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رجوع</span>
          </button>
        </div>

        {/* Hero Information */}
        <div className="absolute bottom-0 inset-x-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 z-10">
          <div className="max-w-2xl space-y-4">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {item.isExclusive && (
                <span className="bg-[#234536] text-white font-bold px-3 py-1 rounded-full border border-[#7F903E]/50 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#7F903E]" />
                  <span>إنتاج بَث الأصلي</span>
                </span>
              )}
              <span className="bg-[#0B2D33] text-[#7F903E] font-bold px-2.5 py-1 rounded-md border border-[#234536]">
                {item.categoryLabel}
              </span>
              <span className="bg-[#052329]/90 text-[#A3BDBC] px-2.5 py-1 rounded-md border border-[#234536]">
                {item.releaseYear}
              </span>
              <span className="bg-[#052329]/90 text-[#A3BDBC] px-2.5 py-1 rounded-md border border-[#234536]">
                {item.durationOrEpisodes}
              </span>
              <span className="text-[#7F903E] font-bold bg-[#7F903E]/10 px-2.5 py-1 rounded-md border border-[#7F903E]/30">
                {item.rating}
              </span>
              <span className="text-[#A3BDBC] flex items-center gap-1 mr-2 text-[11px]">
                <Eye className="w-3.5 h-3.5 text-[#7F903E]" />
                <span>{item.viewsCount?.toLocaleString('ar-SA')} مشاهدة</span>
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading tracking-tight drop-shadow-md">
                {item.title}
              </h1>
              {item.englishTitle && (
                <p className="text-sm font-semibold text-[#7F903E] mt-1 tracking-wider uppercase">
                  {item.englishTitle}
                </p>
              )}
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-[#E8F0EA] leading-relaxed line-clamp-3">
              {item.synopsis}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onPlay(item)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#7F903E]/30 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-white text-white" />
                <span>مشاهدة العمل</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(item)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm border backdrop-blur-md transition-colors cursor-pointer ${
                  inWatchlist
                    ? 'bg-[#234536] text-white border-[#7F903E]'
                    : 'bg-[#0B2D33]/80 hover:bg-[#234536]/80 text-[#E8F0EA] border-white/20'
                }`}
              >
                {inWatchlist ? (
                  <>
                    <Check className="w-4 h-4 text-[#7F903E]" />
                    <span>في قائمتي</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>أضف إلى قائمتي</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Body Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Story & Credits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#7F903E] rounded-full inline-block"></span>
              <span>عن العمل والقصة الكاملة</span>
            </h2>
            <p className="text-sm sm:text-base text-[#A3BDBC] leading-relaxed whitespace-pre-line bg-[#0B2D33]/40 border border-[#234536]/40 p-5 rounded-2xl">
              {item.detailedDescription || item.synopsis}
            </p>

            {item.tags && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-[#A3BDBC]">الكلمات المفتاحية:</span>
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#234536]/40 text-[#E8F0EA] px-2.5 py-1 rounded-lg border border-[#234536]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Credits Box */}
          <div className="bg-[#0B2D33] border border-[#234536] rounded-2xl p-6 space-y-4 h-fit">
            <h3 className="text-base font-bold text-white font-heading border-b border-[#234536]/60 pb-3">
              بطاقة العمل والإنتاج
            </h3>

            {item.creator && (
              <div>
                <span className="text-xs text-[#A3BDBC] block mb-0.5">الجهة المنتجة / الصانع:</span>
                <span className="text-sm font-semibold text-white">{item.creator}</span>
              </div>
            )}

            {item.cast && item.cast.length > 0 && (
              <div>
                <span className="text-xs text-[#A3BDBC] block mb-0.5">طاقم التمثيل والمشاركون:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {item.cast.map((actor, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#052329] text-[#E8F0EA] px-2.5 py-1 rounded-md border border-[#234536]/70"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <span className="text-xs text-[#A3BDBC] block mb-0.5">التصنيف الإرشادي:</span>
              <span className="text-sm font-semibold text-[#7F903E]">{item.rating} (مناسب لجمهور المنصة)</span>
            </div>

            <div>
              <span className="text-xs text-[#A3BDBC] block mb-0.5">حالة الترخيص والملكية:</span>
              <span className="text-xs text-[#E8F0EA]">محتوى تصوري مخصص لنموذج MVP بَث</span>
            </div>
          </div>

        </div>

        {/* Episodes Section (if available) */}
        {item.episodes && item.episodes.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-heading flex items-center gap-2">
                <ListVideo className="w-5 h-5 text-[#7F903E]" />
                <span>حلقات الموسم الأول ({item.episodes.length} حلقات)</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.episodes.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => onPlay(item, ep)}
                  className="group bg-[#0B2D33] hover:bg-[#123940] border border-[#234536] hover:border-[#7F903E] rounded-2xl p-3.5 flex items-start gap-4 transition-all cursor-pointer"
                >
                  <div className="relative w-28 sm:w-36 aspect-video rounded-xl overflow-hidden shrink-0 bg-black">
                    <img
                      src={ep.thumbnailUrl}
                      alt={ep.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#7F903E] text-white flex items-center justify-center shadow">
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-xs text-[#A3BDBC] mb-1">
                      <span className="text-[#7F903E] font-bold">الحلقة {ep.episodeNumber}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{ep.duration}</span>
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#7F903E] transition-colors truncate">
                      {ep.title}
                    </h3>
                    <p className="text-xs text-[#A3BDBC]/80 line-clamp-2 mt-1 leading-relaxed">
                      {ep.synopsis}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Titles Suggestions */}
        {similarItems.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-[#234536]/50">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
              أعمال مشابهة قد تهمك
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarItems.map((similar) => (
                <MediaCard
                  key={similar.id}
                  item={similar}
                  isInWatchlist={watchlist.includes(similar.id)}
                  onSelect={onSelectSimilar}
                  onPlay={onPlay}
                  onToggleWatchlist={onToggleWatchlist}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailsView;
