'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import {
  ARQUETIPOS,
  arquetipoPorNome,
  GERAIS,
  GRUPOS_GERAIS,
  GRUPOS_INV,
  HAB_DESC,
  MOTIVACOES,
  ORIGENS,
  TRILHAS,
} from '@/lib/game/data'
import {
  PONTOS_CONDICAO,
  PONTOS_INVESTIGATIVOS,
  sugestaoEspecialidades,
  sugestaoInvestigativas,
} from '@/lib/game/rules'
import { jogo } from '@/lib/game/store'
import { cn } from '@/lib/utils'
import { campo, Passo, Rotulo } from './pecas'

export function CriarFicha({ onVoltar }: { onVoltar: () => void }) {
  const [nome, setNome] = useState('')
  const [oficio, setOficio] = useState(ARQUETIPOS[4].n)
  const [origem, setOrigem] = useState(ORIGENS[0].n)
  const [motivacao, setMotivacao] = useState(MOTIVACOES[0])
  const [conceito, setConceito] = useState('')
  const [inv, setInv] = useState<Record<string, number>>(() => sugestaoInvestigativas(ARQUETIPOS[4].n, ORIGENS[0].n))
  const [esp, setEsp] = useState<string[]>(() =>
    sugestaoEspecialidades(ARQUETIPOS[4].n).filter((g) => GERAIS.includes(g)).slice(0, 3),
  )
  const [cond, setCond] = useState({ vitalidade: 8, sangueFrio: 8, integridade: 8 })
  const [vicio, setVicio] = useState('')
  const [fontes, setFontes] = useState('')
  const [segredo, setSegredo] = useState('')
  const [equip, setEquip] = useState('')

  const arq = arquetipoPorNome(oficio)
  const gastosInv = Object.values(inv).reduce((a, b) => a + b, 0)
  const gastosCond = cond.vitalidade + cond.sangueFrio + cond.integridade
  const restantesInv = PONTOS_INVESTIGATIVOS - gastosInv

  const pendencias = useMemo(() => {
    const p: string[] = []
    if (!nome.trim()) p.push('dê um nome')
    if (restantesInv < 0) p.push(`tire ${-restantesInv} ponto(s) das investigativas`)
    if (esp.length !== 3) p.push('escolha três especialidades')
    if (gastosCond !== PONTOS_CONDICAO) p.push(`a condição deve somar ${PONTOS_CONDICAO}`)
    if (!segredo.trim()) p.push('escreva um segredo')
    return p
  }, [nome, restantesInv, esp.length, gastosCond, segredo])

  function trocarOficio(n: string) {
    setOficio(n)
    setInv(sugestaoInvestigativas(n, origem))
    const sugeridas = sugestaoEspecialidades(n).filter((g) => GERAIS.includes(g))
    if (sugeridas.length) setEsp(sugeridas.slice(0, 3))
  }

  function alternarEsp(g: string) {
    setEsp((atual) => (atual.includes(g) ? atual.filter((x) => x !== g) : atual.length < 3 ? [...atual, g] : atual))
  }

  function salvar(e: React.FormEvent) {
    e.preventDefault()
    if (pendencias.length) return
    jogo.set((s) => ({
      ...s,
      investigador: {
        nome: nome.trim(),
        oficio,
        trilha: arq?.grupo ?? 'Pena',
        origem,
        motivacao,
        conceito: conceito.trim() || `${oficio} de ${origem}.`,
        inv,
        gastos: {},
        esp,
        vicio: vicio.trim() || 'Cigarros',
        fontes: fontes.trim() || 'Uma pessoa que ainda acredita em você',
        segredo: segredo.trim(),
        equip: equip.trim() || 'Sobretudo, chapéu, um isqueiro que não falha',
        vitalidade: cond.vitalidade,
        sangueFrio: cond.sangueFrio,
        integridade: cond.integridade,
        sfInicial: cond.sangueFrio,
        impeto: 1,
        doses: 0,
        cicatrizes: [],
      },
    }))
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-4">
        <button onClick={onVoltar} className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar à recepção
        </button>
        <h1 className="font-display text-4xl uppercase tracking-wide md:text-5xl">Ficha do investigador</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Regra solo do livro: 30 pontos em habilidades investigativas (máximo 3 em cada), três especialidades gerais e 24
          pontos entre Vitalidade, Sangue-Frio e Integridade. Todo investigador começa com 1 Ímpeto.
        </p>
      </header>

      <form onSubmit={salvar} className="flex flex-col gap-12">
        <Secao titulo="Quem é você">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <Rotulo>Nome</Rotulo>
              <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={40} placeholder="Frank Mallory" className={campo} required />
            </label>
            <label className="flex flex-col gap-1">
              <Rotulo>Ofício · trilha</Rotulo>
              <select value={oficio} onChange={(e) => trocarOficio(e.target.value)} className={cn(campo, 'bg-background')}>
                {(['Pena', 'Distintivo', 'Navalha'] as const).map((t) => (
                  <optgroup key={t} label={t}>
                    {ARQUETIPOS.filter((a) => a.grupo === t).map((a) => (
                      <option key={a.n} value={a.n}>
                        {a.n}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <Rotulo>Origem</Rotulo>
              <select value={origem} onChange={(e) => setOrigem(e.target.value)} className={cn(campo, 'bg-background')}>
                {ORIGENS.map((o) => (
                  <option key={o.n} value={o.n}>
                    {o.n} · {o.rep}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <Rotulo>Motivação</Rotulo>
              <select value={motivacao} onChange={(e) => setMotivacao(e.target.value)} className={cn(campo, 'bg-background')}>
                {MOTIVACOES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
          </div>

          {arq && (
            <div className="grid gap-px bg-border md:grid-cols-3">
              <div className="flex flex-col gap-2 bg-card p-4">
                <Rotulo>Trilha · {arq.grupo}</Rotulo>
                <p className="text-sm leading-relaxed">{TRILHAS[arq.grupo]}</p>
              </div>
              <div className="flex flex-col gap-2 bg-card p-4">
                <Rotulo className="text-primary">Benefício</Rotulo>
                <p className="text-sm leading-relaxed">{arq.v}</p>
              </div>
              <div className="flex flex-col gap-2 bg-card p-4">
                <Rotulo className="text-destructive">Desvantagem</Rotulo>
                <p className="text-sm leading-relaxed">{arq.p}</p>
              </div>
            </div>
          )}

          <label className="flex flex-col gap-1">
            <Rotulo>Conceito</Rotulo>
            <textarea
              value={conceito}
              onChange={(e) => setConceito(e.target.value)}
              rows={2}
              placeholder="Ex-tira expulso por não aceitar um envelope; escritório sobre uma barbearia da Rua Dolores."
              className={cn(campo, 'resize-none')}
            />
          </label>
        </Secao>

        <Secao
          titulo="Habilidades investigativas"
          extra={
            <span className={cn('font-display text-lg tabular-nums', restantesInv < 0 ? 'text-destructive' : 'text-primary')}>
              {restantesInv} de {PONTOS_INVESTIGATIVOS} restantes
            </span>
          }
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            Nível 1 garante a pista central. Cada ponto acima de 1 é reserva para benefícios extras, que volta cheia a cada caso.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {GRUPOS_INV.map(([grupo, habs]) => (
              <div key={grupo} className="flex flex-col gap-3">
                <Rotulo>{grupo}</Rotulo>
                <ul className="flex flex-col">
                  {habs.map((h) => (
                    <li key={h} className="flex items-center justify-between gap-2 border-b border-border py-2" title={HAB_DESC[h]}>
                      <span className={cn('text-sm', (inv[h] ?? 0) === 0 && 'text-muted-foreground')}>{h}</span>
                      <Passo
                        compacto
                        rotulo={h}
                        valor={inv[h] ?? 0}
                        min={0}
                        max={Math.min(3, (inv[h] ?? 0) + Math.max(0, restantesInv))}
                        onChange={(v) => setInv((a) => ({ ...a, [h]: v }))}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Secao>

        <Secao
          titulo="Especialidades gerais"
          extra={<span className="font-display text-lg tabular-nums text-primary">{esp.length} de 3</span>}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">+1 nos testes dessas habilidades.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {GRUPOS_GERAIS.map(([grupo, habs]) => (
              <fieldset key={grupo} className="flex flex-col gap-2">
                <legend className="mb-2">
                  <Rotulo>{grupo}</Rotulo>
                </legend>
                {habs.map((h) => {
                  const ativo = esp.includes(h)
                  return (
                    <button
                      key={h}
                      type="button"
                      aria-pressed={ativo}
                      onClick={() => alternarEsp(h)}
                      disabled={!ativo && esp.length >= 3}
                      className={cn(
                        'border px-3 py-2 text-left text-sm transition-colors disabled:opacity-40',
                        ativo ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary',
                      )}
                    >
                      {h}
                    </button>
                  )
                })}
              </fieldset>
            ))}
          </div>
        </Secao>

        <Secao
          titulo="Corpo, cabeça e consciência"
          extra={
            <span className={cn('font-display text-lg tabular-nums', gastosCond === PONTOS_CONDICAO ? 'text-primary' : 'text-destructive')}>
              {gastosCond} de {PONTOS_CONDICAO}
            </span>
          }
        >
          <div className="grid gap-6 sm:grid-cols-3">
            {(
              [
                ['vitalidade', 'Vitalidade', 12, 'O corpo. Em 0 você está Ferido.'],
                ['sangueFrio', 'Sangue-Frio', 12, 'A cabeça. Em 0 você está Abalado.'],
                ['integridade', 'Integridade', 10, 'A consciência. Jogadas sujas a corroem.'],
              ] as const
            ).map(([k, rot, max, desc]) => (
              <div key={k} className="flex flex-col gap-3 border border-border p-4">
                <div className="flex items-center justify-between">
                  <Rotulo>{rot}</Rotulo>
                  <Passo rotulo={rot} valor={cond[k]} min={1} max={max} onChange={(v) => setCond((c) => ({ ...c, [k]: v }))} />
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </Secao>

        <Secao titulo="História e equipamento">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-1">
              <Rotulo>Vício</Rotulo>
              <input value={vicio} onChange={(e) => setVicio(e.target.value)} placeholder="Uísque irlandês" className={campo} />
            </label>
            <label className="flex flex-col gap-1">
              <Rotulo>Fontes de Sangue-Frio</Rotulo>
              <input value={fontes} onChange={(e) => setFontes(e.target.value)} placeholder="A filha Molly; a missa de domingo" className={campo} />
            </label>
            <label className="flex flex-col gap-1 md:col-span-2">
              <Rotulo>Segredo</Rotulo>
              <textarea
                value={segredo}
                onChange={(e) => setSegredo(e.target.value)}
                rows={2}
                placeholder="Algo que você fez ou sabe e que custaria caro. O narrador trará à tona uma vez, no pior momento."
                className={cn(campo, 'resize-none')}
              />
            </label>
            <label className="flex flex-col gap-1 md:col-span-2">
              <Rotulo>Equipamento</Rotulo>
              <input value={equip} onChange={(e) => setEquip(e.target.value)} placeholder="Colt Detective Special, licença nº 0417, uma garrafa no arquivo" className={campo} />
            </label>
          </div>
        </Secao>

        <div className="sticky bottom-0 -mx-6 flex flex-col gap-3 border-t border-border bg-background/95 px-6 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {pendencias.length ? `Falta: ${pendencias.join(' · ')}.` : 'Ficha completa. A cidade espera.'}
          </p>
          <button
            type="submit"
            disabled={pendencias.length > 0}
            className="bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            Assinar a ficha
          </button>
        </div>
      </form>
    </main>
  )
}

function Secao({ titulo, extra, children }: { titulo: string; extra?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
        <h2 className="font-display text-2xl uppercase tracking-wide">{titulo}</h2>
        {extra}
      </div>
      {children}
    </section>
  )
}
