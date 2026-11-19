'use client'

import { useState } from 'react'
import { CICATRIZES } from '@/lib/game/data'
import { mudarInvestigador } from '@/lib/game/efeitos'
import { alvoChoque, faixa, type Faixa, modificadoresTeste, rolarD6, reservaDisponivel } from '@/lib/game/rules'
import { jogo, useJogo } from '@/lib/game/store'
import { cn } from '@/lib/utils'
import { DadoSeis } from './dado'
import { Rotulo } from './pecas'
import type { Narrador } from './use-narrador'

type Parte<I, O> = { toolCallId: string; state: string; input?: Partial<I>; output?: O }

function entradaCompleta<I>(parte: Parte<I, unknown>): I | undefined {
  return parte.state === 'input-streaming' ? undefined : (parte.input as I | undefined)
}

const ESTILO_FAIXA: Record<Faixa, string> = {
  Revés: 'border-destructive text-destructive',
  Empate: 'border-foreground text-foreground',
  Avanço: 'border-primary text-primary',
}

function Carimbo({ texto, classe }: { texto: string; classe: string }) {
  return (
    <span className={cn('animate-stamp inline-block border-2 px-3 py-1 font-display text-xl uppercase tracking-[0.2em]', classe)}>
      {texto}
    </span>
  )
}

function Moldura({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border border-primary/40 bg-card p-5" role="group" aria-label={titulo}>
      <Rotulo className="text-primary">{titulo}</Rotulo>
      {children}
    </div>
  )
}

type EntradaTeste = { habilidade: string; motivo: string; problema?: string }
type SaidaTeste = { dado: number; modificadores: string; total: number; resultado: Faixa; impetoGasto: boolean }

export function CartaTeste({ parte, narrador }: { parte: Parte<EntradaTeste, SaidaTeste>; narrador: Narrador }) {
  const investigador = useJogo((s) => s.investigador)
  const [rolagem, setRolagem] = useState<{ dado: number; rolando: boolean } | null>(null)
  const entrada = entradaCompleta(parte)
  if (!entrada || !investigador) return null

  const mods = modificadoresTeste(investigador, entrada.habilidade, entrada.problema)
  const somaMods = mods.reduce((s, m) => s + m.valor, 0)
  const descMods = mods.length ? mods.map((m) => `${m.rotulo} ${m.valor > 0 ? '+' : ''}${m.valor}`).join(', ') : 'nenhum'

  if (parte.state === 'output-available' && parte.output) {
    const o = parte.output
    return (
      <Moldura titulo={`Teste · ${entrada.habilidade}`}>
        <div className="flex items-center gap-4">
          <DadoSeis valor={o.dado} tamanho={44} />
          <div className="flex flex-col gap-1 text-sm">
            <span>
              {o.dado} {somaSinal(o.total - o.dado)} = <strong>{o.total}</strong>
            </span>
            <span className="text-xs text-muted-foreground">{o.modificadores}</span>
          </div>
          <span className="ml-auto">
            <Carimbo texto={o.resultado} classe={ESTILO_FAIXA[o.resultado]} />
          </span>
        </div>
        {o.impetoGasto && <p className="text-xs text-primary">1 Ímpeto gasto: o Empate virou Avanço.</p>}
      </Moldura>
    )
  }

  if (parte.state !== 'input-available') return null

  const total = rolagem ? rolagem.dado + somaMods : 0
  const res = rolagem ? faixa(total) : null

  function enviar(impetoGasto: boolean) {
    if (!rolagem || !res) return
    if (impetoGasto) jogo.set((s) => mudarInvestigador(s, (i) => ({ ...i, impeto: Math.max(0, i.impeto - 1) })))
    narrador.addToolOutput({
      tool: 'pedirTeste',
      toolCallId: parte.toolCallId,
      output: {
        dado: rolagem.dado,
        modificadores: descMods,
        total,
        resultado: impetoGasto ? 'Avanço' : res,
        impetoGasto,
      },
    })
  }

  function rolar() {
    const dado = rolarD6()
    setRolagem({ dado, rolando: true })
    const r = faixa(dado + somaMods)
    const podeGastar = r === 'Empate' && (investigador?.impeto ?? 0) > 0
    setTimeout(() => {
      setRolagem({ dado, rolando: false })
      if (!podeGastar) {
        narrador.addToolOutput({
          tool: 'pedirTeste',
          toolCallId: parte.toolCallId,
          output: { dado, modificadores: descMods, total: dado + somaMods, resultado: r, impetoGasto: false },
        })
      }
    }, 750)
  }

  return (
    <Moldura titulo={`Teste · ${entrada.habilidade}`}>
      <p className="text-sm leading-relaxed">{entrada.motivo}</p>
      <div className="flex flex-wrap items-center gap-4">
        <DadoSeis valor={rolagem?.dado ?? null} rolando={rolagem?.rolando} tamanho={56} />
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>1d6 {somaSinal(somaMods)}</span>
          <span>Modificadores: {descMods}</span>
          <span>Revés 1–2 · Empate 3–4 · Avanço 5+</span>
        </div>
        {res && !rolagem?.rolando && (
          <span className="ml-auto">
            <Carimbo texto={res} classe={ESTILO_FAIXA[res]} />
          </span>
        )}
      </div>
      {!rolagem && (
        <button onClick={rolar} className="w-fit bg-primary px-5 py-2.5 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90">
          Rolar o dado
        </button>
      )}
      {rolagem && !rolagem.rolando && res === 'Empate' && investigador.impeto > 0 && (
        <div className="flex flex-wrap gap-3">
          <button onClick={() => enviar(true)} className="bg-primary px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-primary-foreground hover:opacity-90">
            Gastar 1 Ímpeto · virar Avanço
          </button>
          <button onClick={() => enviar(false)} className="border border-border px-4 py-2 font-display text-xs uppercase tracking-[0.25em] hover:border-foreground">
            Aceitar o Empate
          </button>
        </div>
      )}
    </Moldura>
  )
}

