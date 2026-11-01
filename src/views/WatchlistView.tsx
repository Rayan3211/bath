import React from 'react';
import { MediaItem, ViewState } from '../types';
import { MediaCard } from '../components/MediaCard';
import { Bookmark, Compass, Trash2 } from 'lucide-react';

interface WatchlistViewProps {
  watchlist: string[];
  mediaItems: MediaItem[];
  onPlay: (item: MediaItem) => void;
  onSelect: (item: MediaItem) => void;
  onToggleWatchlist: (item: MediaItem) => void;
  onClearWatchlist: () => void;
  onNavigate: (view: ViewState) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  watchlist,
  mediaItems,
  onPlay,
  onSelect,
  onToggleWatchlist,
  onClearWatchlist,
  onNavigate,
}) => {
  const savedItems = mediaItems.filter((i) => watchlist.includes(i.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" dir="rtl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#234536]/40">
        <div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#7F903E]" />
            <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
              قائمة المشاهدة الخاصة بي
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A3BDBC] mt-1">
            الأعمال والمسلسلات التي حفظتها للمشاهدة لاحقاً على منصة بَث
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs bg-[#234536]/40 text-[#7F903E] border border-[#234536] px-3 py-1 rounded-full font-bold">
              {savedItems.length} أعمال محفوظة
            </span>
            <button
              onClick={onClearWatchlist}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>تفريغ القائمة</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid of Saved Items */}
      {savedItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {savedItems.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              isInWatchlist={true}
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
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">
            قائمتك فارغة حالياً
          </h3>
          <p className="text-xs sm:text-sm text-[#A3BDBC] max-w-md mx-auto leading-relaxed">
            لم تقم بإضافة أي أعمال بعد. تصفح مكتبة بَث واضغط على أيقونة الإضافة (+) لحفظ الأعمال والرجوع إليها في أي وقت.
          </p>
          <button
            onClick={() => onNavigate({ type: 'explore' })}
            className="px-6 py-2.5 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white text-xs font-bold transition-transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>استكشاف المحتوى الآن</span>
          </button>
        </div>
      )}

      {/* Local Session note */}
      <div className="text-center text-[11px] text-[#A3BDBC]/60 pt-6">
        * يتم حفظ قائمة المشاهدة حالياً في تخزين المتصفح المحلي (Local Storage) لضمان تجربة فورية في هذا الـ MVP.
      </div>
    </div>
  );
};

export default WatchlistView;
