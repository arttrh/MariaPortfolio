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

export type TrajectoryItem = {
  year: string;
  title: string;
  place: string;
};

export const trajectory: TrajectoryItem[] = [
  {
    year: "[ANO]",
    title: "[INSIRA FORMAÇÃO — ex.: Graduação em Ciências Contábeis]",
    place: "[INSIRA INSTITUIÇÃO]",
  },
  {
    year: "[ANO]",
    title: "[INSIRA CERTIFICAÇÃO OU CARGO]",
    place: "[INSIRA EMPRESA/ÓRGÃO]",
  },
  {
    year: "[ANO]",
    title: "[INSIRA MARCO RELEVANTE NA CARREIRA]",
    place: "[INSIRA EMPRESA/ÓRGÃO]",
  },
];

export const contact = {
  title: "Vamos conversar?",
  intro:
    "[INSIRA uma linha convidando ao contato — direta, sem promessa comercial.]",
  email: "[INSIRA EMAIL]",
  whatsapp: "[INSIRA LINK DO WHATSAPP — ex.: https://wa.me/55XXXXXXXXXXX]",
};

/**
 * Retrato em preto e branco, usado como elemento editorial.
 * Trocar por uma fotografia real antes de publicar.
 */
export const portrait = {
  src: "/images/maria-portrait.svg",
  alt: "Maria Eduarda, contadora",
};
