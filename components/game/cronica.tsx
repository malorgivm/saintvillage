'use client'

import { useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { descreverEfeito } from '@/lib/game/efeitos'
import { useJogo } from '@/lib/game/store'
import type { MensagemCronica } from '@/lib/game/tools'
import { cn } from '@/lib/utils'
import { CartaBeneficio, CartaChoque, CartaTeste } from './cartas'
import { GeradorCaso } from './gerador-caso'
import { Rotulo } from './pecas'
import type { Modo, Narrador } from './use-narrador'

const MODOS: { m: Modo; rotulo: string; dica: string }[] = [
  { m: 'AÇÃO', rotulo: 'Ação', dica: 'O que você faz? Onde procura, com que habilidade?' },
  { m: 'FALA', rotulo: 'Fala', dica: 'O que você diz em voz alta?' },
  { m: 'DIRETOR', rotulo: 'Perguntar ao Diretor', dica: 'Uma dúvida de regra, fora do jogo.' },
]

export function Cronica({ narrador }: { narrador: Narrador }) {
  const casoAberto = useJogo((s) => s.caso.aberto)
  const { messages, ocupado, error } = narrador
  const fim = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, ocupado])

  return (
    <section className="flex min-h-0 flex-1 flex-col" aria-label="Crônica">
      <div className="scrollbar-thin flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:px-10" aria-live="polite">
        {!casoAberto && <GeradorCaso narrador={narrador} />}
        {casoAberto && messages.length === 0 && !ocupado && (
          <p className="text-sm text-muted-foreground">O narrador está acendendo um cigarro…</p>
        )}
        {messages.map((m) => (
          <Mensagem key={m.id} mensagem={m} narrador={narrador} />
        ))}
        {ocupado && messages.at(-1)?.role === 'user' && (
          <p className="animate-pulse font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
            A máquina de escrever estala…
          </p>
        )}
        {error && (
          <div role="alert" className="flex flex-wrap items-center gap-3 border border-destructive/60 p-4 text-sm">
            <span>O narrador não respondeu. A linha caiu.</span>
            <button onClick={() => narrador.regenerate()} className="inline-flex items-center gap-2 text-primary hover:underline">
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Tentar de novo
            </button>
          </div>
        )}
        <div ref={fim} />
      </div>
      {casoAberto && <Entrada narrador={narrador} />}
    </section>
  )
}

function Mensagem({ mensagem, narrador }: { mensagem: MensagemCronica; narrador: Narrador }) {
  if (mensagem.role === 'user') {
    const texto = mensagem.parts.map((p) => (p.type === 'text' ? p.text : '')).join('')
    const casado = texto.match(/^\[(AÇÃO|FALA|DIRETOR|CASO|CLÍMAX|VÍCIO|CONTINUAR|PISTA)\]\s*/)
    const tag = casado?.[1]
    const corpo = casado ? texto.slice(casado[0].length) : texto
    if (tag === 'CASO' || tag === 'CONTINUAR') return null
    return (
      <div className="ml-auto flex max-w-xl flex-col items-end gap-1 animate-rise">
        <Rotulo className="text-primary">{tag === 'DIRETOR' ? 'Pergunta ao Diretor' : tag === 'FALA' ? 'Você diz' : tag === 'CLÍMAX' ? 'Clímax' : tag === 'VÍCIO' ? 'A garrafa' : tag === 'PISTA' ? 'Pedido de pista' : 'Você'}</Rotulo>
        <p className={cn('border-r-2 border-primary pr-4 text-right leading-relaxed', tag === 'FALA' && 'italic')}>
          {tag === 'FALA' ? `— ${corpo}` : corpo}
        </p>
      </div>
    )
  }

  return (
    <article className="flex max-w-2xl flex-col gap-4 animate-rise">
      {mensagem.parts.map((p, i) => {
        switch (p.type) {
          case 'text':
            return <Prosa key={i} texto={p.text} />
          case 'tool-pedirTeste':
            return <CartaTeste key={p.toolCallId} parte={p} narrador={narrador} />
          case 'tool-pedirChoque':
            return <CartaChoque key={p.toolCallId} parte={p} narrador={narrador} />
          case 'tool-oferecerBeneficio':
            return <CartaBeneficio key={p.toolCallId} parte={p} narrador={narrador} />
          default: {
            if (!p.type.startsWith('tool-')) return null
            const parte = p as { toolCallId: string; state: string; input?: Record<string, unknown> }
            if (parte.state !== 'output-available' || !parte.input) return null
            const desc = descreverEfeito({ nome: p.type.slice(5), entrada: parte.input })
            if (!desc) return null
            return (
              <p key={parte.toolCallId} className="w-fit border border-border px-3 py-1 font-display text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {desc}
              </p>
            )
          }
        }
      })}
    </article>
  )
}

