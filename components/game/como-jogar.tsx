import { Rotulo } from './pecas'

const SECOES: [string, string][] = [
  [
    'Investigue, não role',
    'Diga o que você faz e onde procura. Se usar a habilidade investigativa certa (nível 1+), a pista central chega sem dado e vai para o caderno. Benefícios extras custam 1 de reserva da habilidade ou 1 Ímpeto.',
  ],
  [
    'Role quando houver risco',
    'Ações gerais incertas viram um teste: 1d6 + modificadores. Revés (1–2) traz um Problema. Empate (3–4) consegue com custo, ou gaste 1 Ímpeto para virar Avanço. Avanço (5+) consegue e, numa cena importante, rende uma Vantagem.',
  ],
  [
    'Modificadores',
    '+1 se a habilidade é uma das suas três especialidades. −1 Ferido (Vitalidade 0 ou menos). −1 Abalado (Sangue-Frio 0 ou menos). −1 por um Problema ativo que atrapalhe.',
  ],
  [
    'Choques de Sangue-Frio',
    'Horror (o que você vê) ou culpa (o que você faz): 1d6 contra 4. Abalado, contra 5. Culpa com Integridade 8+ é contra 5; com 3 ou menos, contra 3. Falhou: perde o valor do choque.',
  ],
  [
    'Ímpetos',
    'Começa com 1, máximo 3. Só volta agindo pela motivação contra o próprio interesse, ou quando o Segredo vem à tona.',
  ],
  [
    'Vício',
    'Três doses por caso, cada uma +2 de Sangue-Frio. A terceira é a recaída: o vício cobra no 1d6 (ressaca, dívida, visto, língua solta ou apagão).',
  ],
  [
    'Provas e clímax',
    'Indício 1 · prova física, documento, testemunho ou laudo 2 · confissão 3. O Peso necessário depende de quem você acusa: 4, 6, 9 ou 12. No clímax, mais Vantagens que Problemas: a verdade vence.',
  ],
  [
    'Perguntar ao Diretor',
    'Use a aba “Perguntar ao Diretor” para dúvidas de regra fora da ficção. “Fala” é o que seu investigador diz em voz alta; “Ação” é o que ele faz.',
  ],
]

export function ComoJogar() {
  return (
    <div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
      {SECOES.map(([t, d]) => (
        <section key={t} className="flex flex-col gap-2">
          <Rotulo className="text-primary">{t}</Rotulo>
          <p className="text-sm leading-relaxed">{d}</p>
        </section>
      ))}
    </div>
  )
}
