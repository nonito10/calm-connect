/**
 * Videos.tsx
 * Simple video gallery that swaps thumbnails for embedded YouTube players on click.
 */

import React, { useState } from "react"
import SectionHeader from "../components/SectionHeader"
import { Play } from "lucide-react"

/**
 * VideoItem
 * Represents a video entry with YouTube id and title.
 */
interface VideoItem {
  id: string
  title: string
}

/**
 * VideosSection
 * Renders a grid of worship and praise videos.
 */
const VideosSection: React.FC = () => {
  const items: VideoItem[] = [
    { id: "iJCV_2H9xD0", title: "What a Beautiful Name" },
    { id: "lE6RYpe9IT0", title: "Amazing Grace (My Chains Are Gone)" },
    { id: "hRd0MRE7I8A", title: "How Great Thou Art (Instrumental)" },
  ]

  const [playing, setPlaying] = useState<string | null>(null)

  return (
    <section id="sermons" className="scroll-mt-20">
      <SectionHeader
        title="Worship & Praise"
        subtitle="Watch worship songs and special music. Click a thumbnail to play."
      />
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        {items.map((v) => (
          <div key={v.id} className="rounded-md overflow-hidden border bg-white">
            {playing === v.id ? (
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                  title={v.title}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                className="relative group w-full"
                onClick={() => setPlaying(v.id)}
                aria-label={`Play ${v.title}`}
              >
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-white/90 text-[#0A2342] px-3 py-2 rounded-md shadow">
                    <Play />
                    <span className="font-medium">Play</span>
                  </div>
                </div>
              </button>
            )}
            <div className="p-3 text-sm font-medium">{v.title}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VideosSection
