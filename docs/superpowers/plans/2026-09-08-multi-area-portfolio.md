# Multi-Area Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single-page portfolio into a neutral hub (`index.html`) plus four isolated area pages (`financas.html`, `operacoes.html`, `growth.html`, `produto.html`), each showing only that area's projects/certificates/skills/bio and its own résumé PDF, with zero navigational path back to the hub or to any other area.

**Architecture:** Two new shared script files — `data.js` (plain JS: all content, area-tagged) and `components.js` (shared React components, loaded via `<script type="text/babel" src="components.js">`) — consumed by five thin HTML shells. `index.html` becomes a standalone hub with its own bespoke hero + area picker. The other four files are near-identical shells that each render `<App area="…" />` from `components.js`.

**Tech Stack:** Static HTML, React 18 + Babel-standalone (CDN, in-browser transpile, no build step) — same as the current `index.html`. Tailwind CDN + Font Awesome CDN, unchanged.

**Spec:** [docs/superpowers/specs/2026-09-05-multi-area-portfolio-design.md](../specs/2026-09-05-multi-area-portfolio-design.md)

## Global Constraints

- No build step. Every script is either plain JS (`data.js`) or `text/babel` (transpiled client-side by babel-standalone), exactly like the current `index.html`.
- No file may contain a link (anchor, redirect, or otherwise) from an area page to `index.html` or to any other area page. The hub is the only page with cross-area navigation.
- `theme`/`lang` continue to persist via `localStorage` (`theme`, `lang` keys) — this is cosmetic, shared-origin state, not a navigation path, and stays as-is.
- Area slugs/filenames are fixed: `financas`, `operacoes`, `growth`, `produto` → `financas.html`, `operacoes.html`, `growth.html`, `produto.html`.
- Résumé PDFs already exist at `certificates/CV-Financas.pdf`, `certificates/CV-Operacoes.pdf`, `certificates/CV-Growth.pdf`, `certificates/CV-Produto.pdf` (converted from the four `.docx` résumés). The hub's generic download stays `certificates/Curriculo Pedro Teles.pdf`.
- Certificate PDFs `certificates/Certificado-Modelagem.pdf` and `certificates/Certificado-HSK.pdf` already exist on disk but aren't wired into any data yet.
- All copy ships in PT + EN (the site's existing bilingual toggle must keep working on every page).

---

### Task 1: `data.js` — all content, area-tagged

**Files:**
- Create: `data.js`

**Interfaces:**
- Produces: `portfolioData.projects` (array, each item has `areas: string[]` and optional `overrides: { [area]: { title_pt, title_en, description_pt, description_en } }`), `portfolioData.certificates` (array, each item has `areas: string[]`), `areaContent` (object keyed by area slug: `label`, `heroTitle`, `metaDescription`, `bio`, `footerCta`, `resumeFile` — each bilingual field is `{ pt, en }`), `skillsByArea` (object keyed by area slug → array of `{ id, title_pt, title_en, tags: string[] }`), `langContent` (shared nav/hero/about/experience/portfolio/certificates/skills/footer strings, no `hero.title`, no `about.p1..p4`, no `footer.ctaText` — those moved into `areaContent`).

- [ ] **Step 1: Write `data.js`**

```javascript
// ---------------------------------------------------------------
// Shared content data — loaded before components.js on every page.
// Plain JS (no JSX) so it can be a normal <script src="data.js">.
// ---------------------------------------------------------------

const portfolioData = {
    projects: [
        {
            id: 1, icon: 'fa-stopwatch', lang: 'PWA',
            title_pt: "rotinas", title_en: "rotinas",
            description_pt: "Rotinas cronometradas e notas rápidas em markdown, com agendamento e estimativa de horário de término.",
            description_en: "Timed routines and quick markdown notes, with scheduling and end-time estimates.",
            link: "eusouopeu.github.io/rotinas",
            areas: ['produto'],
        },
        {
            id: 2, icon: 'fa-utensils', lang: 'TypeScript',
            title_pt: "dumbfood", title_en: "dumbfood",
            description_pt: "PWA que importa receitas de sites e vídeos, reescala porções e monta a lista de compras do mercado — unificada, somada e por gôndola.",
            description_en: "A PWA that imports recipes from sites and videos, rescales portions, and builds a unified, aisle-sorted grocery list.",
            link: "eusouopeu.github.io/dumbfood",
            areas: ['produto'],
        },
        {
            id: 3, icon: 'fa-guitar', lang: 'TypeScript',
            title_pt: "cifrasGroup", title_en: "cifrasGroup",
            description_pt: "Leitor de cifras para violão com simplificação harmônica automática, busca de digitações e metrônomo que toca a batida — tudo no navegador, sem servidor.",
            description_en: "A guitar chord-sheet reader with automatic harmonic simplification, fingering search, and a metronome that plays the beat — runs entirely in the browser.",
            link: "eusouopeu.github.io/cifrasGroup",
            areas: ['produto'],
        },
        {
            id: 4, icon: 'fa-graduation-cap', lang: 'React',
            title_pt: "cognidex", title_en: "cognidex",
            description_pt: "App que compara técnicas de estudo lado a lado, identifica plantas por foto e organiza guias passo a passo — funciona offline como PWA ou app Android.",
            description_en: "An app that compares study techniques side by side, identifies plants from a photo, and organizes step-by-step guides — works offline as a PWA or Android app.",
            link: "eusouopeu.github.io/bookdex",
            areas: ['produto'],
        },
        {
            id: 5, icon: 'fa-clapperboard', lang: 'React',
            title_pt: "lingoflix", title_en: "lingoflix",
            description_pt: "Recomendador de filmes e séries por idioma, gênero e plataforma de streaming, para praticar um novo idioma assistindo ao que realmente interessa.",
            description_en: "A movie and show recommender filtered by language, genre, and streaming platform — practice a new language by watching what actually interests you.",
            link: "eusouopeu.github.io/lingoflix",
            areas: ['produto'],
        },
        {
            id: 6, icon: 'fa-building-columns', lang: 'pdf',
            title_pt: "Avaliação do Desempenho Operacional – Guararapes",
            title_en: "Evaluation of Operational Performance – Guararapes",
            description_pt: "Análise financeira de 5 anos a partir de Balanço Patrimonial, DRE e Fluxo de Caixa: indicadores de liquidez e atividade (giro/cobertura de estoque, PMR, PMP, ciclo de caixa, NCG) e de lucratividade (margens bruta, operacional e líquida).",
            description_en: "Financial analysis of 5 years based on Balance Sheet, Income Statement and Cash Flow: liquidity and activity indicators (turnover/stock coverage, cash cycle, etc.) and profitability (gross, operating and net margins).",
            link: "projects/Relatório PCO.pdf",
            areas: ['financas', 'operacoes', 'growth'],
            overrides: {
                operacoes: {
                    title_pt: "Avaliação do Desempenho Operacional – Guararapes",
                    title_en: "Evaluation of Operational Performance – Guararapes",
                    description_pt: "Análise de dados públicos para avaliar estoque e capital de giro, com acompanhamento trimestral de giro e cobertura de estoque, PME, PMR, PMP, ciclo financeiro e NCG.",
                    description_en: "Public-data analysis of inventory and working capital, with quarterly tracking of turnover and stock coverage, PME/PMR/PMP, and the cash conversion cycle.",
                },
                growth: {
                    title_pt: "Painel de Indicadores de Desempenho – Guararapes",
                    title_en: "Performance Indicators Panel – Guararapes",
                    description_pt: "Análise financeira de 5 anos a partir de Balanço Patrimonial, DRE e Fluxo de Caixa: indicadores de liquidez e atividade (giro/cobertura de estoque, PMR, PMP, ciclo de caixa, NCG) e de lucratividade (margens bruta, operacional e líquida).",
                    description_en: "Financial analysis of 5 years based on Balance Sheet, Income Statement and Cash Flow: liquidity and activity indicators (turnover/stock coverage, cash cycle, etc.) and profitability (gross, operating and net margins).",
                },
            },
        },
        {
            id: 7, icon: 'fa-landmark', lang: 'Dashboard',
            title_pt: "Análise Comparativa de Desempenho Bancário – Sicoob, BB e Itaú",
            title_en: "Comparative Banking Performance Analysis – Sicoob, BB & Itaú",
            description_pt: "Análise de indicadores (ROE, ROA, inadimplência, entre outros) de três instituições com modelos de propriedade distintos, feita a partir de demonstrações financeiras, relatórios de RI e dados da CVM.",
            description_en: "Analysis of indicators (ROE, ROA, default rate, and others) across three institutions with distinct ownership models, built from financial statements, investor-relations reports, and CVM data.",
            link: "https://eusouopeu.github.io/dash-bancos/",
            areas: ['financas'],
        },
        {
            id: 8, icon: 'fa-calculator', lang: 'Dashboard',
            title_pt: "Estudo de Viabilidade Econômico-Financeira – Lavanderia Self-service",
            title_en: "Economic-Financial Feasibility Study – Self-Service Laundromat",
            description_pt: "Responsável pelas premissas de investimento e financiamento (ativos fixos, capital de giro, estrutura de capital) e pela modelagem financeira do projeto – fluxo de caixa livre, taxa de desconto (TMA) e métricas de viabilidade (Payback, VPL, TIR).",
            description_en: "Responsible for the investment and financing assumptions (fixed assets, working capital, capital structure) and for the project's financial modeling — free cash flow, discount rate (MARR), and viability metrics (Payback, NPV, IRR).",
            link: "https://eusouopeu.github.io/dash-lavanderia/",
            areas: ['financas'],
        },
        {
            id: 9, icon: 'fa-chart-line', lang: 'Dashboard',
            title_pt: "Dashboard de Indicadores Operacionais – BRF, Copacol e C.Vale",
            title_en: "Operational Indicators Dashboard – BRF, Copacol & C.Vale",
            description_pt: "Desenvolvimento de dashboard interativo com dados públicos para comparar, no setor agroindustrial, o modelo de empresa privada (BRF) e o de cooperativas (Copacol e C.Vale). Análise de eficiência operacional, capital de giro, rentabilidade e alavancagem.",
            description_en: "Built an interactive dashboard with public data comparing the private-company model (BRF) to the cooperative model (Copacol and C.Vale) in the agribusiness sector — analyzing operational efficiency, working capital, profitability, and leverage.",
            link: "https://eusouopeu.github.io/dash-agro/",
            areas: ['operacoes', 'growth'],
            overrides: {
                growth: {
                    title_pt: "Dashboard de Indicadores de Desempenho – BRF, Copacol e C.Vale",
                    title_en: "Performance Indicators Dashboard – BRF, Copacol & C.Vale",
                    description_pt: "Desenvolvimento de dashboard interativo com dados públicos para comparar, no setor agroindustrial, o modelo de empresa privada (BRF) e o de cooperativas (Copacol e C.Vale). Análise de eficiência operacional, capital de giro, rentabilidade e alavancagem.",
                    description_en: "Built an interactive dashboard with public data comparing the private-company model (BRF) to the cooperative model (Copacol and C.Vale) in the agribusiness sector — analyzing operational efficiency, working capital, profitability, and leverage.",
                },
            },
        },
    ],
    certificates: [
        { id: 1, name_pt: 'Product Management', name_en: 'Product Management', institution: 'Cubos Academy', hours_pt: '50 horas', hours_en: '50 hours', link: 'certificates/Certificado-Product-Management.pdf', category: 'product', areas: ['produto'] },
        { id: 2, name_pt: 'Desenvolvimento Web', name_en: 'Web Development', institution: 'InfoJr UFBA', hours_pt: '44 horas', hours_en: '44 hours', link: 'certificates/Certificado-InfoJr.pdf', category: 'business', areas: ['financas', 'operacoes', 'produto'] },
        { id: 3, name_pt: 'Design Thinking', name_en: 'Design Thinking', institution: 'Inst. de Computação UFBA', hours_pt: '30 horas', hours_en: '30 hours', link: 'certificates/Certificado-Design-Thinking.pdf', category: 'product', areas: ['produto'] },
        { id: 4, name_pt: 'SQL para Análise de Dados', name_en: 'SQL for Data Analysis', institution: 'Inst. de Computação UFBA', hours_pt: '30 horas', hours_en: '30 hours', link: 'certificates/Certificado-SQL.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth'] },
        { id: 5, name_pt: 'TypeScript', name_en: 'TypeScript', institution: 'Cubos Academy', hours_pt: '22 horas', hours_en: '22 hours', link: 'certificates/Certificado-Typescript.pdf', category: 'business', areas: ['produto'] },
        { id: 6, name_pt: 'React', name_en: 'React', institution: 'Cubos Academy', hours_pt: '21 horas', hours_en: '21 hours', link: 'certificates/Certificado-React.pdf', category: 'business', areas: ['produto'] },
        { id: 7, name_pt: 'Next.js', name_en: 'Next.js', institution: 'Cubos Academy', hours_pt: '15 horas', hours_en: '15 hours', link: 'certificates/Certificado-Next.pdf', category: 'business', areas: ['produto'] },
        { id: 8, name_pt: 'Fundamentos para Análise de Dados', name_en: 'Data Analysis Fundamentals', institution: 'Microsoft', hours_pt: '10 horas', hours_en: '10 hours', link: 'certificates/Certificado-Dados.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth', 'produto'] },
        { id: 9, name_pt: 'Fundamentos de Análise de Negócios', name_en: 'Business Analysis Fundamentals', institution: 'Microsoft', hours_pt: '10 horas', hours_en: '10 hours', link: 'certificates/Certificado-Fundamentos-para-Analise-de-Negocios-por-Microsoft.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth'] },
        { id: 10, name_pt: 'Figma', name_en: 'Figma', institution: 'Cubos Academy', hours_pt: '8 horas', hours_en: '8 hours', link: 'certificates/Certificado-Figma.pdf', category: 'product', areas: ['produto'] },
        { id: 11, name_pt: 'Métricas de Negócios Digitais', name_en: 'Digital Business Metrics', institution: 'Cubos Academy', hours_pt: '5 horas', hours_en: '5 hours', link: 'certificates/Certificado-Métricas-de-Negócio.pdf', category: 'business', areas: ['growth'] },
        { id: 12, name_pt: 'Excel', name_en: 'Excel', institution: 'LinkedIn Learning', hours_pt: '2,5 horas', hours_en: '2.5 hours', link: 'certificates/Certificado-Excel-Essential-Training.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth'] },
        { id: 13, name_pt: 'Harrow House — Inglês', name_en: 'Harrow House — English', institution: 'Harrow House', hours_pt: 'Curso de inglês', hours_en: 'English course', link: 'certificates/Certificado-Harrow-House.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth', 'produto'] },
        { id: 14, name_pt: 'Modelagem de Dados', name_en: 'Data Modeling', institution: 'NEA/UFBA', hours_pt: '4 horas', hours_en: '4 hours', link: 'certificates/Certificado-Modelagem.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth'] },
        { id: 15, name_pt: 'HSK 3 — Mandarim', name_en: 'HSK 3 — Mandarin', institution: 'Hanban/Instituto Confúcio', hours_pt: 'Certificação de proficiência', hours_en: 'Proficiency certification', link: 'certificates/Certificado-HSK.pdf', category: 'business', areas: ['financas', 'operacoes', 'growth', 'produto'] },
    ],
};

const areaContent = {
    financas: {
        label: { pt: 'Finanças', en: 'Finance' },
        heroTitle: { pt: 'Análise Financeira · Indicadores de Desempenho', en: 'Financial Analysis · Performance Indicators' },
        metaDescription: { pt: 'Pedro Teles — estudante de Administração (UFBA), com experiência em análise financeira, modelagem e indicadores de desempenho.', en: 'Pedro Teles — Administration student (UFBA), with experience in financial analysis, modeling, and performance indicators.' },
        bio: {
            pt: "Estudante de Administração na UFBA com perfil analítico e experiência em análise financeira, modelagem e indicadores de desempenho. Desenvolvi projetos com análise de demonstrações financeiras, desempenho operacional, viabilidade de investimentos e indicadores de rentabilidade, liquidez e eficiência. Combino visão de negócios com competências técnicas e quantitativas – Excel, programação e estatística – para transformar dados financeiros em informações para decisão.",
            en: "Administration student at UFBA with an analytical profile and experience in financial analysis, modeling, and performance indicators. I've developed projects analyzing financial statements, operational performance, investment viability, and profitability, liquidity, and efficiency indicators. I combine business acumen with technical and quantitative skills — Excel, programming, and statistics — to turn financial data into decision-ready information.",
        },
        footerCta: { pt: "Aberto a oportunidades de estágio em Análise Financeira.", en: "Open to internship opportunities in Financial Analysis." },
        resumeFile: 'certificates/CV-Financas.pdf',
    },
    operacoes: {
        label: { pt: 'Operações', en: 'Operations' },
        heroTitle: { pt: 'Operações · Planejamento & Processos', en: 'Operations · Planning & Process Improvement' },
        metaDescription: { pt: 'Pedro Teles — estudante de Administração (UFBA), com experiência em planejamento estratégico, processos e indicadores operacionais.', en: 'Pedro Teles — Administration student (UFBA), with experience in strategic planning, process improvement, and operational indicators.' },
        bio: {
            pt: "Estudante de Administração da UFBA com experiência em planejamento estratégico, análise de dados e facilitação de iniciativas de melhoria de processos na Empresa Júnior de Informática da UFBA (InfoJr). Possuo conhecimentos em programação, Excel, estatística e análise de indicadores operacionais e financeiros.",
            en: "Administration student at UFBA with experience in strategic planning, data analysis, and facilitating process-improvement initiatives at UFBA's computing junior enterprise (InfoJr). I have working knowledge of programming, Excel, statistics, and operational and financial indicator analysis.",
        },
        footerCta: { pt: "Aberto a oportunidades de estágio em Operações, Processos ou Planejamento.", en: "Open to internship opportunities in Operations, Process Improvement, or Planning." },
        resumeFile: 'certificates/CV-Operacoes.pdf',
    },
    growth: {
        label: { pt: 'Marketing & Growth', en: 'Marketing & Growth' },
        heroTitle: { pt: 'Performance de Negócios · Growth Analytics', en: 'Business Performance · Growth Analytics' },
        metaDescription: { pt: 'Pedro Teles — estudante de Administração (UFBA), com experiência em performance de negócios, growth analytics e benchmarking.', en: 'Pedro Teles — Administration student (UFBA), with experience in business performance, growth analytics, and benchmarking.' },
        bio: {
            pt: "Estudante de Administração com experiência em planejamento estratégico, definição de indicadores e benchmarking na Empresa Júnior de Informática da UFBA (InfoJr). Utilizo SQL, Excel e estatística para analisar desempenho operacional e financeiro e transformar dados em insights de negócio.",
            en: "Administration student with experience in strategic planning, KPI definition, and benchmarking at UFBA's computing junior enterprise (InfoJr). I use SQL, Excel, and statistics to analyze operational and financial performance and turn data into business insights.",
        },
        footerCta: { pt: "Aberto a oportunidades de estágio em Performance de Negócios, Growth Analytics ou Business Intelligence.", en: "Open to internship opportunities in Business Performance, Growth Analytics, or Business Intelligence." },
        resumeFile: 'certificates/CV-Growth.pdf',
    },
    produto: {
        label: { pt: 'Produto', en: 'Product' },
        heroTitle: { pt: 'Gestão de Produto · Design Thinking', en: 'Product Management · Design Thinking' },
        metaDescription: { pt: 'Pedro Teles — estudante de Administração (UFBA), atuando com Gestão de Produto e desenvolvimento front-end.', en: 'Pedro Teles — Administration student (UFBA), working in Product Management and front-end development.' },
        bio: {
            pt: "Estudante de Administração da UFBA com experiência prática em marketing, planejamento estratégico e desenvolvimento front-end (React e Next.js) na Empresa Júnior de Informática da UFBA (InfoJr). Combino pesquisas qualitativas e análise de dados para gerar insights e apoiar decisões de marketing e produto.",
            en: "Administration student at UFBA with hands-on experience in marketing, strategic planning, and front-end development (React and Next.js) at UFBA's computing junior enterprise (InfoJr). I combine qualitative research and data analysis to generate insights and support marketing and product decisions.",
        },
        footerCta: { pt: "Aberto a oportunidades de estágio em Gestão de Produto.", en: "Open to internship opportunities in Product Management." },
        resumeFile: 'certificates/CV-Produto.pdf',
    },
};

const skillsByArea = {
    financas: [
        { id: 1, title_pt: "Gestão", title_en: "Management", tags: ["Análise SWOT", "Balanced Scorecard (BSC)", "Benchmarking", "Análise de Demonstrações (BP, DRE, DFC)", "Indicadores Financeiros", "Payback, VPL, TIR"] },
        { id: 2, title_pt: "Ferramentas e Linguagens", title_en: "Tools & Languages", tags: ["Excel (Tabelas Dinâmicas, PROCX)", "SQL", "React.js", "Claude Code", "Canva"] },
        { id: 3, title_pt: "Outras", title_en: "Other", tags: ["Estatística Descritiva e Inferencial", "Análise de Dados"] },
    ],
    operacoes: [
        { id: 1, title_pt: "Planejamento e Indicadores", title_en: "Planning & Indicators", tags: ["Análise SWOT", "Balanced Scorecard (BSC)", "Benchmarking", "Métricas Operacionais", "Indicadores Financeiros", "Análise de Demonstrações (BP, DRE, DFC)"] },
        { id: 2, title_pt: "Análise de Processos e Dados", title_en: "Process & Data Analysis", tags: ["Estatística Descritiva e Inferencial", "Análise de Dados", "Análise de Negócios"] },
        { id: 3, title_pt: "Ferramentas e Linguagens", title_en: "Tools & Languages", tags: ["Excel (Tabelas Dinâmicas, PROCX)", "SQL", "React.js", "Claude Code", "Canva"] },
    ],
    growth: [
        { id: 1, title_pt: "Pesquisa e Planejamento", title_en: "Research & Planning", tags: ["Análise SWOT", "Benchmarking", "Balanced Scorecard (BSC)", "Estatística Descritiva e Inferencial", "Análise de Dados e Negócios"] },
        { id: 2, title_pt: "Performance", title_en: "Performance", tags: ["Métricas de Negócio (CAC, LTV, ROAS)", "Indicadores Operacionais", "Indicadores Financeiros", "Análise de Demonstrações (BP, DRE, DFC)"] },
        { id: 3, title_pt: "Ferramentas e Linguagens", title_en: "Tools & Languages", tags: ["Excel", "SQL", "Notion", "Canva", "Figma", "Claude Code", "JavaScript", "React.js"] },
    ],
    produto: [
        { id: 1, title_pt: "Gestão e Estratégia", title_en: "Strategy & Management", tags: ["Análise SWOT", "Benchmarking", "Balanced Scorecard (BSC)", "Scrum"] },
        { id: 2, title_pt: "Pesquisa e Validação", title_en: "Research & Validation", tags: ["Design Thinking", "Double Diamond", "Jobs-to-be-Done", "Testes A/B"] },
        { id: 3, title_pt: "Dados e Análise", title_en: "Data & Analysis", tags: ["Excel", "Estatística Descritiva e Inferencial"] },
        { id: 4, title_pt: "Ferramentas e Linguagens", title_en: "Tools & Languages", tags: ["Canva", "Notion", "Figma", "Claude Code", "React.js"] },
    ],
};

const languages = [
    { id: 1, name_pt: "Português", name_en: "Portuguese", level_pt: "Nativo", level_en: "Native" },
    { id: 2, name_pt: "Inglês", name_en: "English", level_pt: "Fluente", level_en: "Fluent" },
    { id: 3, name_pt: "Italiano", name_en: "Italian", level_pt: "Fluente", level_en: "Fluent" },
    { id: 4, name_pt: "Mandarim", name_en: "Mandarin", level_pt: "Intermediário (HSK 3)", level_en: "Intermediate (HSK 3)" },
];

const experienceJobs = [
    { id: 1, date_pt: "Ago 2024 — Jan 2025", date_en: "Aug 2024 — Jan 2025", title_pt: "Gerente de Exomarketing", title_en: "Exomarketing Manager", company: "Empresa Júnior de Informática da UFBA (InfoJr)" },
    { id: 2, date_pt: "Abr 2024 — Jul 2024", date_en: "Apr 2024 — Jul 2024", title_pt: "Desenvolvedor Web (Trainee)", title_en: "Web Developer (Trainee)", company: "Empresa Júnior de Informática da UFBA (InfoJr)" },
    { id: 3, date_pt: "Set 2023 — Jun 2024", date_en: "Sep 2023 — Jun 2024", title_pt: "Presidente e Co-fundador", title_en: "President & Co-founder", company: "Liga Acadêmica Transdisciplinar de Tecnologia e Inovação (LATTI), UFBA" },
];

const langContent = {
    nav: {
        about: { pt: "Sobre", en: "About" },
        experience: { pt: "Experiência", en: "Experience" },
        projects: { pt: "Projetos", en: "Projects" },
        certificates: { pt: "Certificados", en: "Certificates" },
        skills: { pt: "Habilidades", en: "Skills" },
    },
    hero: {
        eyebrow: { pt: "PORTFÓLIO / CURRÍCULO", en: "PORTFOLIO / RÉSUMÉ" },
        greeting: { pt: "Olá, sou", en: "Hi, I'm" },
        facts: { pt: "Salvador, BA — Brasil  ·  Administração, UFBA  ·  PT · EN · IT · 中文", en: "Salvador, Bahia — Brazil  ·  Administration, UFBA  ·  PT · EN · IT · 中文" },
        cvButton: { pt: "Baixar currículo", en: "Download résumé" },
        scrollHint: { pt: "Sobre mim", en: "About me" },
    },
    about: {
        eyebrow: { pt: "FICHA", en: "PROFILE" },
        title: { pt: "Sobre Mim", en: "About Me" },
    },
    experience: {
        title: { pt: "Experiência", en: "Experience" },
    },
    portfolio: {
        eyebrow: { pt: "TRABALHO", en: "WORK" },
        title: { pt: "Projetos Recentes", en: "Recent Projects" },
        subtitle: { pt: "Projetos e estudos de caso relacionados a esta área.", en: "Projects and case studies related to this area." },
        view: { pt: "Ver projeto", en: "View project" },
    },
    certificates: {
        eyebrow: { pt: "REGISTRO", en: "RECORD" },
        title: { pt: "Certificados & Cursos", en: "Certificates & Courses" },
        download: { pt: "Ver PDF", en: "View PDF" },
        pause: { pt: "Pausar", en: "Pause" },
        play: { pt: "Retomar", en: "Play" },
    },
    skills: {
        eyebrow: { pt: "COMPETÊNCIAS", en: "COMPETENCIES" },
        title: { pt: "Habilidades & Competências", en: "Skills & Competencies" },
        langTitle: { pt: "Idiomas", en: "Languages" },
    },
    footer: {
        cta: { pt: "Vamos conversar", en: "Let's talk" },
        linkedinButton: { pt: "Falar no LinkedIn", en: "Message on LinkedIn" },
    },
};
```

- [ ] **Step 2: Sanity-check the file loads without syntax errors**

Run: `node --check data.js`
Expected: no output (exit code 0)

- [ ] **Step 3: Commit**

```bash
git add data.js
git commit -m "$(cat <<'EOF'
Add shared data.js with area-tagged projects, certificates, skills, bios

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: `components.js` — shared, area-aware React components

**Files:**
- Create: `components.js`

**Interfaces:**
- Consumes: everything `data.js` produces (`portfolioData`, `areaContent`, `skillsByArea`, `languages`, `experienceJobs`, `langContent`) as global bindings (loaded via a plain `<script src="data.js">` before this file).
- Produces: `App` — a component taking `{ area }` (one of `'financas' | 'operacoes' | 'growth' | 'produto'`) and rendering the full area page (Navbar, Hero, About/Experience, Portfolio, Certificates, Skills, ContactStrip, Footer).

- [ ] **Step 1: Write `components.js`**

```javascript
// ---------------------------------------------------------------
// Shared React components for the four area pages.
// Loaded as <script type="text/babel" src="components.js">, after
// data.js and after the React/ReactDOM/Babel CDN scripts.
// ---------------------------------------------------------------

const { useState, useEffect, useRef } = React;

const useFadeInUp = (ref) => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, [ref]);
};

