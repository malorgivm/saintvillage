import { cn } from '@/lib/utils'

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 26], [72, 26], [28, 50], [72, 50], [28, 74], [72, 74]],
}

export function DadoSeis({
  valor,
  rolando,
  tamanho = 64,
  className,
}: {
  valor: number | null
  rolando?: boolean
  tamanho?: number
  className?: string
}) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 100 100"
      role="img"
      aria-label={valor ? `Dado: ${valor}` : 'Dado ainda não rolado'}
      className={cn('shrink-0', rolando && 'animate-tumble', className)}
      key={rolando ? `r-${valor}` : `s-${valor}`}
    >
      <rect x="6" y="6" width="88" height="88" rx="14" className="fill-foreground" />
      <rect x="6" y="6" width="88" height="88" rx="14" fill="none" className="stroke-background/30" strokeWidth="2" />
      {valor
        ? PIPS[valor].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="8" className="fill-background" />)
        : <text x="50" y="62" textAnchor="middle" className="fill-background font-display" fontSize="36">?</text>}
    </svg>
  )
}

export function DadoOito({ valor, rolando, atraso = 0 }: { valor: number | null; rolando?: boolean; atraso?: number }) {
  return (
    <span
      className={cn(
        'flex size-10 shrink-0 rotate-45 items-center justify-center rounded-sm border border-primary/60 bg-secondary',
        rolando && 'animate-tumble',
      )}
      style={{ animationDelay: `${atraso}ms` }}
      aria-hidden="true"
    >
      <span className="-rotate-45 font-display text-lg text-primary">{valor ?? '·'}</span>
    </span>
  )
}
