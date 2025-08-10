/**
 * Connect.tsx
 * Get Connected cards for Small Groups, Prayer Requests, Volunteer, and Give.
 */

import React from "react"
import SectionHeader from "../components/SectionHeader"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Users, HandHeart, HeartHandshake, Gift } from "lucide-react"

/**
 * ConnectSection
 * Displays a set of actionable connection cards.
 */
const ConnectSection: React.FC = () => {
  const items = [
    {
      title: "Join a Small Group",
      icon: Users,
      desc:
        "Find community during the week with a small group for study, prayer, and fellowship.",
      cta: "Explore Groups",
      href: "#about",
    },
    {
      title: "Submit a Prayer Request",
      icon: HandHeart,
      desc: "Let us pray for you. Share your request confidentially with our prayer team.",
      cta: "Request Prayer",
      href: "#im-new",
    },
    {
      title: "Volunteer with a Ministry",
      icon: HeartHandshake,
      desc: "Use your gifts to serve—children, youth, music, hospitality, and more.",
      cta: "Volunteer",
      href: "#ministries",
    },
    {
      title: "Support the Mission",
      icon: Gift,
      desc: "Your generosity advances ministry in Makilas and beyond.",
      cta: "Give Now",
      href: "#give",
    },
  ] as const

  return (
    <section id="im-new" className="scroll-mt-20">
      <SectionHeader
        title="Get Connected"
        subtitle="Take a next step—connect, grow, and serve."
      />
      <div className="grid gap-6 md:grid-cols-4 mt-6">
        {items.map((it) => (
          <Card key={it.title} className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <it.icon className="text-[#0A2342]" />
                {it.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{it.desc}</p>
              <a href={it.href}>
                <Button
                  variant="outline"
                  className="bg-transparent mt-4 border-[#0A2342]/20 text-[#0A2342] hover:bg-[#0A2342]/5"
                >
                  {it.cta}
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default ConnectSection
