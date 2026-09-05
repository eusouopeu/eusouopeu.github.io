# Multi-area portfolio design

Status: approved by user, ready for implementation planning.

## Goal

Today the site is one single-page portfolio (`index.html`) pitched at a
single "Business Analysis + Product Management" persona. The user is
applying to internships across four different areas (Finance,
Operations, Marketing/Performance/Growth, Product) and has a distinct
`.docx` résumé tailored to each. He wants:

1. A neutral hub page that doesn't commit to one area, letting any
   visitor self-select which area they came for.
2. Four area-specific pages, each showing only the projects,
   certificates, skills, and bio framing relevant to that area — so a
   recruiter for one area never sees (and is never tempted to weigh)
   his material for the other three.
3. Each area page's "download résumé" button serving that area's own
   PDF résumé, matching what's on the page.
4. No navigational path from an area page back to the hub or to any
   other area page — an area-specific link (e.g. from a résumé's QR
   code or footer) should feel like a self-contained page, not one
   tab of a bigger multi-area site.

## Non-goals

- Per-project case-study pages (tracked separately in the repo's
  `CLAUDE.md` "Melhorias futuras" — not part of this change).
- A build step / bundler. The site stays plain HTML + in-browser
  Babel (`text/babel` scripts), consistent with how `index.html` works
  today.
- Server-side routing, redirects, or a real router. Every "page" is a
  static `.html` file at the repo root, exactly like `index.html` is
  today.
- Analytics/telemetry on which area a visitor picked.

## Architecture

Five static HTML entry points, two shared JS files, no build step:

- **`data.js`** — plain JS (no JSX), loaded with a normal
  `<script src="data.js">` tag. Holds all content: `portfolioData`
  (projects, certificates — each tagged with the areas it belongs to,
  and optional per-area `overrides` for title/description),
  `bioByArea`, `skillsByArea`, `resumeFileByArea`, and the
  language/UI strings shared across pages (nav labels, footer, etc.).
- **`components.js`** — the existing React components (`Navbar`,
  `Hero`, `AboutAndExperience`, `ProjectCard`, `Portfolio`,
  `Certificates`, `SkillGroup`, `Skills`, `Footer`, the
  `useFadeInUp` hook), refactored to take an `area` prop and loaded
  via `<script type="text/babel" src="components.js">` so Babel
  transpiles it in-browser exactly like inline scripts do today.
- **`index.html`** (hub) — hero + short neutral bio + four large area
  cards/buttons (Finanças, Operações, Marketing & Growth, Produto) +
  a secondary "baixar currículo padrão" link. No projects, certificates,
  or skills sections.
- **`financas.html`, `operacoes.html`, `growth.html`, `produto.html`**
  — each loads `data.js` + `components.js`, then a small inline
  `<script type="text/babel">` that renders `<App area="financas" />`
  (etc.) — the full profile page (About, Experience, Projects,
  Certificates, Skills, Footer) filtered to that area.

### Isolation rule (requirement 4)

- The site name/logo in the `Navbar`, which today links to `#home`,
  keeps that behavior on every page (an in-page anchor). It never
  becomes a link to `index.html` on an area page.
- Area pages contain **zero** links to `index.html` or to each other,
  anywhere in the DOM. This is enforced by construction: the shared
  `components.js` has no "back to hub" or "switch area" affordance at
  all — that UI only exists in `index.html`'s own markup, which the
  other four files simply don't include.
- `localStorage` (`theme`, `lang`) is shared across pages by normal
  browser same-origin behavior; that's cosmetic state, not a
  navigation path, so it's left as-is.

## Content mapping

Extracted directly from the four `.docx` résumés
(`curriculo-financas.docx`, `curriculo-operacoes.docx`,
`curriculo-performance.docx`, `Curriculo-produto (padrão).docx`).

### Bio (`bioByArea`)

