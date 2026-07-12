"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"

/* ============================================================================
   Raining-letters hero (Matrix style) with a scrambling headline.
   Source: 21st.dev "modern-animated-hero-section", themed to Mowtrix emerald
   and made configurable + reduced-motion safe.

   ⬇️ TO CHANGE THE HEADLINE TEXT: edit DEFAULT_PHRASES below, or pass a
      `phrases={[...]}` prop where <RainingLetters /> is used (see Hero.tsx).
   ============================================================================ */

export const DEFAULT_PHRASES = [
  "MOWTRIX",
  "ENGINEERED TO RANK",
  "FOUND FIRST ON GOOGLE",
  "RECOMMENDED BY AI",
  "SEO · AEO · GEO",
]

interface Character {
  char: string
  x: number
  y: number
  speed: number
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduced
}

class TextScramble {
  el: HTMLElement
  chars: string
  queue: Array<{
    from: string
    to: string
    start: number
    end: number
    char?: string
  }>
  frame: number
  frameRequest: number
  resolve: (value: void | PromiseLike<void>) => void
  /** The latest target text. Tracked internally so we never read half-scrambled
      innerText or fall back on a stale ref when scrolling quickly. */
  currentText: string
  /** True only while a full setText transition is animating. Idle glitches must
      never run during this window or they freeze the title on wrong text. */
  scrambling: boolean

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#"
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
    this.resolve = () => {}
    this.currentText = el.innerText || ""
    this.scrambling = false
    this.update = this.update.bind(this)
  }

  setText(newText: string) {
    const oldText = this.currentText
    this.currentText = newText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => (this.resolve = resolve))
    this.queue = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      // 2× longer scramble duration
      const start = Math.floor(Math.random() * 80)
      const end = start + Math.floor(Math.random() * 80)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.scrambling = true
    this.update()
    return promise
  }

  /** Briefly glitch a random subset of chars, then restore. No-op if a real
      transition is in flight, so fast scrolling can't be interrupted. */
  idleGlitch() {
    if (this.scrambling) return
    const settledText = this.currentText
    const len = settledText.length
    if (len === 0) return
    const count = 1 + Math.floor(Math.random() * 2)
    const picks = new Set<number>()
    while (picks.size < Math.min(count, len)) {
      const i = Math.floor(Math.random() * len)
      // avoid spaces
      if (settledText[i] !== " ") picks.add(i)
    }
    this.queue = []
    for (let i = 0; i < len; i++) {
      const ch = settledText[i] || ""
      const glitch = picks.has(i)
      this.queue.push({
        from: ch,
        to: ch,
        start: 0,
        end: glitch ? 8 + Math.floor(Math.random() * 10) : 0,
      })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
  }

  update() {
    let output = ""
    let complete = 0

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.scrambling = false
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
}

/**
 * Text that scrambles itself in whenever `text` changes. Drive it from
 * scroll state (or anything else) — each new value glitches into place.
 * Under reduced motion the text just swaps instantly.
 */
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const scramblerRef = useRef<TextScramble | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = text;
      return;
    }
    if (!scramblerRef.current) scramblerRef.current = new TextScramble(el);
    const scrambler = scramblerRef.current;

    let cancelled = false;
    let idleTimer: ReturnType<typeof setTimeout>;

    // Only arm the idle glitch loop once the headline has fully settled, so a
    // glitch can never fire mid-transition. Re-armed on every text change.
    const scheduleIdle = () => {
      idleTimer = setTimeout(() => {
        if (cancelled) return;
        scrambler.idleGlitch();
        scheduleIdle();
      }, 3000 + Math.random() * 5000);
    };

    scrambler.setText(text).then(() => {
      if (!cancelled) scheduleIdle();
    });

    return () => {
      cancelled = true;
      clearTimeout(idleTimer);
      cancelAnimationFrame(scrambler.frameRequest);
    };
  }, [text, reduced]);

  return <span ref={ref} className={className} aria-label={text} role="text" />;
}

