import era from '@/lib/data/era-1934.json'
import cidade from '@/lib/data/cidade-1934.json'
import type { Arquetipo, Npc, Origem, Pronto, Regiao } from './types'

export const GERAIS: string[] = era.gerais
export const GRUPOS_GERAIS = era.gruposGerais as [string, string[]][]
export const GRUPOS_INV = era.gruposInv as [string, string[]][]
export const INVESTIGATIVAS: string[] = GRUPOS_INV.flatMap(([, h]) => h)
export const HAB_DESC = era.habDesc as Record<string, string>
export const ARQUETIPOS = era.arquetipos as Arquetipo[]
export const ORIGENS = era.origens as Origem[]
export const MOTIVACOES: string[] = era.motivacoes
export const ARMAS = era.armas as [string, number][]
export const CHOQUES = era.choques as [string, number][]
export const CICATRIZES: string[] = era.cicatrizes
export const GERADOR = era.gerador as Record<
  'cliente' | 'crime' | 'vitima' | 'culpado' | 'motivo' | 'reviravolta',
  string[]
>
export const REGRAS: string = era.regras
export const PRONTOS = era.prontos as unknown as Pronto[]
export const VANTAGENS_SUGERIDAS: string[] = era.vantagens
export const PROBLEMAS_SUGERIDOS: string[] = era.problemas

export const REGIOES = cidade.regioes as Regiao[]
export const NPCS = cidade.npcs as Npc[]
export const NOMES_REGIOES = REGIOES.map((r) => r.nome) as [string, ...string[]]

export const TRILHAS: Record<string, string> = {
  Pena: 'O que você sabe. Diplomas, arquivos, o nome certo na hora certa.',
  Distintivo: 'Quem o respalda. Uma instituição, uma licença, um sobrenome.',
  Navalha: 'A rua e o próprio corpo. Ninguém o respalda; a navalha no bolso é tudo.',
}

export const ALVOS_PESO: [number, string][] = [
  [4, 'Ninguém importante'],
  [6, 'Alguém com advogado'],
  [9, 'Protegido por facção'],
  [12, 'Gente do topo'],
]

export function arquetipoPorNome(nome: string) {
  return ARQUETIPOS.find((a) => a.n === nome)
}

export function regiaoPorNome(nome: string | null) {
  if (!nome) return undefined
  return REGIOES.find((r) => r.nome === nome)
}

export function npcPorNome(nome: string) {
  return NPCS.find((n) => n.n === nome)
}
