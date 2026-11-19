import { NPCS } from './data'
import { MAX_IMPETO, uid } from './rules'
import type { Investigador, Save } from './types'

const limitar = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

export function mudarInvestigador(s: Save, fn: (i: Investigador) => Investigador): Save {
  return s.investigador ? { ...s, investigador: fn(s.investigador) } : s
}

type Efeito = { nome: string; entrada: Record<string, unknown> }

export function aplicarEfeito(s: Save, { nome, entrada: e }: Efeito): Save {
  switch (nome) {
    case 'anotarPista': {
      const texto = String(e.texto ?? '')
      if (!texto || s.caso.pistas.some((p) => p.texto === texto)) return s
      return {
        ...s,
        caso: {
          ...s.caso,
          pistas: [
            ...s.caso.pistas,
            { id: uid(), texto, habilidade: String(e.habilidade ?? ''), central: Boolean(e.central) },
          ],
        },
      }
    }
    case 'registrarProva':
      return {
        ...s,
        caso: {
          ...s.caso,
          provas: [
            ...s.caso.provas,
            { id: uid(), texto: String(e.texto ?? ''), peso: limitar(Number(e.peso) || 1, 1, 3) },
          ],
        },
      }
    case 'alterarCondicao':
      return mudarInvestigador(s, (i) => ({
        ...i,
        vitalidade: limitar(i.vitalidade + (Number(e.vitalidade) || 0), -12, 12),
        sangueFrio: limitar(i.sangueFrio + (Number(e.sangueFrio) || 0), -12, 12),
        integridade: limitar(i.integridade + (Number(e.integridade) || 0), 0, 10),
      }))
    case 'marcar': {
      const chave = e.tipo === 'vantagem' ? 'vantagens' : 'problemas'
      const nome = String(e.nome ?? '').trim()
      if (!nome) return s
      return { ...s, caso: { ...s.caso, [chave]: [...s.caso[chave], { id: uid(), nome }] } }
    }
    case 'resolverProblema': {
      const alvo = String(e.nome ?? '').toLowerCase()
      const idx = s.caso.problemas.findIndex((p) => p.nome.toLowerCase() === alvo)
      if (idx < 0) return s
      return { ...s, caso: { ...s.caso, problemas: s.caso.problemas.filter((_, i) => i !== idx) } }
    }
    case 'mudarCena': {
      const conhecidos = new Set(NPCS.map((n) => n.n))
      const presentes = Array.isArray(e.presentes)
        ? (e.presentes as string[]).filter((n) => conhecidos.has(n))
        : s.cena.presentes
      return { ...s, cena: { regiao: String(e.regiao ?? s.cena.regiao), presentes } }
    }
    case 'ganharImpeto':
      return mudarInvestigador(s, (i) => ({ ...i, impeto: Math.min(MAX_IMPETO, i.impeto + 1) }))
    case 'abrirCaso':
      return {
        ...s,
        caso: {
          ...s.caso,
          aberto: true,
          titulo: s.caso.titulo || String(e.titulo ?? ''),
          premissa: s.caso.premissa || String(e.premissa ?? ''),
        },
      }
    default:
      return s
  }
}

export function descreverEfeito({ nome, entrada: e }: Efeito): string | null {
  switch (nome) {
    case 'anotarPista':
      return `${e.central ? 'Pista central' : 'Pista'} anotada · ${e.habilidade}`
    case 'registrarProva':
      return `Prova registrada · Peso ${e.peso}`
    case 'alterarCondicao': {
      const partes = [
        e.vitalidade ? `Vitalidade ${Number(e.vitalidade) > 0 ? '+' : ''}${e.vitalidade}` : '',
        e.sangueFrio ? `Sangue-Frio ${Number(e.sangueFrio) > 0 ? '+' : ''}${e.sangueFrio}` : '',
        e.integridade ? `Integridade ${Number(e.integridade) > 0 ? '+' : ''}${e.integridade}` : '',
      ].filter(Boolean)
      return partes.length ? `${partes.join(' · ')} — ${e.motivo}` : null
    }
    case 'marcar':
      return `${e.tipo === 'vantagem' ? 'Vantagem' : 'Problema'}: ${e.nome}`
    case 'resolverProblema':
      return `Problema resolvido: ${e.nome}`
    case 'mudarCena':
      return `Cena: ${e.lugar ? `${e.lugar}, ` : ''}${e.regiao}`
    case 'ganharImpeto':
      return `+1 Ímpeto — ${e.motivo}`
    case 'abrirCaso':
      return `Caso aberto: ${e.titulo}`
    default:
      return null
  }
}
