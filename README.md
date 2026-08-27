# Maria Eduarda — Portfólio (Contadora)

Site one-page construído com **Next.js (App Router) + TypeScript + Tailwind CSS v4 + GSAP**.

O sistema visual e de movimento é portado do app **Flora** (`pquidute/Flora-Mobile`,
Kotlin/Jetpack Compose) — tokens, escala tipográfica e curvas de animação vêm
diretamente do código do app, adaptados para web. A identidade (marca, conteúdo,
seções) é própria de Maria Eduarda.

---

## 1. Sistema portado do Flora

### Cores — `presentation/theme/Color.kt`

Neutros **quentes**, nunca preto/branco puros.

| Token Flora | Hex | Uso no site |
|---|---|---|
| `SoftBlack` | `#1D1D1D` | texto principal, seção invertida |
| `SoftWhite` | `#F9F9F9` | fundo padrão |
| `VeryLightGray` | `#FAFAFA` | superfícies alternadas |
| `SoftGray` | `#EEEEEE` | containers |
| `MediumLightGray` | `#E0E0E0` | bordas e divisores |
| `NeutralGray` | `#BDBDBD` | bordas fortes |
| `DarkGray` | `#757575` | legendas |
| `VeryDarkGray` | `#424242` | corpo de texto |
| `AlmostBlack` | `#212121` | títulos |
| `DeepBlack` … `MediumDark` | `#0D0D0D`–`#3A3A3A` | tema escuro |

Tema escuro completo via `prefers-color-scheme`. O creme do hero
(`#EFECE5`) reproduz o fundo do render de abertura da referência.

### Tipografia — `presentation/theme/Type.kt` e `TextStyles.kt`

**Inter é a única família** (W400–W800) — o Flora usa `bodyFontFamily` também
como `displayFontFamily`. Sem serifada em nenhum ponto.

- `.type-display` — 800, `letter-spacing: -0.035em`
- `.type-heading` — 800, `-0.025em`
- `.type-eyebrow` — 500, `+0.18em`, maiúsculas

O tracking negativo replica o `letterSpacing = (-0.3).sp` de `EnvCardTitle`.

### Movimento — mapa de equivalência

Os interpoladores do Compose viram eases GSAP em `src/lib/gsap.ts`:

| Flora (Compose) | GSAP | Onde |
|---|---|---|
| `OvershootInterpolator(3f)` | `back.out(3)` | `EASE.overshoot` |
| `spring(LowBouncy, VeryLow)` | `back.out(1.4)` | `EASE.spring` |
| `FastOutSlowInEasing` | `power2.inOut` | `EASE.fastOutSlowIn` |

Componentes portados:

- **`Preloader`** ← `SplashScreen.kt`: escala 0→1 com overshoot (900 ms),
  giro de 720° (2000 ms), pausa de 600 ms, saída.
- **`FloatingLights`** ← `FloatingLightsBackground.kt`: 3 halos radiais em
  deriva lenta (ciclos de 29–61 s) com alpha pulsando 0.15↔0.35.
- **`ParticleField`** ← `ParticleBackground.kt`: 80 partículas de 1–5 px,
  deriva de ±0.5 px/frame, wrap nas bordas, apenas cinzas.
- **Cards** ← `EnvironmentCard.kt`: raio de 12 px (`--radius-card`) e entrada
  com mola.

---

## 2. Estrutura

```
src/
├── app/
│   ├── layout.tsx        # Inter, metadata pt-BR
│   ├── page.tsx          # composição da página
│   └── globals.css       # tokens Flora + utilitários de tipo
├── components/
│   ├── Mark.tsx          # marca radial (5 lâminas, geometria própria)
│   ├── Preloader.tsx     # splash
│   ├── FloatingLights.tsx
│   ├── ParticleField.tsx
│   ├── Nav.tsx           # menu fixo, rola na horizontal no mobile
│   ├── Hero.tsx          # marca + display + creme
│   ├── Editorial.tsx     # O que / Porquê / Como + retrato
│   ├── Metrics.tsx       # números (contagem animada) + citações
│   ├── Showcase.tsx      # especialidades em moldura de janela
│   ├── Experience.tsx    # trajetória
│   ├── Contact.tsx       # seção invertida + partículas
│   └── Footer.tsx
├── content/site.ts       # TODO o conteúdo editável
└── lib/gsap.ts           # eases, useGsap, useReducedMotion
```

`public/fallback.html` é a versão estática (sem JS) das seções Hero e Contato,
já nos tokens novos.

---

## 3. Dados pendentes

Nada foi inventado. Preencher em **`src/content/site.ts`**:

- [ ] `hero.headline` — chamada curta.
- [ ] `hero.photo` — trocar `/images/maria-portrait.svg` pela foto real
      (formato paisagem, ~16:7).
- [ ] `editorial[]` — textos de *O que / Porquê / Como*.
- [ ] `metrics.stats[]` — números reais. Valores numéricos ganham contagem
      animada automaticamente; placeholders `[N]` passam intactos.
- [ ] `metrics.notes[]` — observações reais sobre o método de trabalho.
- [ ] `specialties[]` — 4 áreas de atuação.
- [ ] `experience[]` — formação, certificações e marcos com datas.
- [ ] `contact.email` / `contact.whatsapp`.

Atualizar `public/fallback.html` em paralelo.

---

## 4. Comandos

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # build de produção (saída estática)
npm run start    # servir o build
npm run lint
```

---

## 5. Acessibilidade e performance

- `prefers-reduced-motion` desliga **todas** as animações e dispensa a splash;
  o conteúdo aparece imediatamente (verificado no navegador).
- Contraste conferido nos fundos invertidos — as legendas da seção de contato
  usam `inverse-fg/70` em vez do cinza padrão, que ficaria em 3.7:1.
- HTML semântico, foco visível, `aria-label` nos ícones e âncoras com
  `scroll-mt-24` para não ficarem sob o menu fixo.
- Inter via `next/font` (self-hosted, sem CLS). Build 100% estático.
- Menu rola na horizontal em telas estreitas — nenhum link fica inacessível.

---

## 6. Verificação realizada

| Item | Resultado |
|---|---|
| `npm run build` | sem erros, rotas estáticas |
| `npm run lint` / `tsc --noEmit` | limpos |
| Console do navegador | sem erros |
| Overflow horizontal | ausente em 1440px e 390px |
| Movimento reduzido | splash dispensada, 6/6 seções em opacidade 1 |
| Mobile 390px | menu completo alcançável via rolagem |
