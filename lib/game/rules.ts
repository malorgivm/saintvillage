import { arquetipoPorNome, INVESTIGATIVAS, ORIGENS } from './data'
import type { Caso, Investigador, Pronto } from './types'

export const PONTOS_INVESTIGATIVOS = 30
export const PONTOS_CONDICAO = 24
export const MAX_IMPETO = 3

export const rolarD6 = () => 1 + Math.floor(Math.random() * 6)
export const rolarD8 = () => 1 + Math.floor(Math.random() * 8)
export const uid = () => Math.random().toString(36).slice(2, 10)

export type Faixa = 'Revés' | 'Empate' | 'Avanço'

export function faixa(total: number): Faixa {
  if (total <= 2) return 'Revés'
  if (total <= 4) return 'Empate'
  return 'Avanço'
}

export function estadoVitalidade(v: number) {
  if (v <= -12) return { nome: 'Morto', efeito: 'fim da linha' }
  if (v <= -6) return { nome: 'Grave', efeito: 'não luta' }
  if (v <= 0) return { nome: 'Ferido', efeito: '−1 nos testes, sem benefícios' }
  return { nome: 'Inteiro', efeito: 'normal' }
}

export function estadoSangueFrio(v: number) {
  if (v <= -12) return { nome: 'Perdido', efeito: 'sai de jogo' }
  if (v <= -6) return { nome: 'Por um fio', efeito: 'ganha uma cicatriz' }
  if (v <= 0) return { nome: 'Abalado', efeito: '−1 nos testes' }
  return { nome: 'Intacto', efeito: 'normal' }
}

export function estadoIntegridade(v: number) {
  if (v >= 9) return { nome: 'Limpo', efeito: 'alguém honesto ajuda sem pedir' }
  if (v >= 6) return { nome: 'Manchado', efeito: 'sem efeito' }
  if (v >= 3) return { nome: 'Sujo', efeito: 'uma jogada antiga volta para cobrar' }
  if (v >= 1) return { nome: 'Comprado', efeito: 'alguém dá ordens' }
  return { nome: 'Perdido', efeito: 'vira Personagem do Diretor' }
}

export function limiarAcerto(inv: Investigador) {
  return inv.esp.includes('Fôlego e Resistência') ? 4 : 3
}

export function reservaDisponivel(inv: Investigador, hab: string) {
  const nivel = inv.inv[hab] ?? 0
  return Math.max(0, nivel - 1 - (inv.gastos[hab] ?? 0))
}

export function modificadoresTeste(inv: Investigador, habilidade: string, problema?: string) {
  const mods: { rotulo: string; valor: number }[] = []
  if (inv.esp.includes(habilidade)) mods.push({ rotulo: 'Especialidade', valor: 1 })
  if (inv.vitalidade <= 0) mods.push({ rotulo: 'Ferido', valor: -1 })
  if (inv.sangueFrio <= 0) mods.push({ rotulo: 'Abalado', valor: -1 })
  if (problema) mods.push({ rotulo: `Problema: ${problema}`, valor: -1 })
  return mods
}

export function alvoChoque(inv: Investigador, tipo: 'horror' | 'culpa') {
  if (tipo === 'culpa') {
    if (inv.integridade >= 8) return 5
    if (inv.integridade <= 3) return 3
    return 4
  }
  return inv.sangueFrio <= 0 ? 5 : 4
}

export function veredito(caso: Caso) {
  const v = caso.vantagens.length
  const p = caso.problemas.length
  const peso = caso.provas.reduce((s, x) => s + x.peso, 0)
  const resultado = v > p ? 'A verdade vence' : v === p ? 'Vence pela metade' : 'A cidade vence'
  const forum = peso >= caso.alvo ? 'as provas sobrevivem ao Fórum' : 'as provas não bastam no Fórum'
  return { v, p, peso, resultado, forum, texto: `${resultado} (${v} × ${p}); Peso ${peso} de ${caso.alvo}: ${forum}.` }
}

export function casoVazio(): Caso {
  return {
    aberto: false,
    titulo: '',
    premissa: '',
    verdade: null,
    pistas: [],
    provas: [],
    alvo: 4,
    vantagens: [],
    problemas: [],
  }
}

export function investigadorDePronto(p: Pronto): Investigador {
  const arq = arquetipoPorNome(p.arq)
  return {
    nome: p.nome,
    oficio: p.arq,
    trilha: arq?.grupo ?? 'Pena',
    origem: p.ori,
    motivacao: p.mot,
    conceito: p.conceito,
    inv: { ...p.inv },
    gastos: {},
    esp: [...p.esp],
    vicio: p.vicio,
    fontes: p.fontes,
    segredo: p.segredo,
    equip: p.equip,
    vitalidade: 8,
    sangueFrio: 8,
    integridade: 8,
    sfInicial: 8,
    impeto: 1,
    doses: 0,
    cicatrizes: [],
  }
}

export function sugestaoInvestigativas(oficio: string, origem: string) {
  const arq = arquetipoPorNome(oficio)
  const sugeridas = (arq?.inv ?? '')
    .split('·')[0]
    .split(',')
    .map((s) => s.trim())
    .filter((s) => INVESTIGATIVAS.includes(s))
  const daOrigem = ORIGENS.find((o) => o.n === origem)?.pt
  const inv: Record<string, number> = {}
  for (const h of sugeridas) inv[h] = 3
  if (daOrigem && !inv[daOrigem]) inv[daOrigem] = 2
  let total = Object.values(inv).reduce((a, b) => a + b, 0)
  for (const h of INVESTIGATIVAS) {
    if (total >= PONTOS_INVESTIGATIVOS) break
    if (!inv[h]) {
      inv[h] = 1
      total += 1
    }
  }
  return inv
}

export function sugestaoEspecialidades(oficio: string) {
  const arq = arquetipoPorNome(oficio)
  const parte = (arq?.inv ?? '').split('gerais:')[1] ?? ''
  return parte
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
