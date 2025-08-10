/**
 * InfoBar.tsx
 * Compact bar that highlights service times and address below the hero.
 */

import React from "react"
import { MapPin, Clock3 } from "lucide-react"

/**
 * InfoBar
 * Displays quick-reference service times and location.
 */
const InfoBar: React.FC = () => {
  return (
    <section className="w-full bg-[#0A2342] text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 grid gap-3 md:grid-cols-2">
        <div className="flex items-center gap-3">
          <Clock3 className="text-white/80" />
          <div>
            <div className="text-sm uppercase tracking-wide text-white/70">Service Times</div>
            <div className="font-medium">Sabbath Worship: Sat 9:00 AM • Midweek: Wed 6:00 PM</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-white/80" />
          <div>
            <div className="text-sm uppercase tracking-wide text-white/70">Address</div>
            <div className="font-medium">Makilas, [Your City / Region]</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoBar
