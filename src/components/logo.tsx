/**
 * Logo.tsx
 * Minimal, scalable inline SVG logo representing the SDA identity for use in header and sections.
 */

import React from "react"

/**
 * LogoProps
 * Props for the Logo component.
 */
export interface LogoProps {
  /** Size (width) of the icon in pixels */
  size?: number
  /** Whether to render the textual brand next to the icon */
  showText?: boolean
  /** Optional className to extend styling */
  className?: string
}

/**
 * Logo
 * Renders a minimalist open book, cross, and flame motif with optional brand text.
 */
const Logo: React.FC<LogoProps> = ({ size = 28, showText = true, className }) => {
  const gold = "#D4A017"
  const deep = "#0A2342"
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="SDA Makilas Logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Book base */}
        <path
          d="M8 44c8-6 16-6 24 0 8-6 16-6 24 0v6c-8-6-16-6-24 0-8-6-16-6-24 0v-6z"
          fill={deep}
        />
        {/* Cross */}
        <rect x="30" y="18" width="4" height="22" rx="1" fill={deep} />
        <rect x="24" y="28" width="16" height="4" rx="1" fill={deep} />
        {/* Flame */}
        <path
          d="M32 8c5 6 6 11 2 16-2.5 3-2.6 6.5-.4 9.5-6-1-9.5-7.5-5.6-13.2C30.4 17 31.5 13.2 32 8z"
          fill={gold}
        />
      </svg>
      {showText && (
        <div className="leading-tight">
          <div className="text-white text-sm md:text-base font-medium">
            Seventh-day Adventist Church
          </div>
          <div className="text-[.8rem] md:text-sm font-semibold" style={{ color: gold }}>
            Makilas
          </div>
        </div>
      )}
    </div>
  )
}

export default Logo