const ScrambledTitle: React.FC<{ phrases: string[]; reduced: boolean }> = ({
  phrases,
  reduced,
}) => {
  const elementRef = useRef<HTMLHeadingElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (elementRef.current && !scramblerRef.current) {
      scramblerRef.current = new TextScramble(elementRef.current)
      setMounted(true)
    }
  }, [])

  useEffect(() => {
    if (!mounted || reduced || !scramblerRef.current) return

    let counter = 0
    let timeout: ReturnType<typeof setTimeout>
    const next = () => {
      if (!scramblerRef.current) return
      scramblerRef.current.setText(phrases[counter]).then(() => {
        timeout = setTimeout(next, 2200)
      })
      counter = (counter + 1) % phrases.length
    }
    next()

    return () => {
      clearTimeout(timeout)
      if (scramblerRef.current) cancelAnimationFrame(scramblerRef.current.frameRequest)
    }
  }, [mounted, reduced, phrases])

  return (
    <h1
      ref={elementRef}
      className="font-mono text-4xl font-bold tracking-[0.12em] text-mist sm:text-6xl lg:text-7xl"
    >
      {phrases[0]}
    </h1>
  )
}

const RainingLetters: React.FC<{
  phrases?: string[]
  charCount?: number
  className?: string
  children?: React.ReactNode
  /** false = pure rain backdrop, no built-in cycling title */
  showTitle?: boolean
}> = ({ phrases = DEFAULT_PHRASES, charCount = 200, className = "", children, showTitle = true }) => {
  const reduced = usePrefersReducedMotion()
  const [characters, setCharacters] = useState<Character[]>([])
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())

  const createCharacters = useCallback(() => {
    const allChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const count = reduced ? Math.min(90, charCount) : charCount
    const newCharacters: Character[] = []
    for (let i = 0; i < count; i++) {
      newCharacters.push({
        char: allChars[Math.floor(Math.random() * allChars.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        speed: 0.1 + Math.random() * 0.3,
      })
    }
    return newCharacters
  }, [charCount, reduced])

  useEffect(() => {
    setCharacters(createCharacters())
  }, [createCharacters])

  // flicker — skipped for reduced motion
  useEffect(() => {
    if (reduced) return
    const updateActiveIndices = () => {
      const next = new Set<number>()
      const numActive = Math.floor(Math.random() * 3) + 3
      for (let i = 0; i < numActive; i++) {
        next.add(Math.floor(Math.random() * characters.length))
      }
      setActiveIndices(next)
    }
    const flickerInterval = setInterval(updateActiveIndices, 60)
    return () => clearInterval(flickerInterval)
  }, [characters.length, reduced])

  // falling motion — skipped for reduced motion
  useEffect(() => {
    if (reduced) return
    let animationFrameId: number
    const allChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
    const updatePositions = () => {
      setCharacters((prev) =>
        prev.map((char) => ({
          ...char,
          y: char.y + char.speed,
          ...(char.y >= 100 && {
            y: -5,
            x: Math.random() * 100,
            char: allChars[Math.floor(Math.random() * allChars.length)],
          }),
        }))
      )
      animationFrameId = requestAnimationFrame(updatePositions)
    }
    animationFrameId = requestAnimationFrame(updatePositions)
    return () => cancelAnimationFrame(animationFrameId)
  }, [reduced])

  return (
    <div
      className={`relative w-full overflow-hidden bg-void ${className}`}
    >
      {/* Title + slot */}
      {(showTitle || children) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          {showTitle && <ScrambledTitle phrases={phrases} reduced={reduced} />}
          {children}
        </div>
      )}

      {/* Raining characters */}
      {characters.map((char, index) => {
        const active = activeIndices.has(index)
        return (
          <span
            key={index}
            className={`absolute transition-colors duration-100 ${
              active
                ? "z-10 font-bold text-emerald-300"
                : "font-light text-emerald-100/20"
            }`}
            style={{
              left: `${char.x}%`,
              top: `${char.y}%`,
              transform: `translate(-50%, -50%) ${active ? "scale(1.25)" : "scale(1)"}`,
              textShadow: active
                ? "0 0 8px rgba(43,255,158,0.8), 0 0 14px rgba(43,255,158,0.4)"
                : "none",
              opacity: active ? 1 : 0.4,
              transition: "color 0.1s, transform 0.1s, text-shadow 0.1s",
              willChange: "transform, top",
              fontSize: "1.4rem",
            }}
          >
            {char.char}
          </span>
        )
      })}
    </div>
  )
}

export default RainingLetters
