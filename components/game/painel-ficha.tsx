'use client'

import { arquetipoPorNome } from '@/lib/game/data'
import { mudarInvestigador } from '@/lib/game/efeitos'
import {
  estadoIntegridade,
  estadoSangueFrio,
  estadoVitalidade,
  limiarAcerto,
  MAX_IMPETO,
  reservaDisponivel,
  rolarD6,
} from '@/lib/game/rules'
import { jogo, useJogo } from '@/lib/game/store'
import { uid } from '@/lib/game/rules'
import { cn } from '@/lib/utils'
import { Medidor, Passo, Pips, Rotulo } from './pecas'
import type { Narrador } from './use-narrador'

const COBRANCA: Record<number, { nome: string; problema?: string; impeto?: number }> = {
  1: { nome: 'Ressaca: −1 nos testes da próxima cena', problema: 'Ressaca' },
  2: { nome: 'Ressaca: −1 nos testes da próxima cena', problema: 'Ressaca' },
  3: { nome: 'Dívida', problema: 'Dívida do vício' },
  4: { nome: 'Visto', problema: 'Visto bebendo' },
  5: { nome: 'Língua solta: algo vaza' },
  6: { nome: 'Apagão: −1 Ímpeto', impeto: -1 },
}

export function PainelFicha({ narrador }: { narrador: Narrador }) {
  const i = useJogo((s) => s.investigador)
  if (!i) return null
  const arq = arquetipoPorNome(i.oficio)
  const vit = estadoVitalidade(i.vitalidade)
  const sf = estadoSangueFrio(i.sangueFrio)
  const integ = estadoIntegridade(i.integridade)

  const ajustar = (k: 'vitalidade' | 'sangueFrio' | 'integridade' | 'impeto', v: number) =>
    jogo.set((s) => mudarInvestigador(s, (x) => ({ ...x, [k]: v })))

  function tomarDose() {
    if (!i || i.doses >= 3 || narrador.ocupado) return
    const recaida = i.doses === 2
    const d = recaida ? rolarD6() : 0
    const cobra = recaida ? COBRANCA[d] : null
    jogo.set((s) => {
      const r = mudarInvestigador(s, (x) => ({
        ...x,
        doses: x.doses + 1,
        sangueFrio: Math.min(12, x.sangueFrio + 2),
        impeto: Math.max(0, x.impeto + (cobra?.impeto ?? 0)),
      }))
      return cobra?.problema
        ? { ...r, caso: { ...r.caso, problemas: [...r.caso.problemas, { id: uid(), nome: cobra.problema }] } }
        : r
    })
    narrador.enviarSistema(
      `[VÍCIO] Cedo ao vício (${i.vicio}): dose ${i.doses + 1} de 3, +2 de Sangue-Frio.${cobra ? ` É a recaída. O vício cobra (1d6 = ${d}): ${cobra.nome}. Narre a consequência.` : ' Narre o momento em uma ou duas frases.'}`,
    )
  }

  const investigativas = Object.entries(i.inv)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <Rotulo>
          {i.oficio} · {i.trilha}
        </Rotulo>
        <h2 className="font-display text-2xl uppercase leading-tight">{i.nome}</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {i.origem} · {i.motivacao}
        </p>
      </header>

      <div className="flex items-center justify-between border-y border-border py-3">
        <Rotulo>Limiar de acerto</Rotulo>
        <span className="font-display text-2xl">{limiarAcerto(i)}</span>
      </div>

      <Condicao rotulo="Vitalidade" valor={i.vitalidade} min={-12} max={12} estado={vit} onChange={(v) => ajustar('vitalidade', v)} />
      <Condicao rotulo="Sangue-Frio" valor={i.sangueFrio} min={-12} max={12} estado={sf} onChange={(v) => ajustar('sangueFrio', v)} />
      <Condicao rotulo="Integridade" valor={i.integridade} min={0} max={10} perigo={2} estado={integ} onChange={(v) => ajustar('integridade', v)} />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Rotulo>Ímpetos</Rotulo>
          <Passo compacto rotulo="Ímpetos" valor={i.impeto} min={0} max={MAX_IMPETO} onChange={(v) => ajustar('impeto', v)} />
        </div>
        <div className="flex gap-1" aria-hidden="true">
          {Array.from({ length: MAX_IMPETO }, (_, k) => (
            <span key={k} className={cn('h-2 flex-1', k < i.impeto ? 'bg-primary' : 'bg-secondary')} />
          ))}
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Gaste para virar Empate em Avanço. Recupere agindo pela motivação contra o próprio interesse.
        </p>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <Rotulo>Vício · {i.vicio}</Rotulo>
          <Pips total={3} cheios={i.doses} />
        </div>
        <button
          onClick={tomarDose}
          disabled={i.doses >= 3 || narrador.ocupado}
          className="w-full border border-border py-2 font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30"
        >
          {i.doses >= 3 ? 'A garrafa está vazia' : i.doses === 2 ? 'A terceira dose (recaída)' : 'Tomar uma dose · +2 Sangue-Frio'}
        </button>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <Rotulo>Investigativas · reserva</Rotulo>
        <ul className="flex flex-col">
          {investigativas.map(([h, n]) => {
            const res = reservaDisponivel(i, h)
            return (
              <li key={h} className="flex items-center justify-between gap-2 py-1 text-sm">
                <span>{h}</span>
                <span className="flex items-center gap-2">
                  <Pips total={Math.max(0, n - 1)} cheios={res} />
                  <span className="w-3 text-right font-display text-muted-foreground">{n}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <Rotulo>Especialidades · +1</Rotulo>
        <p className="text-sm leading-relaxed">{i.esp.join(' · ')}</p>
      </div>

      {arq && (
        <div className="flex flex-col gap-3 border-t border-border pt-4 text-xs leading-relaxed">
          <p>
            <span className="text-primary">Benefício. </span>
            {arq.v}
          </p>
          <p className="text-muted-foreground">
            <span className="text-destructive">Desvantagem. </span>
            {arq.p}
          </p>
        </div>
      )}

      <details className="border-t border-border pt-4 text-xs leading-relaxed">
        <summary className="cursor-pointer font-display uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
          Segredo, fontes e equipamento
        </summary>
        <div className="mt-3 flex flex-col gap-2">
          <p>
            <span className="text-muted-foreground">Segredo: </span>
            {i.segredo}
          </p>
          <p>
            <span className="text-muted-foreground">Fontes: </span>
            {i.fontes}
          </p>
          <p>
            <span className="text-muted-foreground">Equipamento: </span>
            {i.equip}
          </p>
          {i.cicatrizes.length > 0 && (
            <p>
              <span className="text-muted-foreground">Cicatrizes: </span>
              {i.cicatrizes.join(', ')}
            </p>
          )}
        </div>
      </details>
    </div>
  )
}

function Condicao({
  rotulo,
  valor,
  min,
  max,
  perigo = 0,
  estado,
  onChange,
}: {
  rotulo: string
  valor: number
  min: number
  max: number
  perigo?: number
  estado: { nome: string; efeito: string }
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Rotulo>{rotulo}</Rotulo>
        <Passo compacto rotulo={rotulo} valor={valor} min={min} max={max} onChange={onChange} />
      </div>
      <Medidor valor={valor} min={min} max={max} perigo={perigo} />
      <p className="text-xs">
        <span className={cn('font-display uppercase tracking-widest', valor <= perigo ? 'text-destructive' : 'text-foreground')}>
          {estado.nome}
        </span>{' '}
        <span className="text-muted-foreground">{estado.efeito}</span>
      </p>
    </div>
  )
}