const Navbar = ({ lang, setLang, theme, setTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
    const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

    return (
        <nav className={`fixed w-full z-50 top-0 py-3 md:py-4 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <a href="#home" className="text-xl md:text-2xl font-display font-semibold gradient-text">Pedro Teles</a>
                <div className="hidden md:flex items-center space-x-7 text-sm font-medium tracking-wide">
                    {Object.entries(langContent.nav).map(([key, value]) => (
                        <a key={key} href={`#${key}`} className="text-dim hover:text-current transition-colors duration-300">{value[lang]}</a>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} className="text-lg text-dim hover:text-current transition-colors duration-300">
                        <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button onClick={toggleLang} aria-label="Alternar idioma" className="font-mono text-xs font-semibold text-dim hover:text-current transition-colors duration-300 border border-current rounded px-2 py-1" style={{ borderColor: 'var(--border)' }}>{lang === 'pt' ? 'EN' : 'PT'}</button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu" className="md:hidden text-xl">
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden mt-3" style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}>
                    {Object.entries(langContent.nav).map(([key, value]) => (
                        <a key={key} href={`#${key}`} className="block py-3 px-6 text-sm text-dim" onClick={() => setIsMenuOpen(false)}>{value[lang]}</a>
                    ))}
                </div>
            )}
        </nav>
    );
};

