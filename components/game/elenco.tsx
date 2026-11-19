'use client'

import { useState } from 'react'
import { NPCS, REGIOES } from '@/lib/game/data'
import { jogo, useJogo } from '@/lib/game/store'
import { cn } from '@/lib/utils'
import { Rotulo } from './pecas'

export function Elenco() {
  const cena = useJogo((s) => s.cena)
  const [regiao, setRegiao] = useState(cena.regiao ?? REGIOES[0].nome)
  const r = REGIOES.find((x) => x.nome === regiao)
  const npcs = NPCS.filter((n) => n.r === regiao)

  function alternar(nome: string) {
    jogo.set((s) => {
      const presentes = s.cena.presentes.includes(nome)
        ? s.cena.presentes.filter((x) => x !== nome)
        : [...s.cena.presentes, nome].slice(-6)
      return { ...s, cena: { ...s.cena, presentes } }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Regiões">
        {REGIOES.map((x) => (
          <button
            key={x.nome}
            role="tab"
            aria-selected={regiao === x.nome}
            onClick={() => setRegiao(x.nome)}
            className={cn(
              'border px-3 py-1.5 text-xs transition-colors',
              regiao === x.nome ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {x.nome}
          </button>
        ))}
      </div>

      {r && (
        <div className="flex flex-col gap-2 border-l-2 border-primary pl-4">
          <Rotulo>
            {r.dono} · Dificuldade {r.dif} · Perigo {r.perigo}
          </Rotulo>
          <p className="text-sm leading-relaxed">{r.resumo}</p>
        </div>
      )}

      <ul className="grid gap-px bg-border md:grid-cols-2">
        {npcs.map((n) => {
          const presente = cena.presentes.includes(n.n)
          return (
            <li key={n.n} className="flex flex-col gap-3 bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-display text-lg uppercase leading-tight">{n.n}</span>
                  <span className="text-xs text-muted-foreground">{n.p}</span>
                </div>
                <button
                  onClick={() => alternar(n.n)}
                  aria-pressed={presente}
                  className={cn(
                    'shrink-0 border px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.2em]',
                    presente ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary hover:text-primary',
                  )}
                >
                  {presente ? 'Em cena' : 'Pôr em cena'}
                </button>
              </div>
              <p className="line-clamp-4 text-sm leading-relaxed">{n.d}</p>
              {n.q && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="text-foreground">Quer: </span>
                  {n.q}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
