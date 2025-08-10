/**
 * Give.tsx
 * Simple giving call-to-action section.
 */

import React from "react"
import SectionHeader from "../components/SectionHeader"
import { Button } from "../components/ui/button"

/**
 * GiveSection
 * Presents a brief giving invitation with a clear CTA.
 */
const GiveSection: React.FC = () => {
  return (
    <section id="give" className="scroll-mt-20">
      <SectionHeader
        title="Partner With Us in Mission"
        subtitle="Your generosity fuels ministry—thank you for giving."
      />
      <div className="mt-6 rounded-xl border bg-gradient-to-r from-[#0A2342] to-[#0F356C] text-white p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Give Tithes and Offerings</h3>
          <p className="text-white/90 mt-2 max-w-2xl">
            Give securely online via your preferred method. You can also give in person during
            services. Thank you for supporting the work of the gospel in Makilas.
          </p>
        </div>
        <a href="#give">
          <Button
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white/10"
          >
            Donate
          </Button>
        </a>
      </div>
    </section>
  )
}

export default GiveSection