const Hero = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const content = areaContent[area];

    return (
        <header id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 md:pt-20 overflow-hidden">
            <div className="azulejo-field" aria-hidden="true"></div>
            <div ref={ref} className="relative max-w-3xl mx-auto fade-in-up">
                <p className="eyebrow text-dim mb-6">{langContent.hero.eyebrow[lang]}</p>
                <img src="images/profile-square.png" alt="Retrato de Pedro Teles" className="hero-frame w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-7 object-cover" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-4 leading-tight">
                    {langContent.hero.greeting[lang]} <span className="gradient-text">Pedro Teles</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-dim">{content.heroTitle[lang]}</p>
                <p className="font-mono text-xs md:text-sm text-dim mb-10 tracking-wide">{langContent.hero.facts[lang]}</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <a href={content.resumeFile} target="_blank" rel="noopener noreferrer" className="btn-primary font-semibold py-3 px-8 rounded-lg text-base w-full sm:w-auto">{langContent.hero.cvButton[lang]}</a>
                    <div className="flex justify-center space-x-6 text-2xl">
                        <a href="https://www.linkedin.com/in/teles-pedro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-dim hover:text-current transition-colors duration-300"><i className="fab fa-linkedin"></i></a>
                        <a href="https://github.com/eusouopeu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-dim hover:text-current transition-colors duration-300"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <a href="#about" aria-label={langContent.hero.scrollHint[lang]} className="absolute bottom-8 text-dim text-xl animate-bounce hidden sm:block">
                <i className="fas fa-chevron-down"></i>
            </a>
        </header>
    );
};

