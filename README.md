# Maria Eduarda — Site institucional (Contadora)

Site institucional/conversão em **Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP**.

Marca pessoal premium para uma contadora — não um currículo, não uma cópia da
referência estrutural (contadordireto.com.br). A referência foi usada para
estratégia e sequência narrativa; a identidade visual, a copy e o layout são
próprios de Maria Eduarda.

---

## 1. Direção de arte

Editorial contemporâneo + consultoria boutique — não escritório contábil
tradicional, não fintech genérica.

### Paleta — neutros quentes + uma cor de marca

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#17130f` | fundo dos blocos escuros, texto principal sobre claro |
| `--paper` | `#fbf8f3` | fundo padrão — marfim, não branco puro |
| `--paper-strong` | `#ffffff` | superfícies elevadas (cartões) sobre o marfim |
| `--sand` | `#f1e9dd` | seções alternadas |
| `--stone` | `#4b443b` | texto secundário sobre claro |
| `--mute` | `#7a7266` | legendas sobre claro |
| `--fog` | `#b9af9f` | texto secundário sobre escuro |
| `--accent` | `#a8632e` | argila — ícones, marcadores, detalhes decorativos |
| `--accent-strong` | `#7c4a22` | argila escura — fundo sólido de CTA (com texto marfim), ~6:1 |
| `--accent-on-dark` | `#d79a5d` | argila clara — eyebrows/links sobre fundo escuro |

Uma única cor de marca, usada com parcimônia (CTAs, links, ícones, pequenos
detalhes) — a hierarquia principal vem de tipografia, espaço e proporção.

### Tipografia

Duas famílias com papéis bem definidos:

- **Fraunces** (serifada, expressiva) — headline, subtítulos de seção e
  números de destaque. Dá caráter editorial.
- **Inter** (sans, altíssima legibilidade) — corpo, navegação, formulário,
  labels.

| Classe | Papel |
|---|---|
| `.t-eyebrow` | rótulo pequeno, maiúsculo, cor de marca |
| `.t-display` | headline do hero (serifada) |
| `.t-headline` | título de seção (serifada) |
| `.t-title` | subtítulo de cartão/bloco (serifada) |
| `.t-subheadline` | linha de apoio do hero (sans) |
| `.t-body` | corpo de texto (sans) |
| `.t-label` | navegação, campos de formulário |
| `.t-caption` | legendas pequenas |

Escala responsiva via `clamp()` em todas as classes de título.

> **Nota de arquitetura CSS.** As classes acima e `.btn*` vivem dentro de
> `@layer components` em `globals.css`. Isso é proposital: no Tailwind v4 a
> camada `utilities` tem prioridade sobre `components` independente de
> especificidade — colocar componentes fora de qualquer `@layer` fazia com
> que utilitários como `hidden`/`sm:inline-flex` perdessem para `.btn`. Ao
> mexer em `globals.css`, mantenha classes de componente dentro de
> `@layer components`.

### Movimento

Reveals sutis (fade + 16px de deslocamento) disparados ao entrar na
viewport, via GSAP ScrollTrigger (`src/lib/gsap.ts`). `prefers-reduced-motion`
desliga tudo e mostra o estado final direto.

---

## 2. Estrutura da página

Narrativa: atenção → identificação → confiança → clareza → intenção → contato.

```
Header (nav fixa + CTA "Falar com Maria")
Hero (headline de transformação + foto + CTAs)
ValueProps (4 diferenciais rápidos)
About (quem é Maria, como trabalha)
ProblemSolution (identificação com dores → solução)
Services (serviços agrupados por necessidade: Começar/Manter/Organizar/Decidir)
Audience (perfis atendidos + verificador de região)
Process (4 passos do primeiro contato ao atendimento)
Trust (princípios de confiança + espaço para depoimentos reais)
FAQ (acordeão acessível, remove objeções)
FinalCta (CTA + formulário que monta mensagem de WhatsApp)
Footer
```

### Arquivos

```
src/
├── app/
│   ├── layout.tsx      # Inter + Fraunces, metadata pt-BR
│   ├── page.tsx         # composição da página
│   └── globals.css      # tokens + tipografia + botões (@layer components)
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── ValueProps.tsx
│   ├── About.tsx
│   ├── ProblemSolution.tsx
│   ├── Services.tsx
│   ├── Audience.tsx
│   ├── RegionalFilter.tsx
│   ├── Process.tsx
│   ├── Trust.tsx
│   ├── FAQ.tsx
│   ├── FinalCta.tsx
│   └── Footer.tsx
├── content/site.ts       # TODO o conteúdo editável
└── lib/gsap.ts           # eases contidos, useGsap, useReducedMotion
```

---

## 3. Filtro de região

A região real de atendimento de Maria ainda não foi confirmada. O
verificador em `RegionalFilter.tsx` foi construído para não inventar nada:
com `regionalFilter.servedLocations` vazio (estado atual), ele sempre
responde de forma honesta, convidando a falar direto com Maria. Assim que a
lista de cidades/estados for confirmada, preencha o array em
`content/site.ts` e o verificador passa a comparar de verdade.

## 4. Contato / geração de leads

Não há backend. O formulário do CTA final monta uma mensagem e abre o
WhatsApp de Maria já preenchido (`https://wa.me/...`) — o canal real de
contato informado por ela, com fricção mínima. O e-mail (`contact.email`)
fica oculto até haver um endereço confirmado.

---

## 5. Dados pendentes

Nada foi inventado. Preencher em **`src/content/site.ts`**:

- [ ] `about.background` — formação, especialização e tempo de atuação de Maria.
- [ ] `about.credentials[]` — registro no CRC, certificações (a seção só
      aparece quando preenchida).
- [ ] `regionalFilter.servedLocations[]` — cidades/estados atendidos, ou
      `"Atendimento 100% online"`.
- [ ] `faq` — a resposta de "O atendimento é presencial ou online?".
- [ ] `contact.email` — deixar vazio oculta o link no rodapé.
- [ ] `trust.testimonials[]` — só publicar depoimentos reais (a seção some
      até ser preenchida).
- [ ] Confirmar o `@` do Instagram em `contact.instagram` antes de publicar.
- [ ] Revisar a lista exata de `services[]` com Maria — o conteúdo atual
      usa nomenclatura padrão do setor contábil como ponto de partida.

---

## 6. Comandos

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção
npm run start    # servir o build
npm run lint
```

---

## 7. Acessibilidade e verificação

- Contraste verificado nos pares texto/fundo principais (`--accent-strong`
  sobre `--paper`/`--paper-strong` ≥ 6:1).
- `prefers-reduced-motion` desliga as animações.
- FAQ em `<details>/<summary>` nativos — acessível por teclado e leitor de
  tela sem JavaScript extra.
- Formulários com `<label>` associado a cada campo; verificador de região
  com `aria-live="polite"`.
- `npm run build`, `npm run lint` e `tsc --noEmit` limpos.
- Testado sem overflow horizontal em 390px, 768px, 1440px; sem erros de
  console; header, menu mobile, acordeão de FAQ e verificador de região
  testados interativamente.
