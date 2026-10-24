import type { SVGProps } from "react";

interface EGenTekMarkProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Official EGenTek geometric 3D folded blue 'E' logo mark.
 * Rendered as an accessible, crisp SVG vector.
 */
export function EGenTekMark({ className = "size-8", ...props }: EGenTekMarkProps) {
  return (
    <svg
      viewBox="112 126 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EGenTek logo mark"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="egentek-mark-top" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#0648E8" />
          <stop offset="0.55" stopColor="#087BFA" />
          <stop offset="1" stopColor="#08C7E8" />
        </linearGradient>
        <linearGradient id="egentek-mark-bottom" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#063CE5" />
          <stop offset="0.55" stopColor="#087BFA" />
          <stop offset="1" stopColor="#08C5E7" />
        </linearGradient>
        <linearGradient id="egentek-mark-middle" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0" stopColor="#0750E9" />
          <stop offset="1" stopColor="#08C6E8" />
        </linearGradient>
        <linearGradient id="egentek-mark-leftTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#08B8F0" />
          <stop offset="1" stopColor="#0875F2" />
        </linearGradient>
        <linearGradient id="egentek-mark-leftBottom" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0756EF" />
          <stop offset="1" stopColor="#0638D9" />
        </linearGradient>
      </defs>

      {/* Upper arm of the folded geometric E */}
      <path
        d="M300 430 L824 183 Q842 174 859 183 L929 223 Q947 233 947 253 L947 344 Q947 362 930 371 L485 586 L300 496 Z"
        fill="url(#egentek-mark-top)"
      />

      {/* Faceted left spine: two folded triangular planes */}
      <path d="M300 430 L485 536 L485 711 L300 817 Z" fill="url(#egentek-mark-leftTop)" />
      <path d="M300 711 L485 817 L485 922 L300 894 Z" fill="url(#egentek-mark-leftBottom)" />

      {/* Central arm */}
      <path
        d="M560 638 L857 509 Q873 502 885 514 Q891 520 891 534 L891 655 Q891 671 876 678 L626 772 Q610 778 596 770 L575 758 Q560 750 560 733 Z"
        fill="url(#egentek-mark-middle)"
      />

      {/* Lower arm */}
      <path
        d="M300 711 L660 884 L824 800 Q842 791 859 800 L929 840 Q947 850 947 870 L947 949 Q947 967 930 976 L680 1093 Q662 1101 645 1092 L319 929 Q300 919 300 898 Z"
        fill="url(#egentek-mark-bottom)"
      />

      {/* Subtle planar facets that create the folded, dimensional character */}
      <path d="M300 430 L485 536 L485 586 L300 496 Z" fill="#12C5F1" opacity="0.58" />
      <path d="M300 711 L485 817 L485 922 L300 894 Z" fill="#063BD9" opacity="0.28" />
      <path
        d="M660 884 L824 800 Q842 791 859 800 L947 850 L680 976 Z"
        fill="#08D1E9"
        opacity="0.18"
      />
    </svg>
  );
}
