'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { GERADOR } from '@/lib/game/data'
import { casoVazio, rolarD8 } from '@/lib/game/rules'
import { jogo } from '@/lib/game/store'
import type { Gerado } from '@/lib/game/types'
import { DadoOito } from './dado'
import { Rotulo } from './pecas'
import type { Narrador } from './use-narrador'

const ORDEM: { k: keyof Gerado; rotulo: string; selado: boolean }[] = [
  { k: 'cliente', rotulo: 'Cliente', selado: false },
  { k: 'crime', rotulo: 'Crime', selado: false },
  { k: 'vitima', rotulo: 'Vítima', selado: false },
  { k: 'culpado', rotulo: 'Culpado', selado: true },
  { k: 'motivo', rotulo: 'Motivo', selado: true },
  { k: 'reviravolta', rotulo: 'Reviravolta', selado: true },
]

export function GeradorCaso({ narrador }: { narrador: Narrador }) {
  const [dados, setDados] = useState<Record<keyof Gerado, number> | null>(null)
  const [rodada, setRodada] = useState(0)

  function rolar() {
    setDados(Object.fromEntries(ORDEM.map(({ k }) => [k, rolarD8()])) as Record<keyof Gerado, number>)
    setRodada((r) => r + 1)
  }

  function abrir(verdade: Gerado | null) {
    const premissa = verdade
      ? `${verdade.cliente} bate à sua porta. ${verdade.crime}. Vítima: ${verdade.vitima.toLowerCase()}.`
      : 'Um caso ainda sem nome. O narrador escolhe quem bate à porta.'
    jogo.set((s) => ({
      ...s,
      caso: { ...casoVazio(), aberto: true, premissa, verdade },
    }))
    narrador.enviarSistema(
      '[CASO] Abra o caso: narre a cena de abertura em que o cliente chega até mim, defina a região com mudarCena e dê título e premissa com abrirCaso.',
    )
  }

  const verdade = dados
    ? (Object.fromEntries(ORDEM.map(({ k }) => [k, GERADOR[k][dados[k] - 1]])) as Gerado)
    : null

  return (
    <section className="dossier flex flex-col gap-6 border border-border p-6 md:p-8" aria-labelledby="gerador-titulo">
      <div className="flex flex-col gap-2">
        <Rotulo>Dossiê · gerador de casos · 6 × 1d8</Rotulo>
        <h2 id="gerador-titulo" className="font-display text-3xl uppercase tracking-wide text-balance">
          Alguém pagou adiantado
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Role os seis dados do livro. Você vê quem procura, o crime e a vítima. Culpado, motivo e reviravolta ficam
          lacrados no envelope: só o narrador lê.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 2xl:grid-cols-3">
        {ORDEM.map(({ k, rotulo, selado }, idx) => (
          <li key={k} className="flex items-center gap-4 bg-background p-4">
            <DadoOito key={`${k}-${rodada}`} valor={dados && !selado ? dados[k] : null} rolando={!!dados} atraso={idx * 90} />
            <div className="flex min-w-0 flex-col gap-1">
              <Rotulo>{rotulo}</Rotulo>
              {dados ? (
                selado ? (
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="size-3.5" aria-hidden="true" />
                    Lacrado
                  </span>
                ) : (
                  <span className="text-sm leading-snug">{verdade?.[k]}</span>
                )
              ) : (
                <span className="text-sm text-muted-foreground">—</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={rolar}
          className="border border-primary px-5 py-3 font-display text-sm uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground"
        >
          {dados ? 'Rolar de novo' : 'Rolar o gerador'}
        </button>
        {dados && (
          <button
            onClick={() => abrir(verdade)}
            disabled={narrador.ocupado}
            className="bg-primary px-5 py-3 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90 disabled:opacity-40"
          >
            Abrir o caso
          </button>
        )}
        {!dados && (
          <button
            onClick={() => abrir(null)}
            disabled={narrador.ocupado}
            className="px-2 py-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:opacity-40"
          >
            Deixar o narrador sortear
          </button>
        )}
      </div>
    </section>
  )
}
