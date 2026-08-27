/**
 * Todo o conteúdo editável do site.
 *
 * Regra do briefing: nunca inventar credenciais, números, empresas ou datas.
 * O que não foi informado fica como "[INSIRA ...]" até você preencher.
 */

export const brand = {
  wordmark: "Maria Eduarda",
  role: "Contadora",
};

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#contato", label: "Contato" },
];

export const hero = {
  name: "Maria Eduarda",
  role: "Contadora",
  /** Frase curta de impacto — no espírito do briefing, sem texto genérico. */
  statement: "[INSIRA FRASE CURTA DE IMPACTO — ex.: “Cada número no lugar certo.”]",
  intro:
    "[INSIRA uma linha de apoio explicando, em termos concretos, o que ela entrega a quem a contrata.]",
  primaryCta: { label: "Falar com Maria", href: "#contato" },
  secondaryCta: { label: "Conhecer o trabalho", href: "#sobre" },
};

/** Capítulo de abertura da narrativa — uma frase grande, sozinha na tela. */
export const overture = {
  eyebrow: "Quem sou",
  statement:
    "[INSIRA a frase que define a postura profissional de Maria — uma linha, direta, na primeira pessoa.]",
};

/** Capítulos alternados claro/escuro: o "quê", o "porquê" e o "como". */
export type Chapter = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  tone: "light" | "dark";
};

export const chapters: Chapter[] = [
  {
    id: "o-que",
    eyebrow: "O que",
    title: "[INSIRA um título curto para o que ela faz.]",
    body: "[INSIRA o parágrafo sobre os serviços contábeis oferecidos — texto corrido, sem lista, sem jargão de template.]",
    tone: "light",
  },
  {
    id: "por-que",
    eyebrow: "Por que",
    title: "[INSIRA um título curto para o problema que ela resolve.]",
    body: "[INSIRA o parágrafo sobre a dor real do cliente e como o trabalho dela muda esse cenário.]",
    tone: "dark",
  },
  {
    id: "como",
    eyebrow: "Como",
    title: "[INSIRA um título curto para o método dela.]",
    body: "[INSIRA o parágrafo sobre rotina de acompanhamento, ferramentas e forma de conduzir o trabalho.]",
    tone: "light",
  },
];

/** Especialidades — galeria horizontal com rolagem por encaixe. */
export type Highlight = {
  index: string;
  title: string;
  description: string;
};

export const highlights: Highlight[] = [
  {
    index: "01",
    title: "[INSIRA ÁREA 1 — ex.: Contabilidade para Pessoa Jurídica]",
    description: "[INSIRA a descrição breve desta área de atuação.]",
  },
  {
    index: "02",
    title: "[INSIRA ÁREA 2 — ex.: Planejamento Tributário]",
    description: "[INSIRA a descrição breve desta área de atuação.]",
  },
  {
    index: "03",
    title: "[INSIRA ÁREA 3 — ex.: Consultoria Financeira]",
    description: "[INSIRA a descrição breve desta área de atuação.]",
  },
  {
    index: "04",
    title: "[INSIRA ÁREA 4 — ex.: Abertura e Regularização de Empresas]",
    description: "[INSIRA a descrição breve desta área de atuação.]",
  },
];

/**
 * Diferenciais — só publicar os que forem reais e verificáveis.
 * Se não houver dado concreto para um item, remova-o em vez de estimar.
 */
export type Differentiator = {
  value: string;
  label: string;
};

export const differentiators: Differentiator[] = [
  { value: "[N]", label: "[INSIRA DIFERENCIAL — ex.: anos de atuação]" },
  { value: "[N]", label: "[INSIRA DIFERENCIAL — ex.: registro no CRC]" },
  { value: "[N]", label: "[INSIRA DIFERENCIAL — ex.: área de especialização]" },
];

/**
 * Trilha de trabalho — a linha do tempo da carreira.
 *
 * Ordem cronológica, do mais antigo para o mais recente. `description` é
 * opcional: quando vazia, a etapa fica só com ano, título e local.
 *
 * Publique apenas etapas reais e verificáveis. Uma trilha curta e honesta
 * sustenta mais confiança do que uma longa com datas aproximadas — e o
 * visitante que checar vai checar.
 */
export type TrajectoryItem = {
  year: string;
  title: string;
  place: string;
  description?: string;
};

export const trajectory: TrajectoryItem[] = [
  {
    year: "[ANO]",
    title: "[INSIRA A FORMAÇÃO — ex.: Graduação em Ciências Contábeis]",
    place: "[INSIRA A INSTITUIÇÃO]",
    description: "[Opcional: o que essa etapa acrescentou à prática dela.]",
  },
  {
    year: "[ANO]",
    title: "[INSIRA O PRIMEIRO CARGO OU ESTÁGIO NA ÁREA]",
    place: "[INSIRA A EMPRESA/ÓRGÃO]",
    description: "[Opcional: rotinas e responsabilidades reais desse período.]",
  },
  {
    year: "[ANO]",
    title: "[INSIRA CERTIFICAÇÃO OU REGISTRO PROFISSIONAL]",
    place: "[INSIRA O ÓRGÃO EMISSOR]",
    description: "[Opcional: o que a certificação habilita na prática.]",
  },
  {
    year: "[ANO]",
    title: "[INSIRA O MARCO MAIS RECENTE]",
    place: "[INSIRA A EMPRESA/ÓRGÃO]",
    description: "[Opcional: o que ela faz hoje, em termos concretos.]",
  },
];

export const contact = {
  title: "Vamos conversar?",
  intro:
    "[INSIRA uma linha convidando ao contato — direta, sem promessa comercial.]",
  email: "[INSIRA EMAIL]",

  /** (11) 99457-6383 — informado pela Maria. */
  phoneLabel: "(11) 99457-6383",
  whatsapp: "https://wa.me/5511994576383",

  /**
   * Handle visto no perfil que você compartilhou. CONFIRME antes de publicar:
   * um @ errado manda visitante para a conta de outra pessoa.
   */
  instagram: {
    handle: "@_eduarrdasiilva",
    href: "https://instagram.com/_eduarrdasiilva",
  },
};

/**
 * Retrato editorial, exibido em preto e branco pelo filtro CSS.
 *
 * A foto atual saiu das imagens que você enviou (recorte 4:5, 1000×1250).
 * Há uma alternativa em `/images/maria-retrato-alt.jpg` — é só trocar o
 * caminho aqui.
 *
 * Vale trocar por uma foto feita para isso quando der: enquadramento da
 * cintura para cima, luz frontal e fundo limpo rendem bem mais nesse quadro.
 */
export const portrait = {
  src: "/images/maria-retrato.jpg",
  alt: "Retrato de Maria Eduarda, contadora",
  caption: "[INSIRA uma legenda curta ou deixe vazio para ocultar.]",
};
