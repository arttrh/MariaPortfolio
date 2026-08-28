/**
 * Todo o conteúdo editável do site.
 *
 * Regra do briefing: nunca inventar credenciais, números, depoimentos,
 * região de atendimento ou trajetória. O que não foi confirmado pela
 * cliente fica marcado com "[INSIRA ...]" — visível de propósito, para
 * ficar óbvio o que falta preencher antes de publicar de verdade — ou como
 * array vazio, quando o bloco inteiro depende de dado real (a seção some
 * sozinha até ser preenchida).
 *
 * Categorias de serviço, etapas de processo e perguntas de FAQ usam uma
 * redação padrão do setor contábil como ponto de partida (não são alegações
 * pessoais sobre a Maria) — ajuste os textos conforme o atendimento real
 * dela assim que possível.
 */

export const brand = {
  wordmark: "Maria Eduarda",
  monogram: "M.",
  role: "Contadora",
};

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#duvidas", label: "Dúvidas" },
];

/** Link único de conversão, usado em todos os CTAs "Falar com Maria". */
export const primaryContact = {
  whatsapp: "https://wa.me/5511994576383",
  phoneLabel: "(11) 99457-6383",
};

export const hero = {
  eyebrow: "Contabilidade com clareza",
  headline: "Mais clareza para decidir. Mais espaço para crescer.",
  subheadline:
    "Maria Eduarda cuida da contabilidade do seu negócio com explicações diretas e uma rotina organizada — para você tomar decisões com segurança, não com dúvida.",
  primaryCta: { label: "Falar com Maria", href: primaryContact.whatsapp },
  secondaryCta: { label: "Conhecer os serviços", href: "#servicos" },
  photo: {
    src: "/images/maria-retrato.jpg",
    alt: "Maria Eduarda, contadora",
  },
  signal: "Atendimento direto, sem intermediários",
};

export type ValueProp = {
  label: string;
  description: string;
};

export const valueProps: ValueProp[] = [
  {
    label: "Atendimento próximo",
    description: "Direto com Maria, sem intermediários.",
  },
  {
    label: "Comunicação clara",
    description: "Sem jargão. Você entende cada número.",
  },
  {
    label: "Rotina organizada",
    description: "Prazos e obrigações sob controle.",
  },
  {
    label: "Orientação para decidir",
    description: "Além de executar, Maria explica o porquê.",
  },
];

/**
 * Sobre Maria. `bio` traz o que já é real; `background` e `credentials`
 * ficam para quando ela confirmar formação, tempo de atuação e registro
 * profissional — nada disso foi inventado.
 */
export const about = {
  eyebrow: "Quem cuida da sua contabilidade",
  name: "Maria Eduarda",
  role: "Contadora",
  bio: "Maria acredita que contabilidade não deveria ser um mistério guardado a sete chaves — e sim uma ferramenta que qualquer pessoa consegue entender e usar para tomar melhores decisões no negócio.",
  background:
    "[INSIRA aqui um parágrafo sobre a formação, especialização e tempo de atuação de Maria — o que ela estudou, desde quando atua e com que tipo de negócio tem mais prática.]",
  principles: [
    "Explica antes de executar",
    "Responde com agilidade",
    "Acompanha de perto, não só no fechamento do mês",
  ],
  /**
   * Formação, registro no CRC, certificações. Cada item só aparece quando
   * preenchido — deixe vazio para a seção não ser exibida ainda.
   */
  credentials: [] as { label: string; detail: string }[],
  photo: {
    src: "/images/maria-retrato-alt.jpg",
    alt: "Maria Eduarda, contadora, em ambiente de trabalho",
  },
};

export type ProblemStatement = string;

