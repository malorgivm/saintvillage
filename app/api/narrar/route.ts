import { google } from '@ai-sdk/google'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  generateText,
  isStepCount,
  streamText,
  toUIMessageStream,
} from 'ai'
import { z } from 'zod'
import { instrucoesNarrador } from '@/lib/game/prompt'
import { ferramentasNarrador, type MensagemCronica } from '@/lib/game/tools'
import type { Caso, Cena, Investigador } from '@/lib/game/types'

export const maxDuration = 60

const pedidoLegado = z.object({
  system: z.string().max(24000).default(''),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(20000),
  })).min(1).max(32),
  max_tokens: z.number().int().positive().max(2000).optional(),
})

type Corpo = {
  messages: MensagemCronica[]
  investigador: Investigador
  caso: Caso
  cena: Cena
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ erro: 'Pedido inválido.' }, { status: 400 })
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { erro: 'Configure GOOGLE_GENERATIVE_AI_API_KEY para ativar o narrador Gemini.' },
      { status: 503 },
    )
  }

  if (typeof body === 'object' && body !== null && 'system' in body) {
    const pedido = pedidoLegado.safeParse(body)
    if (!pedido.success) {
      return Response.json({ erro: 'Pedido do narrador inválido.' }, { status: 400 })
    }

    const totalCaracteres = pedido.data.system.length + pedido.data.messages.reduce((total, mensagem) => total + mensagem.content.length, 0)
    if (totalCaracteres > 50000) {
      return Response.json({ erro: 'O histórico enviado é longo demais.' }, { status: 413 })
    }

    try {
      const result = await generateText({
        model: google('gemini-3.5-flash-lite'),
        system: pedido.data.system,
        messages: pedido.data.messages,
        maxOutputTokens: Math.min(pedido.data.max_tokens ?? 900, 1500),
        providerOptions: {
          google: {
            thinkingConfig: { thinkingLevel: 'minimal' },
          },
        },
      })
      if (!result.text.trim()) {
        return Response.json({ erro: 'O narrador não gerou uma resposta. Tente novamente.' }, { status: 502 })
      }
      return Response.json({ text: result.text })
    } catch (error) {
      console.error('Narrador Gemini falhou:', error)
      return Response.json({ erro: 'O narrador não respondeu.' }, { status: 502 })
    }
  }

  const { messages, investigador, caso, cena } = body as Corpo
  if (!investigador || !Array.isArray(messages)) {
    return Response.json({ erro: 'Ficha ausente.' }, { status: 400 })
  }

  const recentes = messages.slice(-24)
  const inicio = recentes.findIndex((m) => m.role === 'user')

  const result = streamText({
    model: google('gemini-3.5-flash'),
    instructions: instrucoesNarrador(investigador, caso, cena),
    messages: await convertToModelMessages(inicio > 0 ? recentes.slice(inicio) : recentes),
    tools: ferramentasNarrador,
    stopWhen: isStepCount(4),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onError: (e) => {
        console.error('Narrador falhou:', e)
        return 'O narrador não respondeu.'
      },
    }),
  })
}
