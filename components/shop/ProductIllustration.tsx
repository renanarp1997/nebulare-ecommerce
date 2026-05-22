import React from "react";

export type Shape =
  | "headphone"
  | "watch"
  | "backpack"
  | "sneaker"
  | "speaker"
  | "camera"
  | "controller"
  | "lamp"
  | "tv"
  | "fridge"
  | "book"
  | "smartphone"
  | "perfume"
  | "dress"
  | "blender"
  | "console"
  | "laptop"
  | "iron"
  | "pan"
  | "sofa"
  | "bag"
  | "lipstick"
  | "fan"
  | "vacuum"
  | "kindle"
  | "drone"
  | "skincare"
  | "tshirt";

type Props = {
  shape: Shape;
  className?: string;
};

const wrap = "transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]";

export default function ProductIllustration({ shape, className = "" }: Props) {
  const cls = `${wrap} ${className}`;

  switch (shape) {
    case "headphone":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="hp-cup" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#334155" /><stop offset="1" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path d="M50 110 Q50 50 100 50 Q150 50 150 110" stroke="#1e293b" strokeWidth="10" fill="none" strokeLinecap="round" />
          <rect x="32" y="100" width="36" height="56" rx="14" fill="url(#hp-cup)" />
          <rect x="132" y="100" width="36" height="56" rx="14" fill="url(#hp-cup)" />
          <circle cx="50" cy="128" r="10" fill="#6366f1" />
          <circle cx="150" cy="128" r="10" fill="#6366f1" />
          <circle cx="50" cy="128" r="4" fill="#a5b4fc" />
          <circle cx="150" cy="128" r="4" fill="#a5b4fc" />
        </svg>
      );

    case "watch":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <rect x="78" y="20" width="44" height="40" rx="6" fill="#1e293b" />
          <rect x="78" y="140" width="44" height="40" rx="6" fill="#1e293b" />
          <rect x="60" y="55" width="80" height="90" rx="20" fill="#334155" />
          <rect x="68" y="65" width="64" height="70" rx="14" fill="#020617" />
          <text x="100" y="100" textAnchor="middle" fontSize="18" fill="#a5b4fc" fontWeight="700">10:42</text>
          <text x="100" y="118" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="700">128 BPM</text>
        </svg>
      );

    case "backpack":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <path d="M65 40 Q65 22 100 22 Q135 22 135 40" stroke="#1e293b" strokeWidth="6" fill="none" />
          <rect x="50" y="50" width="100" height="120" rx="22" fill="#334155" />
          <rect x="68" y="78" width="64" height="38" rx="8" fill="#1e293b" />
          <rect x="74" y="86" width="52" height="4" rx="2" fill="#475569" />
          <rect x="74" y="96" width="32" height="4" rx="2" fill="#475569" />
          <rect x="74" y="130" width="52" height="20" rx="4" fill="#1e293b" />
          <circle cx="100" cy="140" r="3" fill="#10b981" />
        </svg>
      );

    case "sneaker":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <path d="M30 130 Q40 75 95 80 Q120 82 140 100 Q160 115 180 115 Q200 115 200 135 L200 150 Q200 160 188 160 L40 160 Q30 160 30 150 Z" fill="#f8fafc" />
          <path d="M30 145 L200 145 L200 158 Q200 165 192 165 L38 165 Q30 165 30 158 Z" fill="#6366f1" />
          <path d="M90 100 L95 138" stroke="#94a3b8" strokeWidth="2.5" />
          <path d="M110 96 L115 138" stroke="#94a3b8" strokeWidth="2.5" />
          <path d="M130 100 L135 138" stroke="#94a3b8" strokeWidth="2.5" />
          <circle cx="150" cy="115" r="4" fill="#10b981" />
        </svg>
      );

    case "speaker":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <rect x="50" y="40" width="100" height="130" rx="50" fill="#334155" />
          <circle cx="100" cy="90" r="22" fill="#020617" stroke="#475569" strokeWidth="2" />
          <circle cx="100" cy="90" r="12" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="100" cy="140" r="14" fill="#020617" stroke="#475569" strokeWidth="2" />
          <circle cx="100" cy="140" r="7" fill="#10b981" />
        </svg>
      );

    case "camera":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <rect x="30" y="70" width="160" height="90" rx="14" fill="#1e293b" />
          <rect x="80" y="50" width="50" height="30" rx="6" fill="#334155" />
          <circle cx="110" cy="115" r="34" fill="#0f172a" stroke="#334155" strokeWidth="3" />
          <circle cx="110" cy="115" r="22" fill="#020617" stroke="#475569" strokeWidth="2" />
          <circle cx="110" cy="115" r="10" fill="#1e293b" />
          <circle cx="118" cy="108" r="3" fill="#6366f1" />
          <rect x="160" y="80" width="22" height="8" rx="2" fill="#10b981" />
          <circle cx="46" cy="84" r="3" fill="#ef4444" />
        </svg>
      );

    case "controller":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <path d="M30 90 Q30 60 60 60 Q80 60 90 70 L130 70 Q140 60 160 60 Q190 60 190 90 L190 130 Q190 160 165 160 Q150 160 142 145 L78 145 Q70 160 55 160 Q30 160 30 130 Z" fill="#334155" />
          <circle cx="60" cy="100" r="14" fill="#020617" /><circle cx="60" cy="100" r="6" fill="#1e293b" />
          <circle cx="160" cy="120" r="14" fill="#020617" /><circle cx="160" cy="120" r="6" fill="#1e293b" />
          <circle cx="140" cy="92" r="5" fill="#10b981" />
          <circle cx="155" cy="100" r="5" fill="#ef4444" />
          <circle cx="125" cy="100" r="5" fill="#6366f1" />
          <circle cx="140" cy="108" r="5" fill="#fbbf24" />
        </svg>
      );

    case "lamp":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <radialGradient id="lp-glow" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0" stopColor="#a5b4fc" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#312e81" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="90" r="55" fill="url(#lp-glow)" />
          <rect x="90" y="140" width="20" height="20" fill="#1e293b" />
          <rect x="70" y="160" width="60" height="16" rx="4" fill="#0f172a" />
        </svg>
      );

    case "tv":
      return (
        <svg viewBox="0 0 240 200" className={cls} fill="none">
          <defs>
            <linearGradient id="tv-s" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#312e81" />
              <stop offset="0.5" stopColor="#6366f1" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect x="20" y="25" width="200" height="125" rx="8" fill="#1e293b" />
          <rect x="28" y="33" width="184" height="109" rx="3" fill="url(#tv-s)" />
          <rect x="40" y="60" width="60" height="6" rx="1" fill="#fff" opacity="0.5" />
          <rect x="40" y="74" width="100" height="6" rx="1" fill="#fff" opacity="0.3" />
          <circle cx="190" cy="115" r="14" fill="#fff" opacity="0.25" />
          <polygon points="186,108 186,122 198,115" fill="#fff" />
          <rect x="100" y="150" width="40" height="6" rx="2" fill="#1e293b" />
          <rect x="80" y="156" width="80" height="6" rx="2" fill="#0f172a" />
        </svg>
      );

    case "fridge":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <rect x="50" y="20" width="100" height="160" rx="10" fill="#f1f5f9" />
          <line x1="50" y1="80" x2="150" y2="80" stroke="#94a3b8" strokeWidth="2" />
          <rect x="138" y="35" width="4" height="30" rx="1" fill="#475569" />
          <rect x="138" y="100" width="4" height="40" rx="1" fill="#475569" />
          <rect x="60" y="44" width="36" height="20" rx="3" fill="#1e293b" />
          <rect x="64" y="48" width="10" height="3" fill="#10b981" />
          <rect x="64" y="54" width="20" height="3" fill="#6366f1" />
          <rect x="64" y="100" width="40" height="20" rx="2" fill="#e2e8f0" />
          <rect x="64" y="130" width="40" height="20" rx="2" fill="#e2e8f0" />
        </svg>
      );

    case "book":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="bk" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#4338ca" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect x="50" y="30" width="100" height="140" rx="3" fill="url(#bk)" />
          <rect x="50" y="30" width="8" height="140" fill="#1e1b4b" />
          <rect x="68" y="50" width="64" height="4" rx="1" fill="#fff" opacity="0.9" />
          <rect x="68" y="60" width="44" height="4" rx="1" fill="#fff" opacity="0.6" />
          <circle cx="100" cy="100" r="18" fill="#fff" opacity="0.15" />
          <text x="100" y="106" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff">B</text>
        </svg>
      );

    case "smartphone":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <rect x="65" y="15" width="70" height="170" rx="14" fill="#1e293b" />
          <rect x="71" y="22" width="58" height="156" rx="8" fill="#312e81" />
          <rect x="91" y="26" width="18" height="4" rx="2" fill="#020617" />
          <rect x="80" y="40" width="40" height="80" rx="4" fill="#6366f1" opacity="0.7" />
          <rect x="80" y="128" width="18" height="18" rx="3" fill="#10b981" />
          <rect x="102" y="128" width="18" height="18" rx="3" fill="#fbbf24" />
          <rect x="80" y="150" width="40" height="6" rx="2" fill="#fff" opacity="0.4" />
        </svg>
      );

    case "perfume":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="pf" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <rect x="85" y="20" width="30" height="20" rx="3" fill="#1e293b" />
          <rect x="80" y="38" width="40" height="14" rx="2" fill="#334155" />
          <path d="M70 55 L130 55 L135 170 Q135 180 125 180 L75 180 Q65 180 65 170 Z" fill="url(#pf)" />
          <rect x="80" y="105" width="40" height="32" rx="2" fill="#fff" opacity="0.85" />
          <text x="100" y="120" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1e293b">BAZAM</text>
          <text x="100" y="131" textAnchor="middle" fontSize="6" fontWeight="700" fill="#475569">EAU DE PARFUM</text>
        </svg>
      );

    case "dress":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="dr" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ec4899" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <path d="M70 30 L85 30 Q90 30 90 35 Q90 45 100 45 Q110 45 110 35 Q110 30 115 30 L130 30 L145 60 L130 75 L130 175 Q130 180 125 180 L75 180 Q70 180 70 175 L70 75 L55 60 Z" fill="url(#dr)" />
          <line x1="100" y1="60" x2="100" y2="175" stroke="#fff" strokeWidth="1" opacity="0.3" />
          <circle cx="100" cy="90" r="2.5" fill="#fff" />
          <circle cx="100" cy="110" r="2.5" fill="#fff" />
          <circle cx="100" cy="130" r="2.5" fill="#fff" />
        </svg>
      );

    case "blender":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <rect x="60" y="135" width="80" height="40" rx="6" fill="#334155" />
          <rect x="68" y="35" width="64" height="100" rx="4" fill="#e2e8f0" />
          <rect x="68" y="35" width="64" height="100" rx="4" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="100" cy="95" r="14" fill="#cbd5e1" />
          <path d="M86 95 L114 95 M100 81 L100 109" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="75" cy="155" r="5" fill="#6366f1" />
          <rect x="90" y="150" width="40" height="10" rx="2" fill="#1e293b" />
          <rect x="94" y="153" width="32" height="2" rx="1" fill="#10b981" />
        </svg>
      );

    case "console":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <rect x="20" y="70" width="180" height="60" rx="6" fill="#1e293b" />
          <rect x="20" y="70" width="180" height="8" fill="#6366f1" />
          <rect x="40" y="92" width="50" height="22" rx="2" fill="#020617" stroke="#475569" />
          <circle cx="160" cy="103" r="6" fill="#10b981" />
          <circle cx="180" cy="103" r="6" fill="#ef4444" />
          <rect x="20" y="130" width="180" height="14" rx="2" fill="#334155" />
        </svg>
      );

    case "laptop":
      return (
        <svg viewBox="0 0 240 200" className={cls} fill="none">
          <defs>
            <linearGradient id="lt-s" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#312e81" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect x="40" y="35" width="160" height="105" rx="8" fill="#1e293b" />
          <rect x="48" y="43" width="144" height="89" rx="3" fill="url(#lt-s)" />
          <rect x="60" y="60" width="50" height="5" rx="1" fill="#fff" opacity="0.6" />
          <rect x="60" y="72" width="80" height="5" rx="1" fill="#fff" opacity="0.4" />
          <rect x="60" y="90" width="60" height="30" rx="2" fill="#fff" opacity="0.2" />
          <rect x="20" y="138" width="200" height="14" rx="3" fill="#334155" />
          <rect x="100" y="138" width="40" height="5" rx="2" fill="#1e293b" />
        </svg>
      );

    case "iron":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <path d="M30 130 Q30 70 100 70 L170 70 Q190 70 190 90 L190 110 L30 130 Z" fill="#6366f1" />
          <path d="M30 130 L190 110 L190 125 Q190 135 180 135 L40 145 Q30 145 30 138 Z" fill="#4338ca" />
          <rect x="60" y="50" width="80" height="22" rx="11" fill="#1e293b" />
          <rect x="80" y="40" width="40" height="14" rx="7" fill="#334155" />
          <circle cx="155" cy="115" r="3" fill="#10b981" />
          <circle cx="135" cy="118" r="3" fill="#fbbf24" />
        </svg>
      );

    case "pan":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <rect x="180" y="105" width="30" height="8" rx="3" fill="#92400e" />
          <ellipse cx="100" cy="110" rx="80" ry="14" fill="#1e293b" />
          <path d="M20 110 L25 150 Q25 160 35 162 L165 162 Q175 160 175 150 L180 110 Z" fill="#0f172a" />
          <ellipse cx="100" cy="110" rx="70" ry="10" fill="#020617" />
          <ellipse cx="100" cy="108" rx="55" ry="6" fill="#334155" opacity="0.4" />
        </svg>
      );

    case "sofa":
      return (
        <svg viewBox="0 0 240 200" className={cls} fill="none">
          <rect x="20" y="80" width="200" height="60" rx="12" fill="#10b981" />
          <rect x="20" y="60" width="40" height="80" rx="10" fill="#059669" />
          <rect x="180" y="60" width="40" height="80" rx="10" fill="#059669" />
          <rect x="60" y="90" width="60" height="40" rx="6" fill="#34d399" />
          <rect x="125" y="90" width="60" height="40" rx="6" fill="#34d399" />
          <rect x="40" y="140" width="14" height="20" rx="3" fill="#0f172a" />
          <rect x="186" y="140" width="14" height="20" rx="3" fill="#0f172a" />
        </svg>
      );

    case "bag":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#92400e" />
              <stop offset="1" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <path d="M70 60 Q70 35 100 35 Q130 35 130 60" stroke="#1e293b" strokeWidth="6" fill="none" />
          <rect x="50" y="60" width="100" height="110" rx="14" fill="url(#bg)" />
          <rect x="50" y="80" width="100" height="4" fill="#1e293b" />
          <circle cx="100" cy="120" r="14" fill="#fbbf24" />
          <text x="100" y="125" textAnchor="middle" fontSize="11" fontWeight="900" fill="#1e293b">B</text>
        </svg>
      );

    case "lipstick":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="lp" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#ec4899" />
              <stop offset="1" stopColor="#9d174d" />
            </linearGradient>
          </defs>
          <path d="M82 30 L118 30 L114 80 L86 80 Z" fill="url(#lp)" />
          <rect x="78" y="78" width="44" height="20" rx="3" fill="#0f172a" />
          <rect x="76" y="98" width="48" height="80" rx="4" fill="#1e293b" />
          <rect x="84" y="108" width="32" height="4" rx="1" fill="#ec4899" />
          <rect x="84" y="118" width="32" height="3" rx="1" fill="#fff" opacity="0.5" />
          <text x="100" y="155" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">BAZAM</text>
        </svg>
      );

    case "fan":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <circle cx="100" cy="90" r="60" fill="#334155" opacity="0.3" stroke="#334155" strokeWidth="3" />
          <ellipse cx="100" cy="60" rx="14" ry="32" fill="#6366f1" />
          <ellipse cx="129" cy="105" rx="32" ry="14" fill="#6366f1" transform="rotate(60 129 105)" />
          <ellipse cx="71" cy="105" rx="32" ry="14" fill="#6366f1" transform="rotate(-60 71 105)" />
          <circle cx="100" cy="90" r="12" fill="#0f172a" />
          <rect x="95" y="150" width="10" height="20" fill="#0f172a" />
          <rect x="75" y="170" width="50" height="8" rx="3" fill="#1e293b" />
        </svg>
      );

    case "vacuum":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <circle cx="100" cy="110" r="60" fill="#0f172a" />
          <circle cx="100" cy="110" r="60" fill="none" stroke="#475569" strokeWidth="2" />
          <circle cx="100" cy="110" r="42" fill="#1e293b" />
          <circle cx="100" cy="110" r="20" fill="#020617" />
          <circle cx="92" cy="103" r="5" fill="#6366f1" />
          <circle cx="108" cy="103" r="5" fill="#10b981" />
          <rect x="80" y="155" width="40" height="6" rx="2" fill="#334155" />
        </svg>
      );

    case "kindle":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <rect x="50" y="20" width="100" height="160" rx="8" fill="#0f172a" />
          <rect x="58" y="28" width="84" height="130" rx="3" fill="#f1f5f9" />
          <rect x="66" y="42" width="68" height="4" rx="1" fill="#1e293b" />
          <rect x="66" y="52" width="50" height="3" rx="1" fill="#475569" />
          <rect x="66" y="60" width="60" height="3" rx="1" fill="#475569" />
          <rect x="66" y="68" width="56" height="3" rx="1" fill="#475569" />
          <rect x="66" y="80" width="68" height="3" rx="1" fill="#475569" />
          <rect x="66" y="88" width="58" height="3" rx="1" fill="#475569" />
          <rect x="66" y="96" width="62" height="3" rx="1" fill="#475569" />
          <rect x="66" y="108" width="40" height="3" rx="1" fill="#475569" />
          <circle cx="100" cy="170" r="3" fill="#475569" />
        </svg>
      );

    case "drone":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <rect x="80" y="85" width="60" height="30" rx="8" fill="#1e293b" />
          <circle cx="40" cy="60" r="24" fill="#334155" opacity="0.35" stroke="#334155" strokeWidth="2" />
          <circle cx="180" cy="60" r="24" fill="#334155" opacity="0.35" stroke="#334155" strokeWidth="2" />
          <circle cx="40" cy="140" r="24" fill="#334155" opacity="0.35" stroke="#334155" strokeWidth="2" />
          <circle cx="180" cy="140" r="24" fill="#334155" opacity="0.35" stroke="#334155" strokeWidth="2" />
          <line x1="60" y1="80" x2="90" y2="95" stroke="#0f172a" strokeWidth="4" />
          <line x1="160" y1="80" x2="130" y2="95" stroke="#0f172a" strokeWidth="4" />
          <line x1="60" y1="125" x2="90" y2="110" stroke="#0f172a" strokeWidth="4" />
          <line x1="160" y1="125" x2="130" y2="110" stroke="#0f172a" strokeWidth="4" />
          <circle cx="40" cy="60" r="3" fill="#10b981" />
          <circle cx="180" cy="60" r="3" fill="#ef4444" />
          <circle cx="110" cy="100" r="6" fill="#6366f1" />
        </svg>
      );

    case "skincare":
      return (
        <svg viewBox="0 0 200 200" className={cls} fill="none">
          <defs>
            <linearGradient id="sk" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#fce7f3" />
            </linearGradient>
          </defs>
          <rect x="60" y="40" width="80" height="140" rx="10" fill="url(#sk)" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="80" y="20" width="40" height="22" rx="4" fill="#0f172a" />
          <rect x="75" y="80" width="50" height="40" rx="3" fill="#ec4899" />
          <text x="100" y="100" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff">BAZAM</text>
          <text x="100" y="113" textAnchor="middle" fontSize="6" fontWeight="700" fill="#fff" opacity="0.8">VITAMIN C</text>
          <rect x="75" y="130" width="50" height="2" rx="1" fill="#cbd5e1" />
          <rect x="75" y="138" width="34" height="2" rx="1" fill="#cbd5e1" />
        </svg>
      );

    case "tshirt":
      return (
        <svg viewBox="0 0 220 200" className={cls} fill="none">
          <defs>
            <linearGradient id="ts" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#6366f1" />
              <stop offset="1" stopColor="#4338ca" />
            </linearGradient>
          </defs>
          <path d="M70 40 L90 30 Q110 45 130 30 L150 40 L180 60 L165 85 L150 80 L150 170 L70 170 L70 80 L55 85 L40 60 Z" fill="url(#ts)" />
          <path d="M90 30 Q110 50 130 30" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
          <text x="110" y="120" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff" opacity="0.95">BZM</text>
        </svg>
      );

    default:
      return null;
  }
}
