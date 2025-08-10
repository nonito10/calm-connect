/**
 * DevotionalSearch.tsx
 * Section showing today's devotional and a combined Bible/quote search with graceful fallbacks.
 */

import React, { useMemo, useState } from "react"
import SectionHeader from "../components/SectionHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, BookOpenText, Loader2 } from "lucide-react"
import { getTodaysDevotional, searchLocal, Devotional } from "../data/devotionals"

/**
 * BibleApiVerse
 * Single verse shape from bible-api.com.
 */
interface BibleApiVerse {
  book_name: string
  chapter: number
  verse: number
  text: string
}

/**
 * BibleApiResponse
 * API envelope for bible-api.com lookup.
 */
interface BibleApiResponse {
  reference: string
  verses: BibleApiVerse[]
  text?: string
  error?: string
  translation?: string
}

/**
 * ResultItem
 * Union of a local devotional or a Bible verse result.
 */
type ResultItem =
  | { kind: "local"; item: Devotional }
  | { kind: "bible"; item: BibleApiVerse; reference: string }

/**
 * DevotionalSearch
 * Renders the devotional card and the search UI with results.
 */
const DevotionalSearch: React.FC = () => {
  const today = useMemo(() => getTodaysDevotional(), [])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ResultItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  /** Execute search across Bible API and local curated content */
  const onSearch = async () => {
    const q = query.trim()
    if (q.length < 2) {
      setResults(null)
      setError("Please enter at least 2 characters.")
      return
    }

    setError(null)
    setLoading(true)

    const local = searchLocal(q).map((d) => ({ kind: "local", item: d } as ResultItem))

    // Attempt Bible API lookup (supports references and keyword; keyword may be limited)
    let bible: ResultItem[] = []
    try {
      const url = `https://bible-api.com/${encodeURIComponent(q)}?translation=kjv`
      const res = await fetch(url, { headers: { Accept: "application/json" } })
      if (res.ok) {
        const data = (await res.json()) as BibleApiResponse
        if (!data.error && Array.isArray(data.verses) && data.verses.length > 0) {
          bible = data.verses.map(
            (v) =>
              ({
                kind: "bible",
                item: v,
                reference: `${v.book_name} ${v.chapter}:${v.verse}`,
              } as ResultItem),
          )
        }
      }
    } catch {
      // Network or CORS issue - ignore; we'll show local results and a message
    }

    const combined = [...bible, ...local]
    setResults(combined.length ? combined : [])
    if (!combined.length) {
      setError(
        "No results found. Try a verse reference like “John 3:16” or a keyword like “faith”.",
      )
    }
    setLoading(false)
  }

  return (
    <section id="devotionals" className="scroll-mt-20">
      <SectionHeader
        title="A Moment of Reflection"
        subtitle="Daily devotional thoughts and a simple search for Bible verses or inspirational quotes."
      />
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        {/* Today's Devotional */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenText className="text-[#0A2342]" />
              Today’s Devotional
            </CardTitle>
            <CardDescription className="text-slate-600">{today.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-800 leading-relaxed">{today.content}</p>
            <p className="mt-3 text-sm text-slate-500">— {today.source}</p>
          </CardContent>
        </Card>

        {/* Search */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="text-[#0A2342]" />
              Search Scripture or Quotes
            </CardTitle>
            <CardDescription className="text-slate-600">
              Search for a Bible verse, quote, or message of inspiration.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder='Try "John 3:16" or "peace"'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch()
                }}
              />
              <Button onClick={onSearch} className="bg-[#0A2342] hover:bg-[#0A2342]/90">
                {loading ? <Loader2 className="animate-spin" /> : "Search"}
              </Button>
            </div>

            {/* Results */}
            <div className="mt-4 space-y-3">
              {error && <div className="text-sm text-red-600">{error}</div>}
              {!loading && results?.length === 0 && (
                <div className="text-sm text-slate-600">
                  No results. Please try a different query.
                </div>
              )}
              {results?.length ? (
                <ul className="space-y-3">
                  {results.map((r, i) =>
                    r.kind === "bible" ? (
                      <li key={`b-${i}`} className="p-3 rounded-md border bg-white">
                        <div className="text-xs text-slate-500">{r.reference} (KJV)</div>
                        <div className="mt-1">{r.item.text.trim()}</div>
                      </li>
                    ) : (
                      <li key={`l-${i}`} className="p-3 rounded-md border bg-white">
                        <div className="font-medium">{r.item.title}</div>
                        <div className="text-slate-700 mt-1">{r.item.content}</div>
                        <div className="text-xs text-slate-500 mt-2">— {r.item.source}</div>
                      </li>
                    ),
                  )}
                </ul>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default DevotionalSearch
