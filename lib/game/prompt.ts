import { arquetipoPorNome, npcPorNome, NPCS, REGRAS, regiaoPorNome } from './data'
import { estadoIntegridade, estadoSangueFrio, estadoVitalidade, reservaDisponivel } from './rules'
import type { Caso, Cena, Investigador } from './types'

function ficha(i: Investigador) {
  const arq = arquetipoPorNome(i.oficio)
  const inv = Object.entries(i.inv)
    .filter(([, n]) => n > 0)
    .map(([h, n]) => `${h} ${n} (reserva ${reservaDisponivel(i, h)})`)
    .join(', ')
  return [
    `Nome: ${i.nome} · Ofício: ${i.oficio} · Trilha: ${i.trilha} · Origem: ${i.origem} · Motivação: ${i.motivacao}`,
    `Conceito: ${i.conceito}`,
    arq ? `Benefício (uma vez por caso): ${arq.v}\nDesvantagem (você aplica uma vez por caso): ${arq.p}` : '',
    `Investigativas: ${inv || 'nenhuma'}. Habilidades em 0 não garantem pista central (custam 1 Ímpeto).`,
    `Especialidades gerais (+1): ${i.esp.join(', ')}`,
    `Vitalidade ${i.vitalidade} (${estadoVitalidade(i.vitalidade).nome}) · Sangue-Frio ${i.sangueFrio} (${estadoSangueFrio(i.sangueFrio).nome}) · Integridade ${i.integridade} (${estadoIntegridade(i.integridade).nome}) · Ímpeto ${i.impeto}/3`,
    `Vício: ${i.vicio} (doses neste caso: ${i.doses}/3) · Fontes de Sangue-Frio: ${i.fontes}`,
    `Segredo (traga à tona UMA vez, no pior momento): ${i.segredo}`,
    `Equipamento: ${i.equip}`,
    i.cicatrizes.length ? `Cicatrizes: ${i.cicatrizes.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n')
}

function caso(c: Caso) {
  if (!c.aberto) return 'Nenhum caso aberto ainda.'
  const v = c.verdade
  return [
    `Título: ${c.titulo || '(sem título — chame abrirCaso)'} · Premissa: ${c.premissa}`,
    v
      ? `VERDADE OCULTA (nunca revele diretamente; deixe as pistas conduzirem): cliente ${v.cliente}; crime ${v.crime}; vítima ${v.vitima}; culpado ${v.culpado}; motivo ${v.motivo}; reviravolta ${v.reviravolta}.`
      : 'Verdade: invente uma coerente com a cidade e mantenha-a.',
    `Pistas anotadas: ${c.pistas.map((p) => p.texto).join(' | ') || 'nenhuma'}`,
    `Provas: ${c.provas.map((p) => `${p.texto} (${p.peso})`).join(' | ') || 'nenhuma'} · Peso necessário ${c.alvo}`,
    `Vantagens: ${c.vantagens.map((m) => m.nome).join(', ') || 'nenhuma'}`,
    `Problemas ativos: ${c.problemas.map((m) => m.nome).join(', ') || 'nenhum'}`,
  ].join('\n')
}

function cena(c: Cena) {
  const r = regiaoPorNome(c.regiao)
  const partes: string[] = []
  if (r) {
    partes.push(
      `Região: ${r.nome} · Dono: ${r.dono} · Dificuldade ${r.dif} · Perigo ${r.perigo}\n${r.resumo}\nLugares: ${r.lugares.map(([n, d]) => `${n} (${d})`).join('; ')}`,
    )
    const outros = NPCS.filter((n) => n.r === r.nome && !c.presentes.includes(n.n))
    partes.push(`Outros Personagens do Diretor da região: ${outros.map((n) => `${n.n} — ${n.p}`).join('; ')}`)
  } else {
    partes.push('Região ainda não definida. Escolha uma com mudarCena quando a cena começar.')
  }
  const presentes = c.presentes.map(npcPorNome).filter(Boolean)
  if (presentes.length) {
    partes.push(
      'EM CENA (dê voz a eles):\n' +
        presentes
          .map(
            (n) =>
              `- ${n!.n}, ${n!.p}. ${n!.d} Virtude: ${n!.v} Pecado: ${n!.pe} Quer: ${n!.q} Teme: ${n!.t} Alianças: ${n!.a}`,
          )
          .join('\n'),
    )
  }
  return partes.join('\n\n')
}

export function instrucoesNarrador(i: Investigador, c: Caso, cn: Cena) {
  return `Você é o Narrador e Diretor de SAINT VILLAGE 1934, um RPG investigativo GUMSHOE ao estilo film noir, jogado SOLO em português do Brasil. Saint Village é uma metrópole portuária fictícia da Costa Oeste, 1934: a Lei Seca acabou, a Ponte está sendo construída sobre cadáveres, Moretti, a Irmandade Irlandesa e o Lótus disputam a cidade, e a neblina cobre tudo depois das 18h.

ESTILO
- Prosa noir em segunda pessoa, presente do indicativo. Frases curtas, concretas, sensoriais: chuva, fumaça, néon pouco, muito concreto molhado. Diálogos com travessão, cada Personagem do Diretor com voz própria.
- Entre 2 e 4 parágrafos por resposta. Termine sempre com uma situação aberta que convide a agir. Nunca liste opções numeradas.
- Nunca decida pelo investigador. Nunca revele a verdade oculta de graça.

REGRAS (aplique com rigor, usando as ferramentas)
${REGRAS}

PROTOCOLO DE FERRAMENTAS
- Escreva a narração PRIMEIRO, depois chame as ferramentas de registro (anotarPista, registrarProva, marcar, alterarCondicao, mudarCena, abrirCaso, ganharImpeto, resolverProblema).
- Investigar NUNCA rola dado: se o investigador procura com a habilidade investigativa certa (nível 1+), dê a pista central e chame anotarPista com central=true. Se ele tiver reserva, você pode oferecerBeneficio.
- Ação geral arriscada: narre até o momento decisivo e chame pedirTeste. Não narre o resultado na mesma resposta.
- Quando receber o resultado de um teste: Revés (1–2) → narre a falha e chame marcar(problema). Empate (3–4) → consegue com custo. Avanço (5+) → consegue; numa cena importante, marcar(vantagem). Comece com uma frase curta entre colchetes explicando a regra aplicada (dado, modificadores, faixa), depois narre.
- Horror ou culpa → pedirChoque. A perda de Sangue-Frio de um choque falho já é aplicada automaticamente; não repita com alterarCondicao.
- Mensagens marcadas [DIRETOR] são perguntas fora do jogo: responda como mestre de mesa, curto e claro, sem narrar e sem ferramentas.
- Mensagens marcadas [FALA] são o que o investigador diz em voz alta. [AÇÃO] é o que ele faz.

INVESTIGADOR
${ficha(i)}

CASO
${caso(c)}

CENA ATUAL
${cena(cn)}`
}
