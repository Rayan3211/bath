import React, { useState, useRef, useEffect } from 'react';
import { MediaItem, Episode } from '../types';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  RotateCw, 
  X, 
  ListVideo, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface VideoPlayerModalProps {
  item: MediaItem;
  initialEpisodeId?: string;
  onClose: () => void;
  onSelectEpisode?: (episode: Episode) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  item,
  initialEpisodeId,
  onClose,
  onSelectEpisode,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active episode if series has episodes
  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(() => {
    if (item.episodes && item.episodes.length > 0) {
      if (initialEpisodeId) {
        return item.episodes.find((e) => e.id === initialEpisodeId) || item.episodes[0];
      }
      return item.episodes[0];
    }
    return null;
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Current video source
  const currentVideoSrc = activeEpisode?.videoUrl || item.sampleVideoUrl;

  const currentTitle = activeEpisode
    ? `${item.title} - حلقة ${activeEpisode.episodeNumber}: ${activeEpisode.title}`
    : item.title;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        seekRelative(-10); // RTL right means backward or forward
      } else if (e.key === 'ArrowLeft') {
        seekRelative(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3500);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleEpisodeSelect = (ep: Episode) => {
    setActiveEpisode(ep);
    setIsVideoEnded(false);
    if (onSelectEpisode) onSelectEpisode(ep);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none"
      dir="rtl"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={currentVideoSrc}
        autoPlay
        playsInline
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setIsVideoEnded(true);
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Top Header Bar */}
      <div
        className={`absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 sm:p-6 flex items-center justify-between transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            title="إغلاق المشغل"
            aria-label="إغلاق المشغل"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-[#234536] text-[#7F903E] font-bold px-2 py-0.5 rounded">
                بَث PLAYER
              </span>
              <h2 className="text-white text-base sm:text-lg font-bold font-heading line-clamp-1">
                {currentTitle}
              </h2>
            </div>
            <p className="text-xs text-[#A3BDBC] mt-0.5">
              نموذج تفاعلي مصرح للاستخدام • {item.categoryLabel}
            </p>
          </div>
        </div>

        {/* Playlist Toggle for Series */}
        {item.episodes && item.episodes.length > 0 && (
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              showPlaylist
                ? 'bg-[#7F903E] text-white border-[#7F903E]'
                : 'bg-black/60 text-white/80 border-white/20 hover:bg-white/10'
            }`}
          >
            <ListVideo className="w-4 h-4" />
            <span className="hidden sm:inline">قائمة الحلقات</span>
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">
              {item.episodes.length}
            </span>
          </button>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 transition-opacity duration-300 z-20 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Progress Bar */}
        <div className="mb-3 flex items-center gap-3 text-xs text-[#E8F0EA]">
          <span className="w-12 text-center tabular-nums">{formatTime(currentTime)}</span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#7F903E] hover:h-2 transition-all"
            />
          </div>
          <span className="w-12 text-center tabular-nums text-white/60">{formatTime(duration)}</span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white flex items-center justify-center transition-transform hover:scale-105"
              aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>

            {/* Back 10s */}
            <button
              onClick={() => seekRelative(-10)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="تراجع 10 ثوانٍ"
              aria-label="تراجع 10 ثوانٍ"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Forward 10s */}
            <button
              onClick={() => seekRelative(10)}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="تقديم 10 ثوانٍ"
              aria-label="تقديم 10 ثوانٍ"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-1.5 group">
              <button
                onClick={toggleMute}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-red-400" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/30 rounded appearance-none cursor-pointer accent-[#7F903E] opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Speed Toggle */}
            <button
              onClick={handleSpeedChange}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              title="سرعة التشغيل"
            >
              {playbackSpeed}x
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="ملء الشاشة"
              aria-label="ملء الشاشة"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Playlist Drawer Overlay */}
      {showPlaylist && item.episodes && item.episodes.length > 0 && (
        <div className="absolute top-18 bottom-20 left-4 w-80 max-w-[90vw] bg-[#052329]/95 border border-[#234536] rounded-2xl shadow-2xl z-30 p-4 flex flex-col backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#234536]/60 mb-3">
            <h3 className="text-white font-bold text-sm">حلقات العمل</h3>
            <button
              onClick={() => setShowPlaylist(false)}
              className="text-[#A3BDBC] hover:text-white text-xs"
            >
              إغلاق
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {item.episodes.map((ep) => {
              const isActive = activeEpisode?.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => handleEpisodeSelect(ep)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                    isActive
                      ? 'bg-[#234536] border border-[#7F903E]'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-black">
                    <img
                      src={ep.thumbnailUrl}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#7F903E]/40 flex items-center justify-center">
                        <Play className="w-4 h-4 fill-white text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-xs font-bold text-white truncate">
                      {ep.episodeNumber}. {ep.title}
                    </p>
                    <p className="text-[11px] text-[#A3BDBC]">{ep.duration}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Video Ended Overlay */}
      {isVideoEnded && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-6 z-25 text-center animate-fade-in">
          <CheckCircle2 className="w-14 h-14 text-[#7F903E] mb-3" />
          <h3 className="text-2xl font-bold text-white mb-2 font-heading">
            انتهت المشاهدة التجريبية
          </h3>
          <p className="text-sm text-[#A3BDBC] max-w-md mb-6 leading-relaxed">
            تم اختبار تشغيل المقطع بنجاح. يمكنك إعادة المشاهدة أو تصفح باقي الأعمال المتاحة في المنصة.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                  setIsPlaying(true);
                  setIsVideoEnded(false);
                }
              }}
              className="px-6 py-2.5 rounded-full bg-[#7F903E] hover:bg-[#8ea047] text-white font-bold text-sm transition-transform hover:scale-105"
            >
              إعادة التشغيل
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-[#234536] text-white hover:bg-[#283D48] text-sm transition-colors"
            >
              العودة للمنصة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerModal;