function Prosa({ texto }: { texto: string }) {
  const blocos = texto.split(/\n{2,}|\n/).map((b) => b.trim()).filter(Boolean)
  return (
    <div className="flex flex-col gap-4">
      {blocos.map((b, i) => {
        const regra = b.startsWith('[') && b.includes(']')
        if (regra) {
          const fecha = b.indexOf(']')
          return (
            <div key={i} className="flex flex-col gap-4">
              <p className="border-l border-primary/60 pl-3 text-xs leading-relaxed text-muted-foreground">{b.slice(1, fecha)}</p>
              {b.slice(fecha + 1).trim() && <p className="text-pretty text-[17px] leading-relaxed">{b.slice(fecha + 1).trim()}</p>}
            </div>
          )
        }
        return (
          <p key={i} className={cn('text-pretty text-[17px] leading-relaxed', b.startsWith('—') && 'pl-4')}>
            {b.replace(/\*\*/g, '')}
          </p>
        )
      })}
    </div>
  )
}

function Entrada({ narrador }: { narrador: Narrador }) {
  const [modo, setModo] = useState<Modo>('AÇÃO')
  const [texto, setTexto] = useState('')
  const dica = MODOS.find((x) => x.m === modo)!.dica

  function enviar() {
    if (!texto.trim() || narrador.ocupado) return
    narrador.enviar(texto, modo)
    setTexto('')
  }

  return (
    <div className="flex flex-col gap-3 border-t border-border bg-background px-4 py-4 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex border border-border" role="tablist" aria-label="Tipo de jogada">
          {MODOS.map((x) => (
            <button
              key={x.m}
              role="tab"
              aria-selected={modo === x.m}
              onClick={() => setModo(x.m)}
              className={cn(
                'px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.25em] transition-colors',
                modo === x.m ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {x.rotulo}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            disabled={narrador.ocupado}
            onClick={() => narrador.enviarSistema('[CONTINUAR] Continue a cena.')}
            className="font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary disabled:opacity-40"
          >
            Continuar cena
          </button>
          <button
            disabled={narrador.ocupado}
            onClick={() => narrador.enviar('Estou travado. Que habilidade e que lugar podem render a próxima pista central?', 'DIRETOR')}
            className="font-display text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary disabled:opacity-40"
          >
            Pedir pista
          </button>
        </div>
      </div>
      <form
        className="flex items-stretch border border-input focus-within:border-primary"
        onSubmit={(e) => {
          e.preventDefault()
          enviar()
        }}
      >
        <label htmlFor="jogada" className="sr-only">
          {dica}
        </label>
        <textarea
          id="jogada"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              if (e.nativeEvent.isComposing || e.keyCode === 229) return
              e.preventDefault()
              enviar()
            }
          }}
          rows={2}
          placeholder={dica}
          className="min-h-12 flex-1 resize-none bg-transparent px-4 py-3 text-base leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none"
        />
        <button
          type="submit"
          disabled={narrador.ocupado || !texto.trim()}
          className="border-l border-input px-5 font-display text-xs uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
