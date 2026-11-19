'use client'

import { useSyncExternalStore } from 'react'
import type { UIMessage } from 'ai'
import { casoVazio } from './rules'
import type { Save } from './types'

const CHAVE = 'saint-village-1934:arquivo'
const CHAVE_CRONICA = 'saint-village-1934:cronica'

function inicial(): Save {
  return {
    versao: 1,
    investigador: null,
    caso: casoVazio(),
    cena: { regiao: null, presentes: [] },
    aplicados: [],
    arquivo: [],
  }
}

let estado: Save = inicial()
let carregado = false
const ouvintes = new Set<() => void>()

function carregar() {
  if (carregado || typeof window === 'undefined') return
  carregado = true
  try {
    const bruto = window.localStorage.getItem(CHAVE)
    if (bruto) estado = { ...inicial(), ...JSON.parse(bruto) }
  } catch {
    estado = inicial()
  }
}

function persistir() {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(estado))
  } catch {}
}

export const jogo = {
  get(): Save {
    carregar()
    return estado
  },
  set(fn: (s: Save) => Save) {
    carregar()
    estado = fn(estado)
    persistir()
    ouvintes.forEach((l) => l())
  },
  subscribe(l: () => void) {
    ouvintes.add(l)
    return () => ouvintes.delete(l)
  },
  reset() {
    estado = inicial()
    persistir()
    salvarCronica([])
    ouvintes.forEach((l) => l())
  },
}

const servidor = inicial()

export function useJogo<T>(seletor: (s: Save) => T): T {
  return useSyncExternalStore(
    jogo.subscribe,
    () => seletor(jogo.get()),
    () => seletor(servidor),
  )
}

export function carregarCronica(): UIMessage[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(window.localStorage.getItem(CHAVE_CRONICA) ?? '[]')
  } catch {
    return []
  }
}

export function salvarCronica(mensagens: UIMessage[]) {
  try {
    window.localStorage.setItem(CHAVE_CRONICA, JSON.stringify(mensagens.slice(-80)))
  } catch {}
}
