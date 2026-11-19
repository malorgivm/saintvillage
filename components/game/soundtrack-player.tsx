'use client'

import { useRef, useState } from 'react'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'

export function SoundtrackPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.35)

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  function changeVolume(value: number) {
    setVolume(value)
    if (audioRef.current) audioRef.current.volume = value
  }

  return (
    <section
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[70] ml-auto w-[min(19rem,calc(100vw-1.5rem))] border border-white/10 bg-[#0c0c0dd9] px-3 py-2.5 text-[#d4d4d4] shadow-[0_10px_30px_rgb(0_0_0_/_45%)] backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:bottom-5"
      aria-label="Trilha sonora"
    >
      <audio
        ref={audioRef}
        src="/musica/film-noir.mp3"
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-display text-[9px] uppercase tracking-[0.3em] text-white/45" aria-live="polite">
            {playing ? 'Trilha em reprodução' : 'Em pausa'}
          </p>
          <p className="truncate font-display text-sm">Film Noir <span className="text-white/45">· NoirTales</span></p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            className="inline-flex size-9 items-center justify-center text-white transition-colors hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
            aria-label={playing ? 'Pausar trilha sonora' : 'Tocar trilha sonora'}
          >
            {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4 fill-current" aria-hidden="true" />}
          </button>
          <label className="flex items-center gap-2" aria-label="Volume da trilha sonora">
            {volume === 0 ? <VolumeX className="size-4 text-white/60" aria-hidden="true" /> : <Volume2 className="size-4 text-white/60" aria-hidden="true" />}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(event) => changeVolume(Number(event.target.value))}
              className="w-16 accent-primary"
              aria-label="Volume"
            />
          </label>
        </div>
      </div>
    </section>
  )
}
