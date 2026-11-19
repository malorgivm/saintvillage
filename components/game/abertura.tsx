'use client'

import Image from 'next/image'
import { ArrowRight, FilePlus2 } from 'lucide-react'
import { arquetipoPorNome, PRONTOS } from '@/lib/game/data'
import { investigadorDePronto } from '@/lib/game/rules'
import { jogo } from '@/lib/game/store'
import type { Pronto } from '@/lib/game/types'

function escolher(p: Pronto) {
  jogo.set((s) => ({ ...s, investigador: investigadorDePronto(p) }))
}

export function Abertura({ onCriar }: { onCriar: () => void }) {
  return (
    <main className="min-h-dvh">
      <section className="relative isolate flex min-h-[88dvh] flex-col justify-end overflow-hidden">
        <Image
          src="/images/saint-village-noir.png"
          alt="Saint Village em 1934: o porto sob chuva e neblina visto pelas persianas de um escritório, com a Ponte inacabada ao fundo"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-55"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/10" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-32 md:pb-24">
          <p className="animate-rise font-display text-xs uppercase tracking-[0.5em] text-primary">
            Um RPG investigativo solo · film noir
          </p>
          <h1 className="animate-rise font-display text-6xl font-bold uppercase leading-[0.9] tracking-tight text-balance md:text-8xl lg:text-9xl [animation-delay:120ms]">
            Saint Village
            <span className="block text-primary lamp-glow">1934</span>
          </h1>
          <div className="flex max-w-xl animate-rise flex-col gap-3 [animation-delay:240ms]">
            <p className="text-lg leading-relaxed text-pretty">
              {
                'Choveu a semana inteira. A Lei Seca acabou, mas ninguém avisou os Moretti, e meu último cliente pagou adiantado. Ninguém paga adiantado por boa notícia.'
              }
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Um narrador de IA conhece as nove regiões, as facções e os sessenta Personagens do Diretor. Você traz um
              dado de seis faces e a sua consciência.
            </p>
          </div>
          <a
            href="#investigadores"
            className="mt-2 inline-flex w-fit animate-rise items-center gap-3 bg-primary px-6 py-3 font-display text-sm uppercase tracking-[0.3em] text-primary-foreground transition-opacity hover:opacity-90 [animation-delay:360ms]"
          >
            Escolher investigador
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <section id="investigadores" className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
        <header className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl uppercase tracking-wide">Quem está investigando?</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Doze fichas prontas do livro. Ou monte a sua com os 30 pontos da regra solo.
            </p>
          </div>
          <button
            onClick={onCriar}
            className="inline-flex w-fit items-center gap-2 border border-primary px-5 py-3 font-display text-sm uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <FilePlus2 className="size-4" aria-hidden="true" />
            Montar a minha ficha
          </button>
        </header>

        <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PRONTOS.map((p) => {
            const arq = arquetipoPorNome(p.arq)
            return (
              <li key={p.nome} className="bg-background">
                <button
                  onClick={() => escolher(p)}
                  className="group flex h-full w-full flex-col gap-3 p-6 text-left transition-colors hover:bg-card focus-visible:bg-card"
                >
                  <span className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {p.arq} · {arq?.grupo}
                  </span>
                  <span className="font-display text-2xl uppercase leading-tight group-hover:text-primary">
                    {p.nome}
                  </span>
                  <span className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{p.conceito}</span>
                  <span className="mt-auto flex items-center justify-between pt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    <span>{p.ori}</span>
                    <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      Assumir o caso →
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <footer className="pt-8 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Baseado em Saint Village XX Century, por Felipe Malorgio
        </footer>
      </section>
    </main>
  )
}
