'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type LogoVariant = 'icon' | 'full';
export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  /**
   * Logo display variant:
   * - 'full': Logo icon alongside styled brand typography
   * - 'icon': Logo icon symbol only
   * @default 'full'
   */
  variant?: LogoVariant;
  /**
   * Size scale for the logo:
   * - 'sm': compact size for footers and mobile viewports
   * - 'md': standard size for navbars and headers
   * - 'lg': large prominent size for auth pages, landing, hero sections
   * @default 'md'
   */
  size?: LogoSize;
  /** Custom classes for the outer wrapper */
  className?: string;
  /** Custom classes for the image element */
  imageClassName?: string;
  /** Custom classes for the brand typography */
  textClassName?: string;
  /** Brand text to display alongside the logo (default: 'ReMath') */
  brandName?: string;
  /** Navigation destination when clicked (default: '/') */
  href?: string;
  /** Prioritize image loading for above-the-fold elements (default: true) */
  priority?: boolean;
  /** Custom logo source path override (defaults to '/logo.svg') */
  src?: string;
}

const SIZE_CONFIG: Record<
  LogoSize,
  {
    iconWidth: number;
    iconHeight: number;
    imageClass: string;
    textClass: string;
    gapClass: string;
  }
> = {
  sm: {
    iconWidth: 26,
    iconHeight: 30,
    imageClass: 'h-7 w-auto',
    textClass: 'text-base sm:text-lg font-bold',
    gapClass: 'gap-2',
  },
  md: {
    iconWidth: 32,
    iconHeight: 36,
    imageClass: 'h-8 sm:h-9 w-auto',
    textClass: 'text-lg sm:text-xl font-extrabold',
    gapClass: 'gap-2.5 sm:gap-3',
  },
  lg: {
    iconWidth: 42,
    iconHeight: 48,
    imageClass: 'h-10 sm:h-12 w-auto',
    textClass: 'text-2xl sm:text-3xl font-extrabold',
    gapClass: 'gap-3 sm:gap-3.5',
  },
};

export default function Logo({
  variant = 'full',
  size = 'md',
  className = '',
  imageClassName = '',
  textClassName = '',
  brandName = 'ReMath',
  href = '/',
  priority = true,
  src,
}: LogoProps) {
  const initialSrc = src || '/logo.svg';
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const sizeConfig = SIZE_CONFIG[size] || SIZE_CONFIG.md;

  const logoContent = (
    <div
      className={`inline-flex items-center ${
        variant === 'full' ? sizeConfig.gapClass : ''
      } group select-none ${className}`}
    >
      {/* Crisp vector icon without blend/invert filters */}
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src={imgSrc}
          alt={`${brandName} Logo`}
          width={sizeConfig.iconWidth}
          height={sizeConfig.iconHeight}
          priority={priority}
          className={`object-contain transition-transform duration-200 group-hover:scale-105 ${sizeConfig.imageClass} ${imageClassName}`}
          onError={() => {
            // Automatic fallback between /logo.svg and /logo.png
            if (imgSrc === '/logo.svg') {
              setImgSrc('/logo.png');
            } else if (imgSrc === '/logo.png') {
              setImgSrc('/logo.svg');
            }
          }}
        />
      </div>

      {/* Styled brand typography for 'full' variant */}
      {variant === 'full' && (
        <span
          className={`tracking-tight text-slate-900 dark:text-white transition-colors duration-200 ${sizeConfig.textClass} ${textClassName}`}
        >
          {brandName}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
        aria-label={`${brandName} - Homepage`}
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
