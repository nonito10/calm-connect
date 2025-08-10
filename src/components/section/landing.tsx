/**
 * Landing.tsx
 * Fullscreen hero with looping video background, animated headline, and CTA to scroll down.
 */

import React, { useEffect, useState } from "react"
import { Button } from "../components/ui/button"

/**
 * Landing
 * Renders the immersive landing screen with background video and welcome content.
 */
const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  /** Enable entrance animation after mount */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  /** Scroll into main content */
  const handleStart = () => {
    const el = document.getElementById("home-start")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section id="home" className="relative h-[100dvh] w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          poster="https://pub-cdn.sider.ai/u/U07GH2WG5OR/web-coder/68980a1214f019f2a841c543/resource/a18db367-f263-4514-bdbd-cfaab6df1a22.jpg"
        >
          <source src="https://cdn.coverr.co/videos/coverr-church-sunlight-6123/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A2342] to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-5xl mx-auto flex flex-col items-center justify-center px-6 text-center">
        <h1
          className={`text-white font-semibold tracking-tight ${
            mounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"
          } transition-all duration-700 text-3xl md:text-5xl`}
        >
          Welcome To Seventh-day Adventist Church Makilas
        </h1>
        <p
          className={`mt-4 text-white/90 max-w-2xl ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          } transition-all duration-700 delay-100`}
        >
          A place of faith, community, and hope.
        </p>
        <div
          className={`mt-8 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          } transition-all duration-700 delay-200`}
        >
          <Button
            size="lg"
            className="bg-white text-[#0A2342] hover:bg-white/90 rounded-md shadow-md px-7"
            onClick={handleStart}
          >
            Getting Started
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Landing
