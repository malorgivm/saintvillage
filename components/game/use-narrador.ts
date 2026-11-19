'use client'

import { useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { aplicarEfeito } from '@/lib/game/efeitos'
import { carregarCronica, jogo, salvarCronica } from '@/lib/game/store'
import { FERRAMENTAS_INTERATIVAS, type MensagemCronica } from '@/lib/game/tools'

const INTERATIVAS = new Set<string>(FERRAMENTAS_INTERATIVAS.map((n) => `tool-${n}`))

function aguardandoNarrador({ messages }: { messages: MensagemCronica[] }) {
  const ultima = messages.at(-1)
  if (!ultima || ultima.role !== 'assistant') return false
  const partes = ultima.parts
  const indices = partes.flatMap((p, i) => (INTERATIVAS.has(p.type) ? [i] : []))
  if (!indices.length) return false
  const todasResolvidas = indices.every((i) => (partes[i] as { state?: string }).state === 'output-available')
  const textoDepois = partes
    .slice(indices.at(-1)! + 1)
    .some((p) => p.type === 'text' && p.text.trim().length > 0)
  return todasResolvidas && !textoDepois
}

const transporte = new DefaultChatTransport<MensagemCronica>({
  api: '/api/narrar',
  body: () => {
    const s = jogo.get()
    return { investigador: s.investigador, caso: s.caso, cena: s.cena }
  },
})

export type Modo = 'AÇÃO' | 'FALA' | 'DIRETOR'

export function useNarrador() {
  const [iniciais] = useState(() => carregarCronica() as MensagemCronica[])
  const chat = useChat<MensagemCronica>({
    messages: iniciais,
    transport: transporte,
    sendAutomaticallyWhen: aguardandoNarrador,
  })
  const { messages, status } = chat

  useEffect(() => {
    const aplicados = new Set(jogo.get().aplicados)
    const novos: { id: string; nome: string; entrada: Record<string, unknown> }[] = []
    for (const m of messages) {
      if (m.role !== 'assistant') continue
      for (const p of m.parts) {
        if (!p.type.startsWith('tool-') || INTERATIVAS.has(p.type)) continue
        const parte = p as { toolCallId: string; state: string; input: Record<string, unknown> }
        if (parte.state !== 'output-available' || aplicados.has(parte.toolCallId)) continue
        novos.push({ id: parte.toolCallId, nome: p.type.slice(5), entrada: parte.input })
      }
    }
    if (!novos.length) return
    jogo.set((s) => {
      let r = s
      for (const e of novos) r = aplicarEfeito(r, e)
      return { ...r, aplicados: [...r.aplicados, ...novos.map((e) => e.id)].slice(-400) }
    })
  }, [messages])

  useEffect(() => {
    if (status === 'ready' || status === 'error') salvarCronica(messages)
  }, [status, messages])

  const ocupado = status === 'submitted' || status === 'streaming'

  function enviar(texto: string, modo: Modo = 'AÇÃO') {
    if (ocupado || !texto.trim()) return
    chat.sendMessage({ text: `[${modo}] ${texto.trim()}` })
  }

  function enviarSistema(texto: string) {
    if (ocupado) return
    chat.sendMessage({ text: texto })
  }

  function limpar() {
    chat.setMessages([])
    salvarCronica([])
  }

  return { ...chat, ocupado, enviar, enviarSistema, limpar }
}

export type Narrador = ReturnType<typeof useNarrador>
