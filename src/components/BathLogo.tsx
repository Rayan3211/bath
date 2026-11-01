import React from 'react';

interface BathLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'white' | 'brand' | 'dark' | 'olive';
  showWordmark?: boolean;
  showTagline?: boolean;
  onClick?: () => void;
}

export const BathLogo: React.FC<BathLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'white',
  showWordmark = true,
  showTagline = false,
  onClick,
}) => {
  // Brand color mappings from the official identity guide
  const markColor = {
    white: '#FFFFFF',
    brand: '#234536',
    dark: '#052329',
    olive: '#7F903E',
  }[variant];

  const sizeDimensions = {
    sm: { width: 44, height: 26 },
    md: { width: 68, height: 40 },
    lg: { width: 96, height: 56 },
    xl: { width: 140, height: 82 },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      dir="rtl"
    >
      {/* Official Geometric Symbol extracted directly from identity guide */}
      <svg
        width={sizeDimensions.width}
        height={sizeDimensions.height}
        viewBox="0 0 190 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="شعار منصة بث الرسمي"
      >
        {/* Upper Chevron / Caret: Representation of the three dots of (ث) */}
        <path
          d="M 32 46 L 56 22 L 80 46"
          stroke={markColor}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Horizontal Baseline: Abstract connection bar */}
        <rect
          x="12"
          y="58"
          width="166"
          height="16"
          rx="8"
          fill={markColor}
        />

        {/* Lower Dot: Representation of the dot of (ب) */}
        <circle
          cx="134"
          cy="92"
          r="9.5"
          fill={markColor}
        />
      </svg>

      {/* Brand Name Typography */}
      {showWordmark && (
        <div className="flex flex-col justify-center text-right">
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-black tracking-tight leading-none"
              style={{
                fontFamily: "'Tajawal', sans-serif",
                color: variant === 'brand' ? '#234536' : '#FFFFFF',
              }}
            >
              بَث
            </span>
            <span
              className="text-xs font-semibold tracking-widest opacity-80 uppercase"
              style={{
                color: variant === 'olive' ? '#7F903E' : '#7F903E',
              }}
            >
              BATH
            </span>
          </div>
          {showTagline && (
            <span
              className="text-[11px] font-medium tracking-normal mt-0.5"
              style={{ color: '#A3BDBC' }}
            >
              قصص تستحق المشاهدة
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default BathLogo;
