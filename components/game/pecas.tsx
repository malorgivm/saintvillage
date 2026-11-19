import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Rotulo({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('font-display text-[11px] uppercase tracking-[0.28em] text-muted-foreground', className)}>
      {children}
    </span>
  )
}

export function Passo({
  valor,
  onChange,
  min,
  max,
  rotulo,
  compacto,
}: {
  valor: number
  onChange: (v: number) => void
  min: number
  max: number
  rotulo: string
  compacto?: boolean
}) {
  const tam = compacto ? 'size-6' : 'size-8'
  return (
    <div className="flex items-center gap-1" role="group" aria-label={rotulo}>
      <button
        type="button"
        onClick={() => onChange(valor - 1)}
        disabled={valor <= min}
        aria-label={`Diminuir ${rotulo}`}
        className={cn(tam, 'flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground')}
      >
        <Minus className="size-3" aria-hidden="true" />
      </button>
      <span className={cn('text-center font-display tabular-nums', compacto ? 'w-6 text-base' : 'w-8 text-lg')} aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        onClick={() => onChange(valor + 1)}
        disabled={valor >= max}
        aria-label={`Aumentar ${rotulo}`}
        className={cn(tam, 'flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground')}
      >
        <Plus className="size-3" aria-hidden="true" />
      </button>
    </div>
  )
}

export function Pips({ total, cheios, className }: { total: number; cheios: number; className?: string }) {
  return (
    <span className={cn('flex gap-1', className)} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn('size-2 rotate-45', i < cheios ? 'bg-primary' : 'border border-muted-foreground/40')} />
      ))}
    </span>
  )
}

export function Medidor({
  valor,
  min,
  max,
  perigo = 0,
}: {
  valor: number
  min: number
  max: number
  perigo?: number
}) {
  const faixa = max - min
  const pos = ((valor - min) / faixa) * 100
  const zero = ((perigo - min) / faixa) * 100
  return (
    <div className="relative h-2 w-full bg-secondary" aria-hidden="true">
      <div
        className={cn('absolute inset-y-0 left-0 transition-all', valor <= perigo ? 'bg-destructive' : 'bg-foreground')}
        style={{ width: `${Math.max(0, pos)}%` }}
      />
      {perigo > min && <div className="absolute inset-y-0 w-px bg-primary" style={{ left: `${zero}%` }} />}
    </div>
  )
}

export const campo =
  'w-full border-0 border-b border-input bg-transparent px-0 py-2 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0'
