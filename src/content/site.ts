// Conteúdo do site. Preencha os campos marcados com "[INSIRA ...]" com dados reais
// de Maria Eduarda antes de publicar. Nenhum dado abaixo foi inventado.

export const hero = {
  name: "Maria Eduarda",
  role: "Contadora",
  headline: "[INSIRA CHAMADA CURTA — ex.: “Clareza e precisão em cada número”]",
  photo: "/images/maria-hero.svg",
};

export const about = {
  eyebrow: "Quem sou",
  paragraphs: [
    "[INSIRA aqui um parágrafo curto, em primeira pessoa, sobre a trajetória de Maria Eduarda na contabilidade — o que a levou à área e como ela trabalha hoje.]",
    "[INSIRA um segundo parágrafo, opcional, sobre a forma como ela atende clientes ou o tipo de trabalho que mais a define.]",
  ],
  yearsActive: "[INSIRA ANO DE INÍCIO]",
};

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

export type Differentiator = {
  value: string;
  label: string;
};

export const differentiators: Differentiator[] = [
  { value: "[N]", label: "[INSIRA DIFERENCIAL — ex.: anos de atuação]" },
  { value: "[N]", label: "[INSIRA DIFERENCIAL — ex.: registro no CRC]" },
  { value: "[N]", label: "[INSIRA DIFERENCIAL — ex.: área de especialização]" },
];

export const contact = {
  email: "[INSIRA EMAIL]",
  whatsapp: "[INSIRA LINK DO WHATSAPP — ex.: https://wa.me/55XXXXXXXXXXX]",
  cta: "Vamos conversar?",
};
