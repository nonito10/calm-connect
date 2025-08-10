/**
 * Home.tsx
 * Composes the main one-page experience: Hero, Info bar, Devotional & Search, Hymns, Videos, Events, Connect, and Give.
 */

import React from "react"
import Navbar from "../components/Navbar"
import Landing from "../sections/Landing"
import InfoBar from "../sections/InfoBar"
import DevotionalSearch from "../sections/DevotionalSearch"
import HymnsSection from "../sections/Hymns"
import VideosSection from "../sections/Videos"
import EventsSection from "../sections/Events"
import ConnectSection from "../sections/Connect"
import GiveSection from "../sections/Give"
import Logo from "../components/Logo"

/**
 * HomePage
 * Renders the composed landing and content sections for the public site.
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#0A2342]">
      <Navbar />
      <Landing />
      <InfoBar />

      {/* Anchor for "Getting Started" button to scroll to */}
      <div id="home-start" />

      {/* Main content sections */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-16 md:space-y-24">
        <DevotionalSearch />
        <HymnsSection />
        <VideosSection />
        <EventsSection />
        <ConnectSection />
        <GiveSection />
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-[#0A2342] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size={28} />
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} Seventh-day Adventist Church Makilas. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