export const problemSolution = {
  eyebrow: "Isso soa familiar?",
  title: "Você reconhece alguma dessas situações?",
  problems: [
    "Você não sabe exatamente quanto está pagando de impostos — só sabe que está pagando.",
    "As obrigações da sua empresa parecem mais complicadas do que deveriam ser.",
    "Você só lembra que tem contador quando alguma coisa dá errado.",
  ] as ProblemStatement[],
  bridge: "Existe uma forma mais simples de lidar com isso.",
  solution: {
    eyebrow: "A forma como Maria trabalha",
    title: "Contabilidade que explica, organiza e acompanha.",
    body: "Em vez de tratar sua empresa como mais um número no fim do mês, Maria constrói uma rotina de acompanhamento real: você sabe o que está sendo feito, por que está sendo feito, e o que vem a seguir.",
  },
};

/**
 * Serviços organizados por necessidade do cliente, não por nome técnico.
 * Ajustar a lista exata assim que os serviços reais forem confirmados.
 */
export type ServiceGroup = {
  id: string;
  index: string;
  need: string;
  title: string;
  description: string;
  items: string[];
  when: string;
};

export const services: ServiceGroup[] = [
  {
    id: "comecar",
    index: "01",
    need: "Começar",
    title: "Abertura e regularização",
    description:
      "Formalizar um negócio ou colocar uma empresa com pendências em dia.",
    items: [
      "Abertura de CNPJ e escolha do regime tributário",
      "Regularização de empresas com pendências",
      "Transferência de contabilidade sem dor de cabeça",
    ],
    when: "Importa quando você está tirando um negócio do papel ou corrigindo uma situação irregular.",
  },
  {
    id: "manter",
    index: "02",
    need: "Manter",
    title: "Rotina contábil e obrigações",
    description: "O básico bem feito, todos os meses, sem você precisar lembrar.",
    items: [
      "Apuração de impostos (DAS, DARF e afins)",
      "Emissão e conferência de notas fiscais",
      "Folha de pagamento e pró-labore",
    ],
    when: "Importa no dia a dia de uma empresa que já está de pé.",
  },
  {
    id: "organizar",
    index: "03",
    need: "Organizar",
    title: "Documentação e acompanhamento",
    description: "Papelada e prazos deixando de ser fonte de estresse.",
    items: [
      "Conciliação de documentos e lançamentos",
      "Acompanhamento de prazos e obrigações",
      "Relatórios financeiros fáceis de entender",
    ],
    when: "Importa quando a bagunça de documentos já está atrapalhando sua rotina.",
  },
  {
    id: "decidir",
    index: "04",
    need: "Decidir",
    title: "Orientação e planejamento",
    description: "Entender os números antes de agir, não depois.",
    items: [
      "Planejamento tributário",
      "Pró-labore x distribuição de lucros",
      "Leitura dos números para decisões do negócio",
    ],
    when: "Importa quando uma decisão do negócio depende de entender o impacto financeiro dela.",
  },
];

/** Categorias de público — exemplos de UX, ajustar ao público real de Maria. */
export const audience = {
  eyebrow: "Para quem é",
  title: "Esse atendimento é para você?",
  description:
    "Maria atende principalmente quem lida com contabilidade de perto pela primeira vez, ou quer parar de lidar com ela sozinho.",
  profiles: [
    "Autônomos e freelancers",
    "Prestadores de serviço",
    "Pequenas empresas e MEIs",
    "Profissionais liberais",
  ],
};

/**
 * Filtro regional — a região real de atendimento ainda não foi confirmada.
 * Preencher `servedLocations` com cidades, estados ou "Atendimento 100%
 * online" assim que Maria definir. Com a lista vazia, o verificador
 * responde sempre de forma honesta e cordial, sem travar o visitante.
 */
