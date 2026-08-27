// Conteúdo do site. Preencha os campos marcados com "[INSIRA ...]" com dados
// reais de Maria Eduarda antes de publicar. Nenhum dado abaixo foi inventado.

export const brand = {
  wordmark: "maria eduarda",
  shortmark: "me",
  role: "Contadora",
};

export const hero = {
  name: "Maria Eduarda",
  firstName: "Maria",
  lastName: "Eduarda",
  role: "Contadora",
  headline: "[INSIRA CHAMADA CURTA — ex.: “Clareza e precisão em cada número”]",
  ghostWord: "contabilidade",

  /**
   * Retrato recortado (fundo transparente) — é ELE que carrega a abertura.
   * Trocar por um PNG/WebP com recorte real: "/images/maria.png".
   * Enquadramento ideal: da cintura para cima, olhando para a câmera.
   */
  cutout: "/images/maria-cutout.svg",

  /** Foto de apoio, formato paisagem, usada na seção Sobre. */
  photo: "/images/maria-portrait.svg",

  ctaLabel: "Falar com Maria",

  /** Cartão de credenciais — o sinal de confiança de uma contadora. */
  credential: {
    status: "[INSIRA STATUS — ex.: Disponível para novos clientes]",
    rows: [
      { label: "Registro", value: "[INSIRA CRC — ex.: CRC-SP 000000/O]" },
      { label: "Atuação", value: "[INSIRA FOCO — ex.: PJ e planejamento tributário]" },
      { label: "Base", value: "[INSIRA CIDADE/UF]" },
    ],
  },
};

/** Seção de números — espelha o bloco de estatísticas da referência. */
export const metrics = {
  title: "Números que sustentam a confiança",
  subtitle: "[INSIRA uma linha de contexto sobre a atuação de Maria Eduarda.]",
  stats: [
    {
      value: "[N]",
      label: "[INSIRA MÉTRICA — ex.: anos de atuação]",
      detail: "[INSIRA detalhe curto da métrica.]",
    },
    {
      value: "[N]",
      label: "[INSIRA MÉTRICA — ex.: clientes atendidos]",
      detail: "[INSIRA detalhe curto da métrica.]",
    },
    {
      value: "[N]",
      label: "[INSIRA MÉTRICA — ex.: registro no CRC]",
      detail: "[INSIRA detalhe curto da métrica.]",
    },
  ],
  notes: [
    "[INSIRA uma observação real sobre o método de trabalho de Maria.]",
    "[INSIRA uma segunda observação real.]",
    "[INSIRA uma terceira observação real.]",
  ],
};

/** Bloco editorial de três colunas — padrão “O que / Porquê / Como”. */
export const editorial = [
  {
    heading: "O que",
    body: "[INSIRA o que Maria Eduarda faz — serviços contábeis oferecidos, em texto corrido, sem lista.]",
  },
  {
    heading: "Porquê",
    body: "[INSIRA a motivação — o problema real que ela resolve para os clientes.]",
  },
  {
    heading: "Como",
    body: "[INSIRA o método — como ela conduz o trabalho, ferramentas e rotina de acompanhamento.]",
  },
];

export type Specialty = {
  title: string;
  description: string;
};

export const specialties: Specialty[] = [
  {
    title: "[INSIRA ÁREA 1 — ex.: Contabilidade para Pessoa Jurídica]",
    description: "[INSIRA descrição breve da área de atuação.]",
  },
  {
    title: "[INSIRA ÁREA 2 — ex.: Planejamento Tributário]",
    description: "[INSIRA descrição breve da área de atuação.]",
  },
  {
    title: "[INSIRA ÁREA 3 — ex.: Consultoria Financeira Pessoal]",
    description: "[INSIRA descrição breve da área de atuação.]",
  },
  {
    title: "[INSIRA ÁREA 4 — ex.: Abertura e Regularização de Empresas]",
    description: "[INSIRA descrição breve da área de atuação.]",
  },
];

export type ExperienceItem = {
  year: string;
  title: string;
  place: string;
};

export const experience: ExperienceItem[] = [
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
  email: "[INSIRA EMAIL]",
  whatsapp: "[INSIRA LINK DO WHATSAPP — ex.: https://wa.me/55XXXXXXXXXXX]",
  cta: "Vamos conversar?",
};
