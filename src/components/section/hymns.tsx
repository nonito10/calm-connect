/**
 * Hymns.tsx
 * Grid of public-domain hymns with lyrics modal for each selection.
 */

import React, { useState } from "react"
import SectionHeader from "../components/SectionHeader"
import { hymns } from "../data/hymns"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Music } from "lucide-react"

/**
 * HymnsSection
 * Displays hymn cards with a modal for full lyrics.
 */
const HymnsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="ministries" className="scroll-mt-20">
      <SectionHeader
        title="Worship in Song"
        subtitle="Explore favorite hymns—open a hymn to read the full lyrics."
      />
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {hymns.map((h, idx) => (
          <Card key={h.number} className="border-slate-200 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="text-[#0A2342]" />
                {h.number}. {h.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-end">
              <Button
                variant="outline"
                className="bg-transparent border-[#0A2342]/20 text-[#0A2342] hover:bg-[#0A2342]/5"
                onClick={() => setOpenIndex(idx)}
              >
                View Lyrics
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lyrics Dialog */}
      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl">
          {openIndex !== null && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {hymns[openIndex].number}. {hymns[openIndex].title}
                </DialogTitle>
              </DialogHeader>
              <pre className="whitespace-pre-wrap text-slate-800 text-sm leading-6">
                {hymns[openIndex].lyrics}
              </pre>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default HymnsSection
