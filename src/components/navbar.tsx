/**
 * Navbar.tsx
 * Sticky, responsive navigation bar with smooth in-page scrolling links.
 */

import React, { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import Logo from "./Logo"
import { Button } from "../components/ui/button"

/**
 * NavItem
 * Represents a single navigation item.
 */
export interface NavItem {
  /** Display label */
  label: string
  /** Target section id without '#' */
  targetId: string
}

/**
 * Navbar
 * Implements a translucent sticky navbar with desktop and mobile layouts.
 */
const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /** Toggle mobile menu */
  const toggle = () => setOpen((o) => !o)

  /** Smoothly scroll to a section id if present on the page */
  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setOpen(false)
    }
  }

  /** Attach scroll listener to adjust navbar background on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const items: NavItem[] = [
    { label: "Home", targetId: "home" },
    { label: "About Us", targetId: "about" },
    { label: "I'm New", targetId: "im-new" },
    { label: "Ministries", targetId: "ministries" },
    { label: "Sermons", targetId: "sermons" },
    { label: "Devotionals", targetId: "devotionals" },
    { label: "Give", targetId: "give" },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        scrolled ? "bg-[#0A2342]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <button aria-label="Home" onClick={() => goTo("home")} className="flex items-center">
          <Logo size={28} />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-2">
          {items.map((item) => (
            <li key={item.targetId}>
              <Button
                variant="ghost"
                className="text-white/90 hover:text-white hover:bg-white/10"
                onClick={() => goTo(item.targetId)}
              >
                {item.label}
              </Button>
            </li>
          ))}
          <Button
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white/10"
            onClick={() => goTo("give")}
          >
            Donate
          </Button>
        </ul>

        {/* Mobile trigger */}
        <button
          className="md:hidden text-white/90 p-2 rounded hover:bg-white/10"
          aria-label="Menu"
          onClick={toggle}
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile drawer (simple) */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0A2342]/95 backdrop-blur-md">
          <ul className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
            {items.map((item) => (
              <li key={item.targetId}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/90 hover:text-white hover:bg-white/10"
                  onClick={() => goTo(item.targetId)}
                >
                  {item.label}
                </Button>
              </li>
            ))}
            <Button
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              onClick={() => goTo("give")}
            >
              Donate
            </Button>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
