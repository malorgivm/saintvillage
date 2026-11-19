import { tool, type InferUITools, type UIMessage } from 'ai'
import { z } from 'zod'
import { GERAIS, INVESTIGATIVAS, NOMES_REGIOES } from './data'

const registrado = async () => ({ ok: true })

export const ferramentasNarrador = {
  pedirTeste: tool({
    description:
      'Pare a narração e peça ao jogador um teste de habilidade GERAL (1d6 + modificadores) quando o resultado for incerto e o fracasso tornar a história mais interessante. Nunca use para investigar. Depois de chamar, não narre o resultado: espere.',
    inputSchema: z.object({
      habilidade: z.enum(GERAIS as [string, ...string[]]),
      motivo: z.string().describe('O que está em jogo, em uma frase curta'),
      problema: z
        .string()
        .optional()
        .describe('Nome exato de um Problema ativo do caderno que atrapalha este teste, se houver'),
    }),
    outputSchema: z.object({
      dado: z.number(),
      modificadores: z.string(),
      total: z.number(),
      resultado: z.enum(['Revés', 'Empate', 'Avanço']),
      impetoGasto: z.boolean(),
    }),
  }),
  pedirChoque: tool({
    description:
      'Peça um choque de Sangue-Frio: horror (o que o investigador vê) ou culpa (o que ele faz). O valor é a perda se falhar. Exemplos: briga violenta 2, cadáver fresco 3, criança morta 5, ver alguém que ama morrer 7. Depois de chamar, espere o resultado.',
    inputSchema: z.object({
      tipo: z.enum(['horror', 'culpa']),
      valor: z.number().int().min(1).max(7),
      motivo: z.string(),
    }),
    outputSchema: z.object({
      dado: z.number(),
      alvo: z.number(),
      passou: z.boolean(),
      perda: z.number(),
      cicatriz: z.string().optional(),
    }),
  }),
  oferecerBeneficio: tool({
    description:
      'Ofereça um benefício investigativo extra (além da pista central), que o jogador pode pagar com 1 ponto de reserva da habilidade ou 1 Ímpeto. Depois de chamar, espere a escolha.',
    inputSchema: z.object({
      habilidade: z.enum(INVESTIGATIVAS as [string, ...string[]]),
      beneficio: z.string().describe('O que o jogador ganha se pagar'),
    }),
    outputSchema: z.object({ pago: z.enum(['reserva', 'impeto', 'recusou']) }),
  }),
  anotarPista: tool({
    description:
      'Anote uma pista no caderno. Pistas centrais nunca exigem rolagem: chegam quando o investigador usa a habilidade investigativa certa no lugar certo.',
    inputSchema: z.object({
      texto: z.string().describe('A pista, em uma frase objetiva'),
      habilidade: z.string(),
      central: z.boolean(),
    }),
    execute: registrado,
  }),
  registrarProva: tool({
    description:
      'Registre uma prova com Peso: indício 1; prova física, documento, testemunho ou laudo 2; confissão 3.',
    inputSchema: z.object({
      texto: z.string(),
      peso: z.number().int().min(1).max(3),
    }),
    execute: registrado,
  }),
  alterarCondicao: tool({
    description:
      'Aplique mudanças na ficha: dano de Vitalidade, perda ou ganho de Sangue-Frio, queda ou subida de Integridade (jogadas sujas). Use números negativos para perdas. Não use para choques (use pedirChoque).',
    inputSchema: z.object({
      vitalidade: z.number().int().min(-12).max(12).optional(),
      sangueFrio: z.number().int().min(-12).max(12).optional(),
      integridade: z.number().int().min(-3).max(3).optional(),
      motivo: z.string(),
    }),
    execute: registrado,
  }),
  marcar: tool({
    description:
      'Marque uma Vantagem (depois de um Avanço numa cena importante) ou um Problema (depois de um Revés, ou um Empate com custo). Dê um nome curto e concreto.',
    inputSchema: z.object({
      tipo: z.enum(['vantagem', 'problema']),
      nome: z.string().max(40),
    }),
    execute: registrado,
  }),
  resolverProblema: tool({
    description: 'Retire um Problema do caderno quando o investigador lidou com ele em cena.',
    inputSchema: z.object({ nome: z.string() }),
    execute: registrado,
  }),
  mudarCena: tool({
    description:
      'Mude a região da cena e quem está presente (nomes exatos dos Personagens do Diretor). Chame sempre que a cena mudar de lugar.',
    inputSchema: z.object({
      regiao: z.enum(NOMES_REGIOES),
      lugar: z.string().optional().describe('O lugar específico dentro da região'),
      presentes: z.array(z.string()).max(6).optional(),
    }),
    execute: registrado,
  }),
  ganharImpeto: tool({
    description:
      'Dê +1 Ímpeto SOMENTE quando o investigador agir pela motivação contra o próprio interesse, ou quando o Segredo vier à tona.',
    inputSchema: z.object({ motivo: z.string() }),
    execute: registrado,
  }),
  abrirCaso: tool({
    description:
      'Dê título e premissa ao caso quando ele começar. A premissa é o que o investigador sabe, nunca a verdade.',
    inputSchema: z.object({ titulo: z.string().max(60), premissa: z.string().max(280) }),
    execute: registrado,
  }),
}

export type FerramentasNarrador = InferUITools<typeof ferramentasNarrador>
export type MensagemCronica = UIMessage<never, never, FerramentasNarrador>
export const FERRAMENTAS_INTERATIVAS = ['pedirTeste', 'pedirChoque', 'oferecerBeneficio'] as const
