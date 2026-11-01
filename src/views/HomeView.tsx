import React from 'react';
import { MediaItem, ViewState, CategoryKey } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ContentRow } from '../components/ContentRow';
import { WaitlistSection } from '../components/WaitlistSection';
import { Sparkles, Clapperboard, Users, Radio, ArrowLeft, ShieldCheck } from 'lucide-react';

interface HomeViewProps {
  mediaItems: MediaItem[];
  watchlist: string[];
  onPlay: (item: MediaItem) => void;
  onSelect: (item: MediaItem) => void;
  onToggleWatchlist: (item: MediaItem) => void;
  onNavigate: (view: ViewState) => void;
  onLeadAdded: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  mediaItems,
  watchlist,
  onPlay,
  onSelect,
  onToggleWatchlist,
  onNavigate,
  onLeadAdded,
}) => {
  const publishedItems = mediaItems.filter((i) => i.published);

  // Groupings for curated rows
  const featuredItems = publishedItems.filter((i) => i.isFeatured);
  const trendingItems = publishedItems.filter((i) => i.isTrending);
  const seriesItems = publishedItems.filter((i) => i.type === 'series');
  const showsItems = publishedItems.filter((i) => i.type === 'show');
  const docItems = publishedItems.filter((i) => i.category === 'documentary' || i.category === 'culture');
  const shortItems = publishedItems.filter((i) => i.category === 'shorts' || i.type === 'short');
  const comedyItems = publishedItems.filter((i) => i.category === 'comedy');

  return (
    <div className="space-y-8">
      {/* Cinematic Hero */}
      <HeroSection
        featuredItems={featuredItems.length > 0 ? featuredItems : publishedItems.slice(0, 3)}
        watchlist={watchlist}
        onPlay={onPlay}
        onSelect={onSelect}
        onToggleWatchlist={onToggleWatchlist}
      />

      {/* Value Pillars Banner (The 3 Pillars of Bath) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#0B2D33]/90 backdrop-blur-md border border-[#234536] p-5 rounded-2xl shadow-xl">
          
          <div className="flex items-start gap-3.5 p-2 text-right">
            <div className="w-10 h-10 rounded-xl bg-[#234536] text-[#7F903E] flex items-center justify-center shrink-0 border border-[#7F903E]/30">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm font-heading">
                استوديو صناعة محتوى وملكية فكرية
              </h3>
              <p className="text-xs text-[#A3BDBC] mt-1 leading-relaxed">
                إنتاج قصص وأفكار سعودية أصلية قابلة للتوسع والتوزيع كملكية فكرية وطنية.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2 text-right border-y md:border-y-0 md:border-x border-[#234536]/60">
            <div className="w-10 h-10 rounded-xl bg-[#234536] text-[#7F903E] flex items-center justify-center shrink-0 border border-[#7F903E]/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm font-heading">
                علامة إعلامية تبني جمهوراً متفاعلاً
              </h3>
              <p className="text-xs text-[#A3BDBC] mt-1 leading-relaxed">
                التواصل المباشر مع الشباب وصنّاع الرأي لاختبار الطلب وتوليد إيرادات مستدامة.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-2 text-right">
            <div className="w-10 h-10 rounded-xl bg-[#234536] text-[#7F903E] flex items-center justify-center shrink-0 border border-[#7F903E]/30">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm font-heading">
                منصة رقمية مرنة حسب نتائج السوق
              </h3>
              <p className="text-xs text-[#A3BDBC] mt-1 leading-relaxed">
                التوسع من المحتوى القصير إلى الإنتاجات الكبرى والبث التفاعلي استجابة للأرقام.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Row 1: الأكثر مشاهدة */}
      <ContentRow
        title="الأكثر مشاهدة وتفضيلاً"
        subtitle="الأعمال التي حققت أعلى نسب إقبال في العرض التجريبي"
        items={trendingItems}
        watchlist={watchlist}
        onSelect={onSelect}
        onPlay={onPlay}
        onToggleWatchlist={onToggleWatchlist}
        onViewMore={() => onNavigate({ type: 'explore' })}
      />

      {/* Row 2: مسلسلات بَث الأصلية */}
      <ContentRow
        title="مسلسلات بَث القصيرة"
        subtitle="قصص مكثفة وإيقاع سريع يواكب تطلعات المشاهد المعاصر"
        items={seriesItems}
        watchlist={watchlist}
        onSelect={onSelect}
        onPlay={onPlay}
        onToggleWatchlist={onToggleWatchlist}
        onViewMore={() => onNavigate({ type: 'series' })}
      />

      {/* Row 3: برامج وحوارات */}
      <ContentRow
        title="برامج وحوارات «خارج النص»"
        subtitle="حوارات صريحة وغير مكررة مع النخب الشابة وصناع المحتوى"
        items={showsItems}
        watchlist={watchlist}
        onSelect={onSelect}
        onPlay={onPlay}
        onToggleWatchlist={onToggleWatchlist}
        onViewMore={() => onNavigate({ type: 'shows' })}
      />

      {/* Investor Pitch Teaser Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="bg-gradient-to-r from-[#283D48] via-[#234536] to-[#052329] border border-[#7F903E]/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7F903E] bg-[#052329]/80 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لحاضنات ومسرّعات الأعمال والمستثمرين</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              لماذا نستثمر في «بَث» اليوم؟
            </h3>
            <p className="text-xs sm:text-sm text-[#E8F0EA]/80 max-w-xl leading-relaxed">
              اطّلع على استراتيجية التحقق من السوق، ونموذج الإيرادات الستة، وخريطة الطريق من اختبار الجمهور الأولي إلى استوديو الإنتاج والتوزيع الإقليمي.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ type: 'investors' })}
            className="shrink-0 px-6 py-3 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <span>استعراض ملف المستثمرين (Pitch)</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 4: قصص ووثائقيات سعودية */}
      <ContentRow
        title="قصص ووثائقيات من المجتمع السعودي"
        subtitle="سجلات بصرية غنية لذاكرة المكان وتراث المحافظات"
        items={docItems}
        watchlist={watchlist}
        onSelect={onSelect}
        onPlay={onPlay}
        onToggleWatchlist={onToggleWatchlist}
        onViewMore={() => onNavigate({ type: 'explore', category: 'documentary' })}
      />

      {/* Row 5: على السريع (Shorts) */}
      <ContentRow
        title="على السريع • محتوى خاطف"
        subtitle="اسكتشات ومقاطع ذكية تناسب المشاهدة أثناء التنقل"
        items={shortItems}
        watchlist={watchlist}
        onSelect={onSelect}
        onPlay={onPlay}
        onToggleWatchlist={onToggleWatchlist}
        onViewMore={() => onNavigate({ type: 'shorts' })}
        featuredAspect={true}
      />

      {/* Demand Validation Waitlist Section */}
      <WaitlistSection onLeadAdded={onLeadAdded} />
    </div>
  );
};

export default HomeView;
