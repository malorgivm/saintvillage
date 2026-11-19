'use client'

import { useState, useSyncExternalStore } from 'react'
import { useJogo } from '@/lib/game/store'
import { Abertura } from './abertura'
import { CriarFicha } from './criar-ficha'
import { Mesa } from './mesa'
import { SoundtrackPlayer } from './soundtrack-player'

const nada = () => () => {}

export function GameRoot() {
  const hidratado = useSyncExternalStore(nada, () => true, () => false)
  const investigador = useJogo((s) => s.investigador)
  const [criando, setCriando] = useState(false)

  if (!hidratado) return <main className="min-h-dvh bg-background" aria-busy="true" />

  return (
    <>
      {investigador ? <Mesa /> : criando ? <CriarFicha onVoltar={() => setCriando(false)} /> : <Abertura onCriar={() => setCriando(true)} />}
      <SoundtrackPlayer />
    </>
  )
}
