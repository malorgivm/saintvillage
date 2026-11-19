export type Arquetipo = {
  n: string
  grupo: 'Pena' | 'Distintivo' | 'Navalha'
  v: string
  p: string
  inv: string
  funde?: string
}

export type Pronto = {
  nome: string
  arq: string
  ori: string
  mot: string
  conceito: string
  inv: Record<string, number>
  esp: string[]
  vicio: string
  fontes: string
  segredo: string
  equip: string
}

export type Origem = { n: string; rep: string; pt: string; c: string }

export type Regiao = {
  nome: string
  dono: string
  dif: number
  perigo: string
  resumo: string
  lugares: [string, string][]
}

export type Npc = {
  n: string
  p: string
  r: string
  d: string
  v: string
  pe: string
  q: string
  t: string
  a: string
}

export type Investigador = {
  nome: string
  oficio: string
  trilha: string
  origem: string
  motivacao: string
  conceito: string
  inv: Record<string, number>
  gastos: Record<string, number>
  esp: string[]
  vicio: string
  fontes: string
  segredo: string
  equip: string
  vitalidade: number
  sangueFrio: number
  integridade: number
  sfInicial: number
  impeto: number
  doses: number
  cicatrizes: string[]
}

export type Pista = { id: string; texto: string; habilidade: string; central: boolean }
export type Prova = { id: string; texto: string; peso: number }
export type Marca = { id: string; nome: string }

export type Gerado = {
  cliente: string
  crime: string
  vitima: string
  culpado: string
  motivo: string
  reviravolta: string
}

export type Caso = {
  aberto: boolean
  titulo: string
  premissa: string
  verdade: Gerado | null
  pistas: Pista[]
  provas: Prova[]
  alvo: number
  vantagens: Marca[]
  problemas: Marca[]
}

export type Cena = { regiao: string | null; presentes: string[] }

export type Arquivado = { titulo: string; veredito: string; data: string }

export type Save = {
  versao: 1
  investigador: Investigador | null
  caso: Caso
  cena: Cena
  aplicados: string[]
  arquivo: Arquivado[]
}
