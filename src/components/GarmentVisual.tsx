import React from 'react';

interface GarmentVisualProps {
  type: string;
  colorHex: string;
  className?: string;
  aspect?: 'card' | 'hero' | 'thumb';
}

export const GarmentVisual: React.FC<GarmentVisualProps> = ({
  type,
  colorHex,
  className = '',
  aspect = 'card'
}) => {
  // Compute subtle highlight and shadow tones based on primary hex
  const isDark = colorHex.toLowerCase() === '#121212' || colorHex.toLowerCase() === '#18181b' || colorHex.toLowerCase() === '#1c1c1e' || colorHex.toLowerCase() === '#262626' || colorHex.toLowerCase() === '#1b2433';
  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(0, 0, 0, 0.22)';
  const highlightColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.45)';
  const shadowColor = 'rgba(0, 0, 0, 0.25)';

  const renderSilhouette = () => {
    switch (type) {
      case 'coat':
        return (
          <g transform="translate(100, 45) scale(1.15)">
            {/* Coat Body */}
            <path
              d="M 50 20 L 75 22 L 95 65 L 105 130 L 98 250 L 2 250 L -5 130 L 5 65 L 25 22 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Left & Right Peak Lapels */}
            <path
              d="M 25 22 L 40 85 L 18 105 L 50 160 L 50 20 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.2"
              filter="brightness(0.95)"
            />
            <path
              d="M 75 22 L 60 85 L 82 105 L 50 160 L 50 20 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.2"
              filter="brightness(1.05)"
            />
            {/* Double Breasted Horn Buttons */}
            <circle cx="36" cy="140" r="3.2" fill="#151515" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <circle cx="64" cy="140" r="3.2" fill="#151515" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <circle cx="36" cy="170" r="3.2" fill="#151515" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <circle cx="64" cy="170" r="3.2" fill="#151515" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            {/* Flap Pockets */}
            <path d="M 12 185 L 36 185" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 64 185 L 88 185" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            {/* Chest Welt Pocket */}
            <path d="M 24 108 L 38 106" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
            {/* Subtle Center Crease */}
            <line x1="50" y1="160" x2="50" y2="250" stroke={shadowColor} strokeWidth="1" strokeDasharray="2 2" />
          </g>
        );

      case 'sweater':
        return (
          <g transform="translate(95, 55) scale(1.2)">
            {/* Chunky Ribbed Sweater Silhouette */}
            <path
              d="M 35 25 Q 55 33 75 25 L 98 48 L 115 110 L 98 118 L 88 78 L 86 175 L 24 175 L 22 78 L 12 118 L -5 110 L 12 48 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Mock/Crew Collar */}
            <path
              d="M 35 25 Q 55 35 75 25 Q 55 18 35 25"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="2"
              filter="brightness(0.9)"
            />
            {/* Saddle Raglan Seam lines */}
            <path d="M 35 25 Q 45 45 35 75" stroke={strokeColor} strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 75 25 Q 65 45 75 75" stroke={strokeColor} strokeWidth="1.2" fill="none" opacity="0.6" />
            {/* Ribbed Hem & Cuffs */}
            <path d="M 24 168 L 86 168" stroke={shadowColor} strokeWidth="1" />
            <path d="M -2 108 L 12 116" stroke={shadowColor} strokeWidth="1" />
            <path d="M 112 108 L 98 116" stroke={shadowColor} strokeWidth="1" />
            {/* Subtle rib texture lines */}
            <line x1="42" y1="60" x2="42" y2="165" stroke={highlightColor} strokeWidth="1" opacity="0.3" />
            <line x1="55" y1="50" x2="55" y2="165" stroke={highlightColor} strokeWidth="1" opacity="0.4" />
            <line x1="68" y1="60" x2="68" y2="165" stroke={highlightColor} strokeWidth="1" opacity="0.3" />
          </g>
        );

      case 'trouser':
        return (
          <g transform="translate(105, 45) scale(1.15)">
            {/* Trousers silhouette with architectural pleats */}
            <path
              d="M 18 20 L 72 20 L 76 65 L 85 240 L 53 240 L 45 95 L 37 240 L 5 240 L 14 65 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Waistband */}
            <path d="M 18 20 L 72 20 L 73 30 L 17 30 Z" fill={colorHex} stroke={strokeColor} strokeWidth="1.2" filter="brightness(0.9)" />
            {/* Side slash pockets */}
            <line x1="20" y1="30" x2="15" y2="55" stroke={strokeColor} strokeWidth="1.5" />
            <line x1="70" y1="30" x2="75" y2="55" stroke={strokeColor} strokeWidth="1.5" />
            {/* Forward Creases */}
            <line x1="31" y1="35" x2="25" y2="238" stroke={highlightColor} strokeWidth="1.2" opacity="0.7" />
            <line x1="59" y1="35" x2="65" y2="238" stroke={highlightColor} strokeWidth="1.2" opacity="0.7" />
            {/* Cuffs */}
            <line x1="5" y1="230" x2="37" y2="230" stroke={shadowColor} strokeWidth="1" />
            <line x1="53" y1="230" x2="85" y2="230" stroke={shadowColor} strokeWidth="1" />
          </g>
        );

      case 'shirt':
        return (
          <g transform="translate(100, 50) scale(1.18)">
            {/* Poplin Shirt Silhouette */}
            <path
              d="M 32 20 L 68 20 L 92 48 L 105 130 L 88 135 L 78 80 L 76 185 Q 50 192 24 185 L 22 80 L 12 135 L -5 130 L 8 48 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* French Collar */}
            <path
              d="M 32 20 L 42 35 L 50 25 L 58 35 L 68 20 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.5"
              filter="brightness(1.05)"
            />
            {/* Concealed / Clean Center Placket */}
            <line x1="50" y1="25" x2="50" y2="188" stroke={strokeColor} strokeWidth="1.5" />
            {/* Mother of pearl buttons */}
            <circle cx="50" cy="55" r="2" fill="#FAF9F5" stroke="#A1A1AA" strokeWidth="0.8" />
            <circle cx="50" cy="85" r="2" fill="#FAF9F5" stroke="#A1A1AA" strokeWidth="0.8" />
            <circle cx="50" cy="115" r="2" fill="#FAF9F5" stroke="#A1A1AA" strokeWidth="0.8" />
            <circle cx="50" cy="145" r="2" fill="#FAF9F5" stroke="#A1A1AA" strokeWidth="0.8" />
            {/* Chest Pocket */}
            <path d="M 28 65 L 42 65 L 42 82 L 35 87 L 28 82 Z" stroke={strokeColor} strokeWidth="1" fill="none" opacity="0.5" />
          </g>
        );

      case 'watch':
      case 'accessories':
        return (
          <g transform="translate(110, 60) scale(1.1)">
            {/* Watch Leather Strap */}
            <rect x="25" y="10" width="30" height="200" rx="3" fill={colorHex} stroke={strokeColor} strokeWidth="1.5" />
            {/* Subtle strap stitch lines */}
            <line x1="28" y1="15" x2="28" y2="205" stroke={highlightColor} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="52" y1="15" x2="52" y2="205" stroke={highlightColor} strokeWidth="1" strokeDasharray="3 3" />
            {/* Round Watch Case */}
            <circle cx="40" cy="110" r="42" fill="#EAE8E0" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="40" cy="110" r="37" fill="#FFFFFF" stroke="#D4D2C9" strokeWidth="1" />
            {/* Dial Hour Markers & Hands */}
            <line x1="40" y1="78" x2="40" y2="86" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="40" y1="134" x2="40" y2="142" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="12" y1="110" x2="20" y2="110" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="60" y1="110" x2="68" y2="110" stroke="#1A1A1A" strokeWidth="2" />
            {/* Watch Hands */}
            <line x1="40" y1="110" x2="56" y2="100" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="110" x2="40" y2="88" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="40" y1="110" x2="30" y2="125" stroke="#FF3F6C" strokeWidth="1" strokeLinecap="round" />
            <circle cx="40" cy="110" r="2.5" fill="#FF3F6C" />
            {/* Crown */}
            <rect x="82" y="106" width="5" height="8" rx="1" fill="#1A1A1A" />
          </g>
        );

      case 'belt':
        return (
          <g transform="translate(70, 75) scale(1.15)">
            {/* Rolled Leather Belt */}
            <path
              d="M 20 80 C 20 40, 120 40, 120 80 C 120 120, 20 120, 20 80 Z"
              fill="none"
              stroke={colorHex}
              strokeWidth="24"
              strokeLinecap="round"
            />
            {/* Solid Brass Buckle */}
            <rect x="15" y="60" width="35" height="40" rx="3" fill="none" stroke="#D4AF37" strokeWidth="5" />
            <line x1="32" y1="60" x2="32" y2="100" stroke="#B8860B" strokeWidth="3" />
            {/* Belt Holes */}
            <circle cx="95" cy="90" r="2" fill="#1A1A1A" />
            <circle cx="105" cy="85" r="2" fill="#1A1A1A" />
            <circle cx="112" cy="78" r="2" fill="#1A1A1A" />
          </g>
        );

      case 'derby':
      default:
        return (
          <g transform="translate(85, 90) scale(1.2)">
            {/* Sculptural Leather Derby Shoe Profile */}
            <path
              d="M 15 80 Q 25 50 50 48 Q 75 45 95 62 L 125 78 Q 140 85 142 98 L 140 108 L 8 108 L 8 92 Z"
              fill={colorHex}
              stroke={strokeColor}
              strokeWidth="1.5"
            />
            {/* Goodyear Storm Welt & Commando Sole */}
            <path
              d="M 5 108 L 145 108 L 143 118 L 85 118 L 85 114 L 35 114 L 35 122 L 5 122 Z"
              fill="#181818"
              stroke="#0D0D0D"
              strokeWidth="1.2"
            />
            {/* Heel block */}
            <rect x="5" y="112" width="30" height="12" fill="#0E0E0E" />
            {/* Lacing Vamps & Blind Eyelets */}
            <path d="M 50 48 L 70 70 L 60 78 Z" fill={colorHex} stroke={strokeColor} strokeWidth="1" filter="brightness(1.1)" />
            <circle cx="56" cy="56" r="1.5" fill="#52525B" />
            <circle cx="60" cy="62" r="1.5" fill="#52525B" />
            <circle cx="64" cy="68" r="1.5" fill="#52525B" />
            {/* Toe cap burnish highlight */}
            <path d="M 115 80 Q 135 87 138 98" stroke={highlightColor} strokeWidth="2" fill="none" opacity="0.6" />
          </g>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden flex items-center justify-center bg-[#F4F3EE] ${className}`}>
      {/* Subtle architectural grid pattern background */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="archGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#D7D5CC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archGrid)" />
      </svg>

      {/* Atmospheric lighting gradient and pedestal vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#EAE8E0]/30 to-[#DEDBD1]/60 pointer-events-none" />

      {/* Primary SVG Garment Presentation */}
      <svg
        viewBox="0 0 300 340"
        className="w-full h-full max-h-[380px] drop-shadow-[0_16px_28px_rgba(0,0,0,0.07)] transition-transform duration-500 hover:scale-[1.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pedestalGlow" cx="50%" cy="85%" r="45%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft ground contact shadow */}
        <ellipse cx="150" cy="305" rx="90" ry="12" fill="url(#pedestalGlow)" />

        {renderSilhouette()}
      </svg>

      {/* Brand stamp watermark */}
      <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.2em] text-[#8C887E] font-bold pointer-events-none select-none">
        XURE · ATELIER
      </div>
    </div>
  );
};