type EntradaChoque = { tipo: 'horror' | 'culpa'; valor: number; motivo: string }
type SaidaChoque = { dado: number; alvo: number; passou: boolean; perda: number; cicatriz?: string }

export function CartaChoque({ parte, narrador }: { parte: Parte<EntradaChoque, SaidaChoque>; narrador: Narrador }) {
  const investigador = useJogo((s) => s.investigador)
  const [rolagem, setRolagem] = useState<{ dado: number; rolando: boolean } | null>(null)
  const entrada = entradaCompleta(parte)
  if (!entrada || !investigador) return null
  const alvo = alvoChoque(investigador, entrada.tipo)
  const titulo = `Choque de ${entrada.tipo} · ${entrada.valor}`

  if (parte.state === 'output-available' && parte.output) {
    const o = parte.output
    return (
      <Moldura titulo={titulo}>
        <div className="flex items-center gap-4">
          <DadoSeis valor={o.dado} tamanho={44} />
          <span className="text-sm">
            {o.dado} contra {o.alvo}
            {o.passou ? '' : ` · −${o.perda} de Sangue-Frio`}
            {o.cicatriz ? ` · cicatriz: ${o.cicatriz}` : ''}
          </span>
          <span className="ml-auto">
            <Carimbo texto={o.passou ? 'Firme' : 'Abalou'} classe={o.passou ? ESTILO_FAIXA.Avanço : ESTILO_FAIXA.Revés} />
          </span>
        </div>
      </Moldura>
    )
  }
  if (parte.state !== 'input-available') return null

  function rolar() {
    const dado = rolarD6()
    setRolagem({ dado, rolando: true })
    setTimeout(() => {
      setRolagem({ dado, rolando: false })
      const passou = dado >= alvo
      let cicatriz: string | undefined
      if (!passou && entrada) {
        jogo.set((s) =>
          mudarInvestigador(s, (i) => {
            const sf = Math.max(-12, i.sangueFrio - entrada.valor)
            if (i.sangueFrio > -6 && sf <= -6) {
              cicatriz = CICATRIZES[Math.floor(Math.random() * CICATRIZES.length)]
              return { ...i, sangueFrio: sf, cicatrizes: [...i.cicatrizes, cicatriz] }
            }
            return { ...i, sangueFrio: sf }
          }),
        )
      }
      narrador.addToolOutput({
        tool: 'pedirChoque',
        toolCallId: parte.toolCallId,
        output: { dado, alvo, passou, perda: passou ? 0 : entrada?.valor ?? 0, cicatriz },
      })
    }, 750)
  }

  return (
    <Moldura titulo={titulo}>
      <p className="text-sm leading-relaxed">{entrada.motivo}</p>
      <div className="flex flex-wrap items-center gap-4">
        <DadoSeis valor={rolagem?.dado ?? null} rolando={rolagem?.rolando} tamanho={56} />
        <span className="text-xs leading-relaxed text-muted-foreground">
          1d6 contra {alvo}. Falhou: perde {entrada.valor} de Sangue-Frio.
        </span>
      </div>
      {!rolagem && (
        <button onClick={rolar} className="w-fit bg-primary px-5 py-2.5 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90">
          Segurar os nervos
        </button>
      )}
    </Moldura>
  )
}

