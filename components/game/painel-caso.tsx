'use client'

import { useState } from 'react'
import { Plus, Users, X } from 'lucide-react'
import { ALVOS_PESO, npcPorNome, PROBLEMAS_SUGERIDOS, REGIOES, VANTAGENS_SUGERIDAS } from '@/lib/game/data'
import { casoVazio, uid, veredito } from '@/lib/game/rules'
import { jogo, useJogo } from '@/lib/game/store'
import { cn } from '@/lib/utils'
import { Elenco } from './elenco'
import { Janela } from './janela'
import { campo, Rotulo } from './pecas'
import type { Narrador } from './use-narrador'

export function PainelCaso({ narrador }: { narrador: Narrador }) {
  const caso = useJogo((s) => s.caso)
  const cena = useJogo((s) => s.cena)
  const [elenco, setElenco] = useState(false)
  const [climax, setClimax] = useState(false)
  const [novaPista, setNovaPista] = useState('')
  const peso = caso.provas.reduce((s, p) => s + p.peso, 0)

  function removerPresente(n: string) {
    jogo.set((s) => ({ ...s, cena: { ...s.cena, presentes: s.cena.presentes.filter((x) => x !== n) } }))
  }

  function marcar(tipo: 'vantagens' | 'problemas', nome: string) {
    jogo.set((s) => ({ ...s, caso: { ...s.caso, [tipo]: [...s.caso[tipo], { id: uid(), nome }] } }))
  }

  function desmarcar(tipo: 'vantagens' | 'problemas', id: string) {
    jogo.set((s) => ({ ...s, caso: { ...s.caso, [tipo]: s.caso[tipo].filter((m) => m.id !== id) } }))
  }

  function anotar(e: React.FormEvent) {
    e.preventDefault()
    const texto = novaPista.trim()
    if (!texto) return
    jogo.set((s) => ({
      ...s,
      caso: { ...s.caso, pistas: [...s.caso.pistas, { id: uid(), texto, habilidade: 'Anotação', central: false }] },
    }))
    setNovaPista('')
  }

  function arquivar() {
    const v = veredito(caso)
    jogo.set((s) => {
      const i = s.investigador
      const nFontes = i ? i.fontes.split(/[;,]/).filter((x) => x.trim()).length : 0
      return {
        ...s,
        arquivo: [
          ...s.arquivo,
          { titulo: caso.titulo || 'Caso sem nome', veredito: v.resultado, data: new Date().toLocaleDateString('pt-BR') },
        ],
        caso: casoVazio(),
        cena: { regiao: s.cena.regiao, presentes: [] },
        investigador: i
          ? {
              ...i,
              gastos: {},
              doses: 0,
              sangueFrio: Math.max(i.sangueFrio, Math.min(i.sfInicial, i.sangueFrio + 2 * nFontes)),
            }
          : i,
      }
    })
    narrador.limpar()
  }

  if (!caso.aberto) {
    return (
      <div className="flex flex-col gap-4">
        <Rotulo>O caso</Rotulo>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Nenhum caso aberto. Role o gerador na crônica para alguém bater à sua porta.
        </p>
        <Arquivo />
      </div>
    )
  }

  const v = veredito(caso)

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <Rotulo>O caso</Rotulo>
        <h2 className="font-display text-2xl uppercase leading-tight text-balance">{caso.titulo || 'Caso em aberto'}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{caso.premissa}</p>
      </header>

      <section className="flex flex-col gap-3 border-t border-border pt-4" aria-label="Cena atual">
        <label className="flex flex-col gap-1">
          <Rotulo>Cena atual</Rotulo>
          <select
            value={cena.regiao ?? ''}
            onChange={(e) => jogo.set((s) => ({ ...s, cena: { ...s.cena, regiao: e.target.value || null } }))}
            className={cn(campo, 'bg-background text-sm')}
          >
            <option value="">Sem região definida</option>
            {REGIOES.map((r) => (
              <option key={r.nome}>{r.nome}</option>
            ))}
          </select>
        </label>
        <div className="flex items-center justify-between">
          <Rotulo>Em cena</Rotulo>
          <button onClick={() => setElenco(true)} className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline">
            <Users className="size-3.5" aria-hidden="true" />
            Elenco
          </button>
        </div>
        {cena.presentes.length ? (
          <ul className="flex flex-col gap-1">
            {cena.presentes.map((n) => (
              <li key={n} className="flex items-start justify-between gap-2 text-sm">
                <span className="flex flex-col">
                  <span>{n}</span>
                  <span className="text-xs text-muted-foreground">{npcPorNome(n)?.p}</span>
                </span>
                <button onClick={() => removerPresente(n)} aria-label={`Tirar ${n} de cena`} className="mt-0.5 text-muted-foreground hover:text-destructive">
                  <X className="size-3.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-muted-foreground">Ninguém. O narrador traz gente, ou chame pelo Elenco.</p>
        )}
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-4" aria-label="Pistas">
        <Rotulo>Pistas · {caso.pistas.length}</Rotulo>
        {caso.pistas.length > 0 && (
          <ol className="flex flex-col gap-2">
            {caso.pistas.map((p) => (
              <li key={p.id} className="flex flex-col gap-0.5 text-sm leading-relaxed">
                <span>{p.texto}</span>
                <span className={cn('text-[11px] uppercase tracking-widest', p.central ? 'text-primary' : 'text-muted-foreground')}>
                  {p.central ? 'Central · ' : ''}
                  {p.habilidade}
                </span>
              </li>
            ))}
          </ol>
        )}
        <form onSubmit={anotar} className="flex items-center gap-2">
          <label htmlFor="nova-pista" className="sr-only">
            Anotar pista
          </label>
          <input id="nova-pista" value={novaPista} onChange={(e) => setNovaPista(e.target.value)} placeholder="Anotar no caderno…" className={cn(campo, 'text-sm')} />
          <button type="submit" aria-label="Anotar" className="text-muted-foreground hover:text-primary">
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-3 border-t border-border pt-4" aria-label="Provas">
        <div className="flex items-center justify-between">
          <Rotulo>Provas · Peso</Rotulo>
          <span className={cn('font-display text-lg tabular-nums', peso >= caso.alvo ? 'text-primary' : 'text-foreground')}>
            {peso} / {caso.alvo}
          </span>
        </div>
        <div className="h-1.5 w-full bg-secondary" aria-hidden="true">
          <div className="h-full bg-primary transition-all" style={{ width: `${Math.min(100, (peso / caso.alvo) * 100)}%` }} />
        </div>
        <label className="flex flex-col gap-1">
          <span className="sr-only">Quem você vai acusar</span>
          <select
            value={caso.alvo}
            onChange={(e) => jogo.set((s) => ({ ...s, caso: { ...s.caso, alvo: Number(e.target.value) } }))}
            className={cn(campo, 'bg-background text-xs')}
          >
            {ALVOS_PESO.map(([n, r]) => (
              <option key={n} value={n}>
                Acusar: {r} (Peso {n})
              </option>
            ))}
          </select>
        </label>
        {caso.provas.length > 0 && (
          <ul className="flex flex-col gap-1.5">
            {caso.provas.map((p) => (
              <li key={p.id} className="flex items-start justify-between gap-3 text-sm leading-relaxed">
                <span>{p.texto}</span>
                <span className="font-display text-primary">{p.peso}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Marcas
        titulo="Vantagens"
        itens={caso.vantagens}
        sugestoes={VANTAGENS_SUGERIDAS}
        onAdd={(n) => marcar('vantagens', n)}
        onRemover={(id) => desmarcar('vantagens', id)}
        tom="primary"
      />
      <Marcas
        titulo="Problemas"
        itens={caso.problemas}
        sugestoes={PROBLEMAS_SUGERIDOS}
        onAdd={(n) => marcar('problemas', n)}
        onRemover={(id) => desmarcar('problemas', id)}
        tom="destructive"
      />

      <section className="flex flex-col gap-3 border-t border-border pt-4">
        <Rotulo>No clímax</Rotulo>
        <p className="text-sm leading-relaxed">{v.texto}</p>
        <button
          onClick={() => setClimax(true)}
          className="border border-primary py-2.5 font-display text-xs uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Ir ao clímax
        </button>
      </section>

      <Janela aberta={elenco} onFechar={() => setElenco(false)} titulo="Elenco de Saint Village">
        <Elenco />
      </Janela>

      <Janela aberta={climax} onFechar={() => setClimax(false)} titulo="O clímax">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3 gap-px bg-border text-center">
            <Placar rotulo="Vantagens" valor={v.v} />
            <Placar rotulo="Problemas" valor={v.p} />
            <Placar rotulo={`Peso · de ${caso.alvo}`} valor={v.peso} />
          </div>
          <p className="font-display text-3xl uppercase text-balance text-primary">{v.resultado}</p>
          <p className="leading-relaxed text-muted-foreground">
            {`Mais Vantagens que Problemas, a verdade vence; empate, vence pela metade; mais Problemas, a cidade vence. E ${v.forum}.`}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              disabled={narrador.ocupado}
              onClick={() => {
                narrador.enviarSistema(
                  `[CLÍMAX] Vou ao clímax. Resultado pela regra: ${v.texto} Narre o confronto final e o epílogo, revelando a verdade que as pistas sustentam. Se minha Integridade for 2 ou menos, inclua o acordo sujo.`,
                )
                setClimax(false)
              }}
              className="bg-primary px-5 py-3 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground hover:opacity-90 disabled:opacity-40"
            >
              Narrar o epílogo
            </button>
            <button
              onClick={() => {
                arquivar()
                setClimax(false)
              }}
              className="border border-border px-5 py-3 font-display text-sm uppercase tracking-[0.3em] hover:border-foreground"
            >
              Arquivar e abrir outro caso
            </button>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Ao arquivar: reservas e garrafa voltam cheias, e cada fonte de Sangue-Frio devolve 2, até o valor inicial.
          </p>
        </div>
      </Janela>
    </div>
  )
}

function Placar({ rotulo, valor }: { rotulo: string; valor: number }) {
  return (
    <div className="flex flex-col gap-1 bg-card p-4">
      <span className="font-display text-4xl">{valor}</span>
      <Rotulo>{rotulo}</Rotulo>
    </div>
  )
}

function Marcas({
  titulo,
  itens,
  sugestoes,
  onAdd,
  onRemover,
  tom,
}: {
  titulo: string
  itens: { id: string; nome: string }[]
  sugestoes: string[]
  onAdd: (n: string) => void
  onRemover: (id: string) => void
  tom: 'primary' | 'destructive'
}) {
  const [abrir, setAbrir] = useState(false)
  return (
    <section className="flex flex-col gap-3 border-t border-border pt-4" aria-label={titulo}>
      <div className="flex items-center justify-between">
        <Rotulo>
          {titulo} · {itens.length}
        </Rotulo>
        <button onClick={() => setAbrir((a) => !a)} aria-expanded={abrir} className="text-xs text-muted-foreground hover:text-foreground">
          {abrir ? 'Fechar' : 'Marcar'}
        </button>
      </div>
      {itens.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {itens.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => onRemover(m.id)}
                aria-label={`${tom === 'destructive' ? 'Resolver' : 'Remover'} ${m.nome}`}
                className={cn(
                  'group inline-flex items-center gap-1.5 border px-2 py-1 text-xs',
                  tom === 'primary' ? 'border-primary/60 text-primary' : 'border-destructive/60 text-destructive',
                )}
              >
                {m.nome}
                <X className="size-3 opacity-50 group-hover:opacity-100" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {abrir && (
        <div className="flex flex-wrap gap-1.5">
          {sugestoes.map((s) => (
            <button
              key={s}
              onClick={() => {
                onAdd(s)
                setAbrir(false)
              }}
              className="border border-border px-2 py-1 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

function Arquivo() {
  const arquivo = useJogo((s) => s.arquivo)
  if (!arquivo.length) return null
  return (
    <section className="flex flex-col gap-2 border-t border-border pt-4">
      <Rotulo>Casos arquivados</Rotulo>
      <ul className="flex flex-col gap-2">
        {arquivo
          .slice()
          .reverse()
          .map((a, i) => (
            <li key={i} className="flex flex-col text-sm">
              <span>{a.titulo}</span>
              <span className="text-xs text-muted-foreground">
                {a.veredito} · {a.data}
              </span>
            </li>
          ))}
      </ul>
    </section>
  )
}
