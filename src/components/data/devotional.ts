/**
 * SectionHeader.tsx
 * Reusable section header with title and optional subtitle for consistent layout.
 */

import React from "react"

/**
 * SectionHeaderProps
 * Props for the SectionHeader component.
 */
export interface SectionHeaderProps {
  /** Main title text */
  title: string
  /** Optional subtitle/lead text */
  subtitle?: string
  /** Optional id to anchor navigation */
  id?: string
  /** Optional className for wrapper */
  className?: string
}

/**
 * SectionHeader
 * Displays a semantic section header with spacing and subtle styling.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, id, className }) => {
  return (
    <div id={id} className={`space-y-2 ${className || ""}`}>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="text-slate-600">{subtitle}</p>}
    </div>
  )
}

export default SectionHeader