type EntradaBeneficio = { habilidade: string; beneficio: string }
type SaidaBeneficio = { pago: 'reserva' | 'impeto' | 'recusou' }

export function CartaBeneficio({ parte, narrador }: { parte: Parte<EntradaBeneficio, SaidaBeneficio>; narrador: Narrador }) {
  const investigador = useJogo((s) => s.investigador)
  const entrada = entradaCompleta(parte)
  if (!entrada || !investigador) return null
  const titulo = `Benefício · ${entrada.habilidade}`

  if (parte.state === 'output-available' && parte.output) {
    const pago = parte.output.pago
    return (
      <Moldura titulo={titulo}>
        <p className="text-sm text-muted-foreground">
          {entrada.beneficio} —{' '}
          <span className={pago === 'recusou' ? '' : 'text-primary'}>
            {pago === 'reserva' ? 'pago com reserva' : pago === 'impeto' ? 'pago com 1 Ímpeto' : 'recusado'}
          </span>
        </p>
      </Moldura>
    )
  }
  if (parte.state !== 'input-available') return null

  const reserva = reservaDisponivel(investigador, entrada.habilidade)
  const ferido = investigador.vitalidade <= 0

  function pagar(pago: SaidaBeneficio['pago']) {
    if (!entrada) return
    if (pago === 'reserva') {
      jogo.set((s) =>
        mudarInvestigador(s, (i) => ({
          ...i,
          gastos: { ...i.gastos, [entrada.habilidade]: (i.gastos[entrada.habilidade] ?? 0) + 1 },
        })),
      )
    }
    if (pago === 'impeto') jogo.set((s) => mudarInvestigador(s, (i) => ({ ...i, impeto: Math.max(0, i.impeto - 1) })))
    narrador.addToolOutput({ tool: 'oferecerBeneficio', toolCallId: parte.toolCallId, output: { pago } })
  }

  return (
    <Moldura titulo={titulo}>
      <p className="text-sm leading-relaxed">{entrada.beneficio}</p>
      {ferido && <p className="text-xs text-destructive">Ferido não paga benefícios com reserva.</p>}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => pagar('reserva')}
          disabled={reserva <= 0 || ferido}
          className="bg-primary px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-primary-foreground hover:opacity-90 disabled:opacity-30"
        >
          Reserva ({reserva})
        </button>
        <button
          onClick={() => pagar('impeto')}
          disabled={investigador.impeto <= 0}
          className="border border-primary px-4 py-2 font-display text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
        >
          1 Ímpeto ({investigador.impeto})
        </button>
        <button onClick={() => pagar('recusou')} className="border border-border px-4 py-2 font-display text-xs uppercase tracking-[0.25em] hover:border-foreground">
          Deixar passar
        </button>
      </div>
    </Moldura>
  )
}

function somaSinal(n: number) {
  if (n === 0) return ''
  return n > 0 ? `+ ${n}` : `− ${-n}`
}