Each area gets its own "resumo profissional" for the About section,
translated to English by me for the existing PT/EN toggle (the
source docx are Portuguese-only, so the EN copy is my translation —
flag anything that reads off and I'll adjust):

- **Finanças (PT):** "Estudante de Administração na UFBA com perfil
  analítico e experiência em análise financeira, modelagem e
  indicadores de desempenho. Desenvolvi projetos com análise de
  demonstrações financeiras, desempenho operacional, viabilidade de
  investimentos e indicadores de rentabilidade, liquidez e
  eficiência. Combino visão de negócios com competências técnicas e
  quantitativas – Excel, programação e estatística – para transformar
  dados financeiros em informações para decisão."
  **(EN):** "Administration student at UFBA with an analytical
  profile and experience in financial analysis, modeling, and
  performance indicators. I've developed projects analyzing financial
  statements, operational performance, investment viability, and
  profitability, liquidity, and efficiency indicators. I combine
  business acumen with technical and quantitative skills — Excel,
  programming, and statistics — to turn financial data into
  decision-ready information."

- **Operações (PT):** "Estudante de Administração da UFBA com
  experiência em planejamento estratégico, análise de dados e
  facilitação de iniciativas de melhoria de processos na Empresa
  Júnior de Informática da UFBA (InfoJr). Possuo conhecimentos em
  programação, Excel, estatística e análise de indicadores
  operacionais e financeiros."
  **(EN):** "Administration student at UFBA with experience in
  strategic planning, data analysis, and facilitating
  process-improvement initiatives at UFBA's computing junior
  enterprise (InfoJr). I have working knowledge of programming,
  Excel, statistics, and operational and financial indicator
  analysis."

- **Growth/Performance (PT):** "Estudante de Administração com
  experiência em planejamento estratégico, definição de indicadores e
  benchmarking na Empresa Júnior de Informática da UFBA (InfoJr).
  Utilizo SQL, Excel e estatística para analisar desempenho
  operacional e financeiro e transformar dados em insights de
  negócio."
  **(EN):** "Administration student with experience in strategic
  planning, KPI definition, and benchmarking at UFBA's computing
  junior enterprise (InfoJr). I use SQL, Excel, and statistics to
  analyze operational and financial performance and turn data into
  business insights."

- **Produto (PT):** "Estudante de Administração da UFBA com
  experiência prática em marketing, planejamento estratégico e
  desenvolvimento front-end (React e Next.js) na Empresa Júnior de
  Informática da UFBA (InfoJr). Combino pesquisas qualitativas e
  análise de dados para gerar insights e apoiar decisões de marketing
  e produto."
  **(EN):** "Administration student at UFBA with hands-on experience
  in marketing, strategic planning, and front-end development (React
  and Next.js) at UFBA's computing junior enterprise (InfoJr). I
  combine qualitative research and data analysis to generate insights
  and support marketing and product decisions."

### Projects (`portfolioData.projects[].areas` / `.overrides`)

| Project | Areas | Notes |
|---|---|---|
| Aval. do Desempenho Operacional — Guararapes (existing id 6) | financas, operacoes, growth | Title/description overridden per area: finance & ops keep "Avaliação do Desempenho Operacional"; growth uses "Painel de Indicadores de Desempenho" (matches that résumé's wording) |
| Análise Comparativa de Desempenho Bancário — Sicoob/BB/Itaú (new) | financas | No PDF/deliverable found in `projects/` — needs a link from the user before launch; placeholder for now |
| Estudo de Viabilidade Econômico-Financeira — Lavanderia (new) | financas | Same: no file found, placeholder link |
| Dashboard de Indicadores — BRF/Copacol/C.Vale (new) | operacoes, growth | Title overridden per area ("Operacionais" vs. "de Desempenho"); no file/link found, placeholder |
| rotinas, dumbfood, cifrasGroup, cognidex, lingoflix (existing ids 1–5) | produto | None of the four résumés name these individually, but they're the hands-on dev/product-building work referenced by the Produto résumé's "desenvolvimento front-end" experience line — kept exclusively on the Produto page |

### Certificates (`portfolioData.certificates[].areas`)

Mapped from each résumé's "CURSOS E CERTIFICAÇÕES" list:

| Certificate | Areas |
|---|---|
| Product Management | produto |
| Desenvolvimento Web | financas, operacoes, produto |
| Design Thinking | produto |
| SQL para Análise de Dados | financas, operacoes, growth |
| TypeScript | *(none of the 4 résumés list it — won't appear on any area page)* |
| React | produto |
| Next.js | *(none — won't appear)* |
| Fundamentos para Análise de Dados | financas, operacoes, growth, produto |
| Fundamentos de Análise de Negócios | financas, operacoes, growth |
| Figma | produto |
| Métricas de Negócios Digitais | growth |
| Excel | financas, operacoes, growth |
| Harrow House | *(none — won't appear)* |
| **Modelagem de Dados (new — id 14)** | financas, operacoes, growth | File already exists at `certificates/Certificado-Modelagem.pdf`, just wasn't wired into `portfolioData` yet |

The three certificates with no area are simply omitted from every
area page (the hub no longer shows a certificates section at all).
That's an acceptable outcome of going area-first, not a bug — flag if
you want one of them added to a résumé/area later.

### Skills (`skillsByArea`)

Each area gets its own skill groups copied from that résumé's
HABILIDADES section (they're not a simple filter of one master list —
each résumé groups and phrases them differently):

- **financas:** Gestão (SWOT, BSC, benchmarking, análise de
  demonstrações, indicadores financeiros, Payback/VPL/TIR); Ferramentas
  e Linguagens (Excel, SQL, React.js, Claude Code, Canva); Outras
  (Estatística, análise de dados).
- **operacoes:** Planejamento e Indicadores (SWOT, BSC, benchmarking,
  métricas operacionais e financeiras, análise de demonstrações);
  Análise de processos e dados (Estatística, análise de dados/negócios);
  Ferramentas e Linguagens (Excel, SQL, React.js, Claude Code, Canva).
- **growth:** Pesquisa e planejamento (SWOT, benchmarking, BSC,
  estatística, análise de dados/negócios); Performance (métricas de
  negócio — CAC/LTV/ROAS, indicadores operacionais e financeiros);
  Ferramentas e Linguagens (Excel, SQL, Notion, Canva, Figma, Claude
  Code, JavaScript, React.js).
- **produto:** Gestão e estratégia (SWOT, benchmarking, BSC, Scrum);
  Pesquisa e validação (Design Thinking, Double Diamond, JTBD, testes
  A/B); Dados e análise (Excel, estatística); Ferramentas e Linguagens
  (Canva, Notion, Figma, Claude Code, React.js).

Languages block (PT/EN/IT/Mandarin) stays identical on all four pages
— it's not area-differentiated in any résumé.

### Résumé files (`resumeFileByArea`)

Convert the four `.docx` to PDF and commit them:

- `certificates/CV-Financas.pdf` ← `curriculo-financas.docx`
- `certificates/CV-Operacoes.pdf` ← `curriculo-operacoes.docx`
- `certificates/CV-Growth.pdf` ← `curriculo-performance.docx`
- `certificates/CV-Produto.pdf` ← `Curriculo-produto (padrão).docx`

The hub's secondary "baixar currículo padrão" button keeps pointing at
the existing generic `certificates/Curriculo Pedro Teles.pdf`.

## Error handling / edge cases

- Missing project links (Sicoob/BB/Itaú, Lavanderia, BRF dashboard):
  ship with a placeholder (`href="#"` or omit the "ver projeto" link
  affordance on the card) rather than a broken link, and call it out
  as a follow-up for the user to supply real files/links.
- Area pages must work when opened directly (bookmarked/shared URL)
  with no dependency on having visited `index.html` first — no
  shared runtime state beyond `localStorage` theme/lang, which
  degrade gracefully to defaults if absent.
- Broken PDF conversion (LibreOffice formatting quirks): render each
  converted PDF to an image and visually check it before committing,
  same as the `docx` skill's verification step.

## Testing plan

Manual, since this is a static site with no test runner:

1. Open each of the 5 HTML files (local file:// or a simple static
   server) and confirm it renders without console errors.
2. On each area page: confirm only that area's projects, certificates,
   and skills show up, the bio matches the mapping above, and the
   "baixar currículo" button downloads that area's PDF.
3. Confirm dark/light and PT/EN toggles still work on every page.
4. Grep the final area-page HTML/JS for `index.html` and for the other
   three area page filenames to confirm no cross-links exist anywhere
   (nav, footer, body copy).
5. Click through the hub's four area buttons to confirm they land on
   the right page.
