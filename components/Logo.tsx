'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface LogoProps {
  /**
   * Logo image path.
   * Defaults to '/logo.png' (and supports '/logo.svg').
   */
  src?: string;
  /** Width of the logo image in pixels (default: 38) */
  width?: number;
  /** Height of the logo image in pixels (default: 38, within 36px-40px range) */
  height?: number;
  /** Custom classes for the outer wrapper */
  className?: string;
  /** Custom classes for the image element */
  imageClassName?: string;
  /** Custom classes for the brand text */
  textClassName?: string;
  /** Brand text to display alongside the logo (default: 'Remath') */
  brandName?: string;
  /** Whether to render the brand name text alongside the logo image */
  showText?: boolean;
  /** Navigation destination when clicked (default: '/') */
  href?: string;
  /** Prioritize image loading for above-the-fold navbar (default: true) */
  priority?: boolean;
}

export default function Logo({
  src = '/logo.png',
  width = 38,
  height = 38,
  className = '',
  imageClassName = '',
  textClassName = '',
  brandName = 'Remath',
  showText = true,
  href = '/',
  priority = true,
}: LogoProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const logoContent = (
    <div className={`flex items-center gap-2.5 sm:gap-3 group ${className}`}>
      {/* Logo Image */}
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src={imgSrc}
          alt={`${brandName} Logo`}
          width={width}
          height={height}
          priority={priority}
          className={`h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-200 group-hover:scale-105 ${imageClassName}`}
          onError={() => {
            // Automatic fallback between /logo.png and /logo.svg if needed
            if (imgSrc === '/logo.png') {
              setImgSrc('/logo.svg');
            } else if (imgSrc === '/logo.svg') {
              setImgSrc('/logo.png');
            }
          }}
        />
      </div>

      {/* Brand Name */}
      {showText && (
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-200 ${textClassName}`}
        >
          {brandName}
        </span>
      )}
    </div>
  );

  // Requirement 4: Ensure clicking the logo and brand name navigates back to homepage (/)
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
