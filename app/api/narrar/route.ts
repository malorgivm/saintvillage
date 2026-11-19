import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from 'ai'
import { instrucoesNarrador } from '@/lib/game/prompt'
import { ferramentasNarrador, type MensagemCronica } from '@/lib/game/tools'
import type { Caso, Cena, Investigador } from '@/lib/game/types'

export const maxDuration = 60

type Corpo = {
  messages: MensagemCronica[]
  investigador: Investigador
  caso: Caso
  cena: Cena
}

export async function POST(req: Request) {
  const { messages, investigador, caso, cena }: Corpo = await req.json()

  if (!investigador || !Array.isArray(messages)) {
    return Response.json({ erro: 'Ficha ausente.' }, { status: 400 })
  }

  const recentes = messages.slice(-24)
  const inicio = recentes.findIndex((m) => m.role === 'user')

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
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
