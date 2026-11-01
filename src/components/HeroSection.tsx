import React, { useState } from 'react';
import { MediaItem } from '../types';
import { Play, Plus, Check, Info, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

interface HeroSectionProps {
  featuredItems: MediaItem[];
  watchlist: string[];
  onPlay: (item: MediaItem) => void;
  onSelect: (item: MediaItem) => void;
  onToggleWatchlist: (item: MediaItem) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredItems,
  watchlist,
  onPlay,
  onSelect,
  onToggleWatchlist,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredItems || featuredItems.length === 0) return null;

  const currentItem = featuredItems[currentIndex] || featuredItems[0];
  const inWatchlist = watchlist.includes(currentItem.id);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="relative w-full h-[75vh] min-h-[500px] max-h-[720px] overflow-hidden select-none">
      {/* Background Cinematic Image with Transitions */}
      <div className="absolute inset-0 bg-[#052329]">
        <img
          key={currentItem.id}
          src={currentItem.backdropUrl}
          alt={currentItem.title}
          className="w-full h-full object-cover object-center animate-fade-in transition-all duration-700 filter brightness-85"
        />
        
        {/* Cinematic Vignette Gradients adhering to brand palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#052329] via-[#052329]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#052329] via-[#052329]/70 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#234536]/20 to-[#052329]/90 mix-blend-multiply" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 md:pb-20">
        <div className="max-w-2xl space-y-4">
          
          {/* Badge & Meta */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 bg-[#234536] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#7F903E]/50 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#7F903E]" />
              <span>إنتاج بَث الأصلي الحصري</span>
            </span>
            <span className="text-xs font-semibold text-[#A3BDBC] bg-[#052329]/80 px-2.5 py-0.5 rounded-md border border-[#234536]">
              {currentItem.categoryLabel}
            </span>
            <span className="text-xs text-[#A3BDBC]">
              {currentItem.releaseYear} • {currentItem.durationOrEpisodes}
            </span>
            <span className="text-xs text-[#7F903E] font-bold bg-[#7F903E]/15 px-2 py-0.5 rounded">
              {currentItem.rating}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white font-heading leading-tight tracking-tight drop-shadow-md">
            {currentItem.title}
          </h1>

          {/* Synopsis */}
          <p className="text-sm sm:text-base md:text-lg text-[#E8F0EA]/90 leading-relaxed max-w-xl line-clamp-3">
            {currentItem.synopsis}
          </p>

          {/* Cast / Tags */}
          {currentItem.tags && (
            <div className="flex items-center gap-2 text-xs text-[#A3BDBC]">
              {currentItem.tags.map((tag, idx) => (
                <span key={idx} className="bg-[#0B2D33]/60 px-2 py-0.5 rounded text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onPlay(currentItem)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#7F903E]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white text-white" />
              <span>مشاهدة الآن</span>
            </button>

            <button
              onClick={() => onToggleWatchlist(currentItem)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm sm:text-base border backdrop-blur-md transition-all cursor-pointer ${
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

            <button
              onClick={() => onSelect(currentItem)}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#052329]/80 hover:bg-[#052329] text-[#A3BDBC] hover:text-white border border-[#234536] text-sm font-medium transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" />
              <span>تفاصيل العمل</span>
            </button>
          </div>

        </div>
      </div>

      {/* Featured Slider Controls (if multiple featured items) */}
      {featuredItems.length > 1 && (
        <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-[#052329]/80 border border-[#234536] text-white hover:bg-[#234536] transition-colors"
            aria-label="العمل السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1 px-2">
            {featuredItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#7F903E]' : 'w-2 bg-white/30'
                }`}
                aria-label={`الشريحة ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-[#052329]/80 border border-[#234536] text-white hover:bg-[#234536] transition-colors"
            aria-label="العمل التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