const AboutAndExperience = ({ lang, area }) => {
    const aboutRef = useRef();
    const expRef = useRef();
    useFadeInUp(aboutRef);
    useFadeInUp(expRef);
    const bio = areaContent[area].bio;

    return (
        <section id="about" className="py-16 md:py-24 section-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-5 gap-16 items-start">
                    <div ref={aboutRef} className="md:col-span-2 fade-in-up">
                        <p className="eyebrow text-dim mb-3">{langContent.about.eyebrow[lang]}</p>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">{langContent.about.title[lang]}</h2>
                        <div className="space-y-4 text-base md:text-lg leading-relaxed">
                            <p>{bio[lang]}</p>
                        </div>
                    </div>
                    <div ref={expRef} id="experience" className="md:col-span-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">{langContent.experience.title[lang]}</h2>
                        <div className="space-y-10">
                            {experienceJobs.map(job => (
                                <div key={job.id} className="ledger-item">
                                    <p className="font-mono text-xs text-dim mb-1 tracking-wide">{job[`date_${lang}`]}</p>
                                    <h3 className="text-xl font-semibold" style={{ color: 'var(--azul)' }}>{job[`title_${lang}`]}</h3>
                                    <p className="text-base text-dim">{job.company}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProjectCard = ({ project, lang, index }) => {
    return (
        <a href={project.link} target="_blank" rel="noopener noreferrer"
           className="card rounded-lg overflow-hidden fade-in-up flex flex-col cursor-pointer no-underline"
           style={{ color: 'var(--ink)', animationDelay: `${index * 0.08}s` }}>
            <div className="card-icon-tile">
                <i className={`fas ${project.icon} text-4xl`} style={{ color: 'var(--azul)' }}></i>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <span className="self-start tag text-xs font-mono px-2 py-1 rounded mb-3">{project.lang}</span>
                <h3 className="text-lg font-semibold mb-2 font-mono">{project[`title_${lang}`]}</h3>
                <p className="text-sm text-dim mb-5 flex-1">{project[`description_${lang}`]}</p>
                <span className="btn-ghost text-sm font-medium py-2 px-4 rounded-md inline-flex items-center gap-2 self-start">
                    <i className="fas fa-arrow-up-right-from-square"></i>{langContent.portfolio.view[lang]}
                </span>
            </div>
        </a>
    );
};

const resolveProjectsForArea = (area) =>
    portfolioData.projects
        .filter(p => p.areas.includes(area))
        .map(p => ({ ...p, ...(p.overrides && p.overrides[area] ? p.overrides[area] : {}) }));

const Portfolio = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const projects = resolveProjectsForArea(area);
    return (
        <section id="projects" className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
                <div ref={ref} className="text-center mb-16 fade-in-up">
                    <p className="eyebrow text-dim mb-3">{langContent.portfolio.eyebrow[lang]}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold mb-3">{langContent.portfolio.title[lang]}</h2>
                    <p className="text-dim">{langContent.portfolio.subtitle[lang]}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} lang={lang} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Certificates = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const [isPaused, setIsPaused] = useState(false);
    const certsForArea = portfolioData.certificates.filter(c => c.areas.includes(area));
    const duplicatedCerts = [...certsForArea, ...certsForArea];
    const scrollDuration = `${certsForArea.length * 2.4}s`;

    return (
        <section id="certificates" ref={ref} className="py-16 md:py-24 section-alt fade-in-up" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-8">
                    <p className="eyebrow text-dim mb-3">{langContent.certificates.eyebrow[lang]}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">{langContent.certificates.title[lang]}</h2>
                </div>
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        aria-pressed={isPaused}
                        aria-label={isPaused ? langContent.certificates.play[lang] : langContent.certificates.pause[lang]}
                        className="btn-ghost text-xs font-medium py-2 px-4 rounded-full inline-flex items-center gap-2"
                    >
                        <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
                        {isPaused ? langContent.certificates.play[lang] : langContent.certificates.pause[lang]}
                    </button>
                </div>
                <div className="carousel-wrapper w-full overflow-hidden relative">
                    <div
                        className="flex animate-scroll"
                        style={{ animationDuration: scrollDuration, animationPlayState: isPaused ? 'paused' : undefined }}
                    >
                        {duplicatedCerts.map((cert, index) => (
                            <div key={index} className="flex-shrink-0 w-60 mx-3">
                                <div className="card p-6 rounded-lg flex flex-col items-center text-center h-full">
                                    <i className="fas fa-certificate text-3xl mb-4" style={{ color: cert.category === 'product' ? 'var(--gold)' : 'var(--azul)' }}></i>
                                    <h4 className="text-base font-semibold mb-1">{cert[`name_${lang}`]}</h4>
                                    <p className="text-sm italic text-dim mb-1">{cert.institution}</p>
                                    <p className="font-mono text-xs text-dim mb-5">{cert[`hours_${lang}`]}</p>
                                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs font-medium py-2 px-4 rounded-md mt-auto">{langContent.certificates.download[lang]}</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const SkillGroup = ({ title, tags }) => (
    <div>
        <h4 className="font-semibold text-base mb-2">{title}</h4>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => <span key={tag} className="tag text-sm py-1 px-3 rounded-full">{tag}</span>)}
        </div>
    </div>
);

const Skills = ({ lang, area }) => {
    const groupsRef = useRef();
    const langRef = useRef();
    useFadeInUp(groupsRef);
    useFadeInUp(langRef);
    const groups = skillsByArea[area];

    return (
        <section id="skills" className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <p className="eyebrow text-dim mb-3">{langContent.skills.eyebrow[lang]}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">{langContent.skills.title[lang]}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    <div ref={groupsRef} className="card p-8 rounded-lg lg:col-span-2 fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {groups.map(group => (
                                <SkillGroup key={group.id} title={group[`title_${lang}`]} tags={group.tags} />
                            ))}
                        </div>
                    </div>
                    <div ref={langRef} className="card p-8 rounded-lg lg:col-span-2 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h4 className="font-semibold text-base mb-4">{langContent.skills.langTitle[lang]}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {languages.map(language => (
                                <div key={language.id} className="text-center">
                                    <p className="text-lg font-semibold">{language[`name_${lang}`]}</p>
                                    <p className="font-mono text-sm text-dim">{language[`level_${lang}`]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ContactStrip = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    return (
        <section className="py-16 md:py-20 section-alt" style={{ borderTop: '1px solid var(--border)' }}>
            <div ref={ref} className="container mx-auto px-4 md:px-8 text-center max-w-2xl fade-in-up">
                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">{langContent.footer.cta[lang]}</h2>
                <p className="text-dim mb-8">{areaContent[area].footerCta[lang]}</p>
                <a href="https://www.linkedin.com/in/teles-pedro/" target="_blank" rel="noopener noreferrer" className="btn-primary font-semibold py-3 px-8 rounded-lg text-base inline-block">{langContent.footer.linkedinButton[lang]}</a>
            </div>
        </section>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-8" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8 text-center text-dim text-sm">
                <p>&copy; {currentYear} Pedro Caio Feitosa Teles</p>
            </div>
        </footer>
    );
};

function App({ area }) {
    const [theme, setTheme] = useState('light');
    const [lang, setLang] = useState('pt');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        const savedLang = localStorage.getItem('lang') || 'pt';
        setLang(savedLang);
    }, []);

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-theme' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        localStorage.setItem('lang', lang);
    }, [lang]);

    return (
        <React.Fragment>
            <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
            <main>
                <Hero lang={lang} area={area} />
                <AboutAndExperience lang={lang} area={area} />
                <Portfolio lang={lang} area={area} />
                <Certificates lang={lang} area={area} />
                <Skills lang={lang} area={area} />
                <ContactStrip lang={lang} area={area} />
            </main>
            <Footer />
        </React.Fragment>
    );
}
```

- [ ] **Step 2: Commit**

```bash
git add components.js
git commit -m "$(cat <<'EOF'
Add shared components.js with an area-aware App component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: `financas.html` — first area page (template for the other three)

**Files:**
- Create: `financas.html`

**Interfaces:**
- Consumes: `data.js` (plain script), `components.js` (`text/babel` script) → `App`.

- [ ] **Step 1: Write `financas.html`**

```html
<!DOCTYPE html>
<html lang="pt-BR" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedro Teles — Análise Financeira</title>
    <meta name="description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em análise financeira, modelagem e indicadores de desempenho.">
    <meta property="og:title" content="Pedro Teles — Análise Financeira">
    <meta property="og:description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em análise financeira, modelagem e indicadores de desempenho.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://eusouopeu.github.io/financas.html">
    <meta property="og:image" content="https://eusouopeu.github.io/images/profile-square.png">
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%230B1220'/%3E%3Cpath d='M32 10 L50 32 L32 54 L14 32 Z' fill='none' stroke='%23C9A227' stroke-width='3'/%3E%3Ccircle cx='32' cy='32' r='9' fill='%234C86BE'/%3E%3C/svg%3E">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
    <!-- React Libraries -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <style>
        :root {
            --bg: #0B1220; --bg-alt: #0F1A2E; --card: #121C31; --card-hover: #16233C;
            --border: #223049; --ink: #ECEFF4; --ink-dim: #92A0B8; --azul: #5B93C4;
            --azul-strong: #2F6690; --gold: #D4AF37; --gold-soft: rgba(212, 175, 55, 0.14);
            --azul-soft: rgba(91, 147, 196, 0.14); --overlay: rgba(11, 18, 32, 0.9);
        }
        .light-theme {
            --bg: #F1F4F9; --bg-alt: #FFFFFF; --card: #FFFFFF; --card-hover: #F7F9FC;
            --border: #DAE2ED; --ink: #121A2B; --ink-dim: #55627A; --azul: #245A85;
            --azul-strong: #16436A; --gold: #9C7A16; --gold-soft: rgba(156, 122, 22, 0.10);
            --azul-soft: rgba(36, 90, 133, 0.08); --overlay: rgba(241, 244, 249, 0.92);
        }
        * { -webkit-tap-highlight-color: transparent; }
        html { background: var(--bg); }
        body { font-family: 'IBM Plex Sans', sans-serif; background: var(--bg); color: var(--ink); transition: background 0.3s ease, color 0.3s ease; }
        h1, h2, h3, .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        ::selection { background: var(--gold-soft); color: var(--ink); }
        a, button { -webkit-tap-highlight-color: transparent; }
        :focus-visible { outline: 2px solid var(--gold); outline-offset: 3px; border-radius: 2px; }
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
        }
        .text-dim { color: var(--ink-dim); }
        .gradient-text { background: linear-gradient(100deg, var(--azul) 0%, var(--gold) 100%); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .section-alt { background-color: var(--bg-alt); }
        .card { background-color: var(--card); border: 1px solid var(--border); transition: border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease; }
        .card:hover { border-color: var(--azul); transform: translateY(-4px); background-color: var(--card-hover); }
        .btn-primary { background-color: var(--azul); color: #F8FAFC; border: 1px solid var(--azul); transition: all 0.25s ease; }
        .btn-primary:hover { background-color: var(--azul-strong); border-color: var(--azul-strong); }
        .btn-ghost { border: 1px solid var(--border); color: var(--ink); transition: all 0.25s ease; }
        .btn-ghost:hover { border-color: var(--gold); color: var(--gold); }
        .tag { background-color: var(--azul-soft); color: var(--azul); border: 1px solid transparent; }
        .light-theme .tag { color: var(--azul-strong); }
        .fade-in-up { opacity: 0; transform: translateY(18px); animation: fadeInUp 0.7s ease-out forwards; }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
        .fade-in-up.visible { opacity: 1; transform: translateY(0); }
        nav.scrolled { background-color: var(--overlay); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
        .ledger-item { position: relative; padding-left: 28px; border-left: 1px solid var(--border); }
        .ledger-item:last-child { border-left: 1px solid transparent; }
        .ledger-item::before { content: ''; position: absolute; left: -5px; top: 6px; width: 9px; height: 9px; border-radius: 2px; transform: rotate(45deg); background-color: var(--gold); }
        @keyframes scroll-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll { animation-name: scroll-x; animation-timing-function: linear; animation-iteration-count: infinite; }
        .carousel-wrapper:hover .animate-scroll, .carousel-wrapper:focus-within .animate-scroll { animation-play-state: paused; }
        .azulejo-field {
            position: absolute; inset: 0; opacity: 0.16;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%235B93C4' stroke-width='1.2'%3E%3Ccircle cx='0' cy='0' r='70'/%3E%3Ccircle cx='200' cy='0' r='70'/%3E%3Ccircle cx='0' cy='200' r='70'/%3E%3Ccircle cx='200' cy='200' r='70'/%3E%3Ccircle cx='100' cy='100' r='30'/%3E%3C/g%3E%3C/svg%3E");
            background-size: 200px 200px;
            mask-image: radial-gradient(ellipse 60% 50% at 50% 22%, black 0%, transparent 75%);
            -webkit-mask-image: radial-gradient(ellipse 60% 50% at 50% 22%, black 0%, transparent 75%);
        }
        .light-theme .azulejo-field { opacity: 0.09; }
        .hero-frame { border: 1px solid var(--border); box-shadow: 0 0 0 6px var(--azul-soft); }
        .eyebrow { font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.14em; font-size: 0.72rem; }
        .card-icon-tile { width: 100%; aspect-ratio: 16 / 10; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--azul-soft), transparent 70%); border-bottom: 1px solid var(--border); }
    </style>
</head>

<body>
    <script>
        (function () {
            var saved = localStorage.getItem('theme') || 'light';
            if (saved === 'light') { document.body.className = 'light-theme'; }
        })();
    </script>
    <div id="root"></div>

    <script src="data.js"></script>
    <script type="text/babel" src="components.js"></script>
    <script type="text/babel">
        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<App area="financas" />);
    </script>
</body>

</html>
```

- [ ] **Step 2: Manual verification**

Start a static server and open the page:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/financas.html` in a browser and confirm:
- No console errors.
- Hero title reads "Análise Financeira · Indicadores de Desempenho".
- Projects section shows exactly 3 cards: Guararapes, Sicoob/BB/Itaú, Lavanderia.
- Certificates carousel shows exactly: Desenvolvimento Web, SQL, Fundamentos de Análise de Dados, Fundamentos de Análise de Negócios, Excel, Harrow House, Modelagem de Dados, HSK 3 (8 certs).
- Skills section shows the 3 finance-specific groups.
- "Baixar currículo" button downloads `certificates/CV-Financas.pdf`.
- PT/EN toggle and dark/light toggle both work.

- [ ] **Step 3: Commit**

```bash
git add financas.html
git commit -m "$(cat <<'EOF'
Add financas.html area page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: `operacoes.html`, `growth.html`, `produto.html`

**Files:**
- Create: `operacoes.html`, `growth.html`, `produto.html`

**Interfaces:**
- Consumes: same as Task 3 (`data.js`, `components.js` → `App`).

- [ ] **Step 1: Create the three files from `financas.html`, changing only the `<title>`, the three `<meta>` tags (`description`, `og:title`, `og:description`, `og:url`), and the `area` prop**

```bash
cp financas.html operacoes.html
cp financas.html growth.html
cp financas.html produto.html
```

Then edit each file's `<head>` and closing script tag:

**`operacoes.html`** — replace:
```html
    <title>Pedro Teles — Análise Financeira</title>
    <meta name="description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em análise financeira, modelagem e indicadores de desempenho.">
    <meta property="og:title" content="Pedro Teles — Análise Financeira">
    <meta property="og:description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em análise financeira, modelagem e indicadores de desempenho.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://eusouopeu.github.io/financas.html">
```
with:
```html
    <title>Pedro Teles — Operações & Processos</title>
    <meta name="description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em planejamento estratégico, processos e indicadores operacionais.">
    <meta property="og:title" content="Pedro Teles — Operações & Processos">
    <meta property="og:description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em planejamento estratégico, processos e indicadores operacionais.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://eusouopeu.github.io/operacoes.html">
```
and replace `root.render(<App area="financas" />);` with `root.render(<App area="operacoes" />);`

**`growth.html`** — replace the same six lines with:
```html
    <title>Pedro Teles — Performance & Growth</title>
    <meta name="description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em performance de negócios, growth analytics e benchmarking.">
    <meta property="og:title" content="Pedro Teles — Performance & Growth">
    <meta property="og:description" content="Pedro Teles — estudante de Administração (UFBA), com experiência em performance de negócios, growth analytics e benchmarking.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://eusouopeu.github.io/growth.html">
```
and replace `root.render(<App area="financas" />);` with `root.render(<App area="growth" />);`

**`produto.html`** — replace the same six lines with:
```html
    <title>Pedro Teles — Gestão de Produto</title>
    <meta name="description" content="Pedro Teles — estudante de Administração (UFBA), atuando com Gestão de Produto e desenvolvimento front-end.">
    <meta property="og:title" content="Pedro Teles — Gestão de Produto">
    <meta property="og:description" content="Pedro Teles — estudante de Administração (UFBA), atuando com Gestão de Produto e desenvolvimento front-end.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://eusouopeu.github.io/produto.html">
```
and replace `root.render(<App area="financas" />);` with `root.render(<App area="produto" />);`

- [ ] **Step 2: Manual verification for each of the three pages**

With the server from Task 3 still running, open each of:
- `http://localhost:8000/operacoes.html` — 2 projects (Guararapes, Dashboard BRF/Copacol/C.Vale, both with the "operações" title variant), CV button downloads `CV-Operacoes.pdf`.
- `http://localhost:8000/growth.html` — 2 projects (Guararapes "Painel de Indicadores de Desempenho", Dashboard "de Desempenho" variant), CV button downloads `CV-Growth.pdf`.
- `http://localhost:8000/produto.html` — 5 projects (rotinas, dumbfood, cifrasGroup, cognidex, lingoflix), certificates include TypeScript and Next.js, CV button downloads `CV-Produto.pdf`.

Confirm no console errors on any of the three.

- [ ] **Step 3: Commit**

```bash
git add operacoes.html growth.html produto.html
git commit -m "$(cat <<'EOF'
Add operacoes.html, growth.html, produto.html area pages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Rebuild `index.html` as the neutral hub

**Files:**
- Modify: `index.html` (full rewrite of `<body>`; `<head>` boilerplate — Tailwind/Font Awesome/fonts/React CDN links and the `<style>` block — stays as it is today, since the hub uses the same visual system)

**Interfaces:**
- Consumes: `data.js` for `areaContent` (labels + `resumeFile`) to render the four area cards and the generic CV link; does **not** load `components.js` (the hub's nav/hero are bespoke, not the area `App`).

- [ ] **Step 1: Replace everything from `<body>` onward in `index.html`**

```html
<body>
    <script>
        (function () {
            var saved = localStorage.getItem('theme') || 'light';
            if (saved === 'light') { document.body.className = 'light-theme'; }
        })();
    </script>
    <div id="root"></div>

    <script src="data.js"></script>
    <script type="text/babel">
        const { useState, useEffect } = React;

        const hubContent = {
            eyebrow: { pt: "PORTFÓLIO / CURRÍCULO", en: "PORTFOLIO / RÉSUMÉ" },
            greeting: { pt: "Olá, sou", en: "Hi, I'm" },
            title: { pt: "Análise de Negócios & Gestão de Produto", en: "Business Analysis & Product Management" },
            facts: { pt: "Salvador, BA — Brasil  ·  Administração, UFBA  ·  PT · EN · IT · 中文", en: "Salvador, Bahia — Brazil  ·  Administration, UFBA  ·  PT · EN · IT · 中文" },
            bio: {
                pt: "Estudante de Administração da UFBA, na interseção entre dados, produto e operações. Escolha abaixo a área que mais se conecta com a vaga que você está avaliando — cada uma mostra os projetos, certificados e habilidades mais relevantes para ela.",
                en: "Administration student at UFBA, working at the intersection of data, product, and operations. Pick the area below that best matches the role you're evaluating — each one shows the projects, certificates, and skills most relevant to it.",
            },
            pickerEyebrow: { pt: "ESCOLHA UMA ÁREA", en: "CHOOSE AN AREA" },
            genericCv: { pt: "Baixar currículo padrão", en: "Download general résumé" },
        };

        const areaCardCopy = {
            financas: { pt: "Análise financeira, modelagem e indicadores de desempenho.", en: "Financial analysis, modeling, and performance indicators." },
            operacoes: { pt: "Planejamento estratégico, processos e indicadores operacionais.", en: "Strategic planning, process improvement, and operational indicators." },
            growth: { pt: "Performance de negócios, growth analytics e benchmarking.", en: "Business performance, growth analytics, and benchmarking." },
            produto: { pt: "Gestão de produto, pesquisa e desenvolvimento front-end.", en: "Product management, research, and front-end development." },
        };

        const AREA_ORDER = ['financas', 'operacoes', 'growth', 'produto'];
        const AREA_ICON = { financas: 'fa-chart-line', operacoes: 'fa-gears', growth: 'fa-rocket', produto: 'fa-layer-group' };

        const HubNavbar = ({ lang, setLang, theme, setTheme }) => {
            const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
            const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');
            return (
                <nav className="fixed w-full z-50 top-0 py-3 md:py-4">
                    <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                        <span className="text-xl md:text-2xl font-display font-semibold gradient-text">Pedro Teles</span>
                        <div className="flex items-center gap-4">
                            <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} className="text-lg text-dim hover:text-current transition-colors duration-300">
                                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                            <button onClick={toggleLang} aria-label="Alternar idioma" className="font-mono text-xs font-semibold text-dim hover:text-current transition-colors duration-300 border border-current rounded px-2 py-1" style={{ borderColor: 'var(--border)' }}>{lang === 'pt' ? 'EN' : 'PT'}</button>
                        </div>
                    </div>
                </nav>
            );
        };

        const AreaCard = ({ area, lang }) => (
            <a href={`${area}.html`} className="card rounded-lg p-8 flex flex-col items-start text-left no-underline transition-transform" style={{ color: 'var(--ink)' }}>
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5" style={{ background: 'var(--azul-soft)' }}>
                    <i className={`fas ${AREA_ICON[area]} text-2xl`} style={{ color: 'var(--azul)' }}></i>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">{areaContent[area].label[lang]}</h3>
                <p className="text-sm text-dim mb-5">{areaCardCopy[area][lang]}</p>
                <span className="btn-ghost text-sm font-medium py-2 px-4 rounded-md inline-flex items-center gap-2">
                    {lang === 'pt' ? 'Ver perfil' : 'View profile'} <i className="fas fa-arrow-right"></i>
                </span>
            </a>
        );

        function Hub() {
            const [theme, setTheme] = useState('light');
            const [lang, setLang] = useState('pt');

            useEffect(() => {
                setTheme(localStorage.getItem('theme') || 'light');
                setLang(localStorage.getItem('lang') || 'pt');
            }, []);

            useEffect(() => {
                document.body.className = theme === 'light' ? 'light-theme' : '';
                localStorage.setItem('theme', theme);
            }, [theme]);

            useEffect(() => {
                document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
                localStorage.setItem('lang', lang);
            }, [lang]);

            return (
                <React.Fragment>
                    <HubNavbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
                    <header className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 overflow-hidden">
                        <div className="azulejo-field" aria-hidden="true"></div>
                        <div className="relative max-w-2xl mx-auto">
                            <p className="eyebrow text-dim mb-6">{hubContent.eyebrow[lang]}</p>
                            <img src="images/profile-square.png" alt="Retrato de Pedro Teles" className="hero-frame w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-7 object-cover" />
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-4 leading-tight">
                                {hubContent.greeting[lang]} <span className="gradient-text">Pedro Teles</span>
                            </h1>
                            <p className="text-lg md:text-xl mb-6 text-dim">{hubContent.title[lang]}</p>
                            <p className="font-mono text-xs md:text-sm text-dim mb-8 tracking-wide">{hubContent.facts[lang]}</p>
                            <p className="text-base md:text-lg text-dim mb-10">{hubContent.bio[lang]}</p>
                            <a href="certificates/Curriculo Pedro Teles.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm font-medium py-2 px-5 rounded-md inline-flex items-center gap-2">
                                <i className="fas fa-file-arrow-down"></i>{hubContent.genericCv[lang]}
                            </a>
                        </div>
                    </header>
                    <section className="py-16 md:py-24 section-alt" style={{ borderTop: '1px solid var(--border)' }}>
                        <div className="container mx-auto px-4 md:px-8">
                            <p className="eyebrow text-dim mb-10 text-center">{hubContent.pickerEyebrow[lang]}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                                {AREA_ORDER.map(area => <AreaCard key={area} area={area} lang={lang} />)}
                            </div>
                        </div>
                    </section>
                    <footer className="py-8" style={{ borderTop: '1px solid var(--border)' }}>
                        <div className="container mx-auto px-4 md:px-8 text-center text-dim text-sm">
                            <p>&copy; {new Date().getFullYear()} Pedro Caio Feitosa Teles</p>
                        </div>
                    </footer>
                </React.Fragment>
            );
        }

        const container = document.getElementById('root');
        const root = ReactDOM.createRoot(container);
        root.render(<Hub />);
    </script>
</body>

</html>
```

Also update the `<head>` `<title>` and `og:*` tags to the neutral hub framing:
```html
    <title>Pedro Teles — Portfólio</title>
    <meta name="description" content="Pedro Teles — estudante de Administração (UFBA). Escolha uma área — Finanças, Operações, Marketing & Growth ou Produto — para ver o portfólio, currículo e certificações correspondentes.">
    <meta property="og:title" content="Pedro Teles — Portfólio">
    <meta property="og:description" content="Escolha uma área — Finanças, Operações, Marketing & Growth ou Produto — para ver o portfólio, currículo e certificações correspondentes.">
    <meta property="og:url" content="https://eusouopeu.github.io">
```

- [ ] **Step 2: Manual verification**

Open `http://localhost:8000/index.html`:
- No console errors.
- Hero + short bio render, no projects/certificates/skills sections present.
- Four area cards render, each linking to its own `<area>.html`.
- Clicking each card navigates to the right page.
- "Baixar currículo padrão" downloads `certificates/Curriculo Pedro Teles.pdf`.
- PT/EN and dark/light toggles work.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Rebuild index.html as a neutral hub linking to the four area pages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Cross-link audit and final QA

**Files:**
- None (verification only; fix forward in whichever file the audit flags, then re-run this task).

- [ ] **Step 1: Grep every area page for links back to the hub or to a sibling area page**

```bash
for f in financas.html operacoes.html growth.html produto.html; do
  echo "=== $f ==="
  grep -n 'index.html\|financas.html\|operacoes.html\|growth.html\|produto.html' "$f" | grep -v "root.render"
done
```

Expected: no output for any file (each area page references only itself, if at all, via the inline `root.render(<App area="…"/>)` line which the grep's `-v` already excludes).

- [ ] **Step 2: Confirm the hub is the only file linking to the area pages**

```bash
grep -l 'financas.html\|operacoes.html\|growth.html\|produto.html' *.html
```

Expected: only `index.html`.

- [ ] **Step 3: Full manual walkthrough (all 5 pages, both languages, both themes)**

Using the server started in Task 3, open each of `index.html`, `financas.html`, `operacoes.html`, `growth.html`, `produto.html` and confirm:
- Content matches the mapping table in the spec (projects/certificates/skills/bio per area).
- No visible link, button, or breadcrumb leads off an area page except the external LinkedIn/GitHub icons and the project/certificate links themselves.
- Résumé download button on each area page serves that area's own PDF (check the downloaded filename).

- [ ] **Step 4: Final commit (only if Step 1–3 required fixes)**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Fix cross-links found in multi-area portfolio QA pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