export const regionalFilter = {
  eyebrow: "Atendimento",
  title: "Maria atende a sua região?",
  description:
    "Digite sua cidade para uma resposta rápida — ou fale direto com Maria.",
  placeholder: "Sua cidade",
  buttonLabel: "Verificar",
  servedLocations: [] as string[],
  unconfiguredMessage:
    "Ainda estamos confirmando a lista de regiões atendidas. Fale direto com Maria — ela confirma rapidinho se atende você.",
  matchMessage: (city: string) =>
    `Boa notícia: Maria atende ${city}. Chame no WhatsApp para começar.`,
  noMatchMessage: (city: string) =>
    `Ainda não confirmamos atendimento presencial em ${city}, mas parte do trabalho pode acontecer à distância. Fale com Maria para confirmar.`,
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Primeiro contato",
    description:
      "Você chama Maria no WhatsApp e conta, em poucas palavras, o que precisa.",
  },
  {
    index: "02",
    title: "Entendimento da necessidade",
    description:
      "Maria escuta o cenário do seu negócio antes de sugerir qualquer coisa.",
  },
  {
    index: "03",
    title: "Definição do serviço",
    description:
      "Vocês alinham o que faz sentido contratar e como funciona na prática.",
  },
  {
    index: "04",
    title: "Início do atendimento",
    description:
      "A rotina contábil começa, com prazos e comunicação claros desde o primeiro dia.",
  },
];

/**
 * Confiança construída com o que é verificável hoje. `testimonials` e
 * `credentials` só aparecem no site quando forem preenchidos com dados
 * reais — nunca fabricar depoimento, número ou avaliação.
 */
export const trust = {
  eyebrow: "Por que confiar",
  title: "Confiança construída com transparência, não com promessas",
  principles: [
    {
      label: "Clareza",
      description: "Cada explicação em linguagem que você entende de fato.",
    },
    {
      label: "Transparência",
      description: "Você sabe o que está sendo feito e por quê.",
    },
    {
      label: "Organização",
      description: "Prazos e obrigações acompanhados, não lembrados de última hora.",
    },
    {
      label: "Proximidade",
      description: "Atendimento de pessoa para pessoa, não um protocolo.",
    },
  ],
  testimonials: [] as { quote: string; author: string; role: string }[],
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Como funciona o primeiro atendimento?",
    answer:
      "Você entra em contato pelo WhatsApp, explica sua situação e Maria retorna com os próximos passos — sem compromisso.",
  },
  {
    question: "Vocês atendem minha cidade?",
    answer:
      "Use o verificador de região logo acima para uma resposta rápida, ou fale direto com Maria pelo WhatsApp.",
  },
  {
    question: "Preciso já ter empresa aberta?",
    answer:
      "Não. Se você ainda não abriu CNPJ, isso também faz parte do que pode ser resolvido junto com Maria.",
  },
  {
    question: "Quais documentos preciso enviar?",
    answer:
      "Varia conforme o serviço contratado. No primeiro contato, Maria informa exatamente o que é necessário para o seu caso.",
  },
  {
    question: "O atendimento é presencial ou online?",
    answer: "[INSIRA como funciona o atendimento — presencial, online ou híbrido.]",
  },
  {
    question: "Quanto custa?",
    answer:
      "Depende do serviço e do porte do seu negócio — cada caso recebe uma proposta própria. Fale com Maria para saber o valor para a sua situação.",
  },
];

export const finalCta = {
  eyebrow: "Vamos conversar?",
  title: "Pronto para simplificar sua contabilidade?",
  description:
    "Fale com Maria e entenda, sem compromisso, como ela pode ajudar o seu negócio.",
  primaryCta: { label: "Falar com Maria", href: primaryContact.whatsapp },
  form: {
    title: "Prefere começar por escrito?",
    description: "Preencha os campos abaixo — a mensagem vai pronta para o WhatsApp de Maria.",
    serviceOptions: services.map((s) => s.need),
  },
};

export const contact = {
  /** Deixe vazio ("") para ocultar o link de e-mail até haver um confirmado. */
  email: "",
  whatsapp: primaryContact.whatsapp,
  phoneLabel: primaryContact.phoneLabel,
  /**
   * Handle visto no perfil compartilhado. CONFIRME antes de publicar: um @
   * errado manda visitante para a conta de outra pessoa.
   */
  instagram: {
    handle: "@_eduarrdasiilva",
    href: "https://instagram.com/_eduarrdasiilva",
  },
};
