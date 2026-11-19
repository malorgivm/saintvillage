'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export function Janela({
  aberta,
  onFechar,
  titulo,
  children,
}: {
  aberta: boolean
  onFechar: () => void
  titulo: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (aberta && !d.open) d.showModal()
    if (!aberta && d.open) d.close()
  }, [aberta])

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      onClick={(e) => e.target === ref.current && onFechar()}
      aria-label={titulo}
      className="m-auto max-h-[88dvh] w-[min(56rem,calc(100vw-2rem))] border border-border bg-background p-0 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4">
        <h2 className="font-display text-xl uppercase tracking-wide">{titulo}</h2>
        <button onClick={onFechar} aria-label="Fechar" className="text-muted-foreground hover:text-foreground">
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="px-6 py-6">{aberta && children}</div>
    </dialog>
  )
}
