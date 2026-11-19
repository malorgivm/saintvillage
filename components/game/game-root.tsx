'use client'

import { useState, useSyncExternalStore } from 'react'
import { useJogo } from '@/lib/game/store'
import { Abertura } from './abertura'
import { CriarFicha } from './criar-ficha'
import { Mesa } from './mesa'

const nada = () => () => {}

export function GameRoot() {
  const hidratado = useSyncExternalStore(nada, () => true, () => false)
  const investigador = useJogo((s) => s.investigador)
  const [criando, setCriando] = useState(false)

  if (!hidratado) return <main className="min-h-dvh bg-background" aria-busy="true" />

  if (investigador) return <Mesa />
  if (criando) return <CriarFicha onVoltar={() => setCriando(false)} />
  return <Abertura onCriar={() => setCriando(true)} />
}
