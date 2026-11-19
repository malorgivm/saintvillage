'use client'

import { useState } from 'react'
import { BookOpen, LogOut } from 'lucide-react'
import { jogo } from '@/lib/game/store'
import { cn } from '@/lib/utils'
import { ComoJogar } from './como-jogar'
import { Cronica } from './cronica'
import { Janela } from './janela'
import { PainelCaso } from './painel-caso'
import { PainelFicha } from './painel-ficha'
import { useNarrador } from './use-narrador'

type Aba = 'ficha' | 'cronica' | 'caso'

export function Mesa() {
  const narrador = useNarrador()
  const [aba, setAba] = useState<Aba>('cronica')
  const [regras, setRegras] = useState(false)

  function sair() {
    if (window.confirm('Rasgar esta ficha e começar com outro investigador? A crônica atual será apagada.')) {
      jogo.reset()
    }
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-xl font-bold uppercase tracking-tight">Saint Village</span>
          <span className="font-display text-xl text-primary lamp-glow">1934</span>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => setRegras(true)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            <BookOpen className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Como jogar</span>
          </button>
          <button onClick={sair} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive">
            <LogOut className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Trocar investigador</span>
          </button>
        </div>
      </header>

      <nav className="flex border-b border-border lg:hidden" aria-label="Painéis">
        {(
          [
            ['ficha', 'Ficha'],
            ['cronica', 'Crônica'],
            ['caso', 'Caso'],
          ] as const
        ).map(([k, r]) => (
          <button
            key={k}
            onClick={() => setAba(k)}
            aria-current={aba === k}
            className={cn(
              'flex-1 py-2.5 font-display text-xs uppercase tracking-[0.25em]',
              aba === k ? 'border-b-2 border-primary text-foreground' : 'text-muted-foreground',
            )}
          >
            {r}
          </button>
        ))}
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            'scrollbar-thin w-full shrink-0 overflow-y-auto border-r border-border p-5 lg:block lg:w-72 xl:w-80',
            aba === 'ficha' ? 'block' : 'hidden',
          )}
          aria-label="Ficha do investigador"
        >
          <PainelFicha narrador={narrador} />
        </aside>

        <main className={cn('min-w-0 flex-1 flex-col lg:flex', aba === 'cronica' ? 'flex' : 'hidden')}>
          <Cronica narrador={narrador} />
        </main>

        <aside
          className={cn(
            'scrollbar-thin w-full shrink-0 overflow-y-auto border-l border-border p-5 lg:block lg:w-80 xl:w-88',
            aba === 'caso' ? 'block' : 'hidden',
          )}
          aria-label="Caderno do caso"
        >
          <PainelCaso narrador={narrador} />
        </aside>
      </div>

      <Janela aberta={regras} onFechar={() => setRegras(false)} titulo="Como jogar sozinho">
        <ComoJogar />
      </Janela>
    </div>
  )
}
