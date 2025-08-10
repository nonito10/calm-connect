/**
 * Events.tsx
 * Lightweight calendar with Month and List views and mock events.
 */

import React, { useMemo, useState } from "react"
import SectionHeader from "../components/SectionHeader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { CalendarDays } from "lucide-react"

/**
 * EventItem
 * Represents a church event with date and metadata.
 */
interface EventItem {
  /** ISO date string yyyy-mm-dd */
  date: string
  /** Title of event */
  title: string
  /** Time or additional note */
  time?: string
  /** Description text */
  description?: string
}

/**
 * getMonthMatrix
 * Generates a 6x7 matrix of dates for the current month's calendar grid.
 */
function getMonthMatrix(year: number, month: number): (Date | null)[] {
  // Logic: build leading blanks then days of month; cap to 6*7 cells
  const first = new Date(year, month, 1)
  const startDay = first.getDay() // 0 Sun .. 6 Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = []

  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length < 42) cells.push(null)
  return cells.slice(0, 42)
}

/**
 * EventsSection
 * Renders a small calendar and list of upcoming events.
 */
const EventsSection: React.FC = () => {
  const now = new Date()
  const [active, setActive] = useState<EventItem | null>(null)

  const events: EventItem[] = [
    {
      date: new Date(now.getFullYear(), now.getMonth(), Math.min(5, 28)).toISOString().slice(0, 10),
      title: "Sabbath Worship Service",
      time: "9:00 AM",
      description: "Join us for Bible study, worship, and fellowship.",
    },
    {
      date: new Date(now.getFullYear(), now.getMonth(), Math.min(12, 28))
        .toISOString()
        .slice(0, 10),
      title: "Youth Fellowship",
      time: "3:00 PM",
      description: "Interactive Bible discussions and activities for youth.",
    },
    {
      date: new Date(now.getFullYear(), now.getMonth(), Math.min(18, 28))
        .toISOString()
        .slice(0, 10),
      title: "Midweek Prayer Meeting",
      time: "6:00 PM",
      description: "A midweek time of prayer and reflection.",
    },
  ]

  const byDate = useMemo(() => {
    const map = new Map<string, EventItem[]>()
    for (const e of events) {
      const arr = map.get(e.date) || []
      arr.push(e)
      map.set(e.date, arr)
    }
    return map
  }, [events])

  const grid = useMemo(() => getMonthMatrix(now.getFullYear(), now.getMonth()), [now])

  return (
    <section id="about" className="scroll-mt-20">
      <SectionHeader
        title="Events Calendar"
        subtitle="Stay connected—see what’s happening this month."
      />
      <Tabs defaultValue="month" className="mt-6">
        <TabsList>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        {/* Month View */}
        <TabsContent value="month" className="mt-4">
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-slate-600 py-1">
                {d}
              </div>
            ))}
            {grid.map((day, i) => {
              const key = day ? day.toISOString().slice(0, 10) : `x-${i}`
              const dayEvents = day ? byDate.get(key) : undefined
              return (
                <Card
                  key={key}
                  className={`min-h-[90px] p-2 border-slate-200 ${
                    day ? "" : "bg-slate-50"
                  }`}
                >
                  <div className="text-xs text-slate-500">{day ? day.getDate() : ""}</div>
                  <div className="mt-1 space-y-1">
                    {dayEvents?.map((e, idx) => (
                      <button
                        key={idx}
                        className="w-full text-left text-xs px-2 py-1 rounded bg-[#0A2342]/10 hover:bg-[#0A2342]/20"
                        onClick={() => setActive(e)}
                      >
                        {e.title}
                      </button>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="mt-4">
          <div className="divide-y rounded-md border">
            {events.map((e, i) => (
              <div key={i} className="p-4 flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <CalendarDays className="text-[#0A2342]" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-sm text-slate-600">
                    {new Date(e.date).toLocaleDateString()} {e.time ? `• ${e.time}` : ""}
                  </div>
                  {e.description && <div className="text-sm mt-1">{e.description}</div>}
                </div>
                <button
                  className="text-sm text-[#0A2342] underline"
                  onClick={() => setActive(e)}
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Event Details */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent>
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <div className="text-sm text-slate-600">
                  {new Date(active.date).toLocaleDateString()} {active.time ? `• ${active.time}` : ""}
                </div>
                {active.description && <p>{active.description}</p>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default EventsSection
