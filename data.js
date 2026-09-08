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
            link: "https://eusouopeu.github.io/rotinas",
            areas: ['produto'],
        },
        {
            id: 2, icon: 'fa-utensils', lang: 'TypeScript',
            title_pt: "dumbfood", title_en: "dumbfood",
            description_pt: "PWA que importa receitas de sites e vídeos, reescala porções e monta a lista de compras do mercado — unificada, somada e por gôndola.",
            description_en: "A PWA that imports recipes from sites and videos, rescales portions, and builds a unified, aisle-sorted grocery list.",
            link: "https://eusouopeu.github.io/dumbfood",
            areas: ['produto'],
        },
        {
            id: 3, icon: 'fa-guitar', lang: 'TypeScript',
            title_pt: "cifrasGroup", title_en: "cifrasGroup",
            description_pt: "Leitor de cifras para violão com simplificação harmônica automática, busca de digitações e metrônomo que toca a batida — tudo no navegador, sem servidor.",
            description_en: "A guitar chord-sheet reader with automatic harmonic simplification, fingering search, and a metronome that plays the beat — runs entirely in the browser.",
            link: "https://eusouopeu.github.io/cifrasGroup",
            areas: ['produto'],
        },
        {
            id: 4, icon: 'fa-graduation-cap', lang: 'React',
            title_pt: "cognidex", title_en: "cognidex",
            description_pt: "App que compara técnicas de estudo lado a lado, identifica plantas por foto e organiza guias passo a passo — funciona offline como PWA ou app Android.",
            description_en: "An app that compares study techniques side by side, identifies plants from a photo, and organizes step-by-step guides — works offline as a PWA or Android app.",
            link: "https://eusouopeu.github.io/bookdex",
            areas: ['produto'],
        },
        {
            id: 5, icon: 'fa-clapperboard', lang: 'React',
            title_pt: "lingoflix", title_en: "lingoflix",
            description_pt: "Recomendador de filmes e séries por idioma, gênero e plataforma de streaming, para praticar um novo idioma assistindo ao que realmente interessa.",
            description_en: "A movie and show recommender filtered by language, genre, and streaming platform — practice a new language by watching what actually interests you.",
            link: "https://eusouopeu.github.io/lingoflix",
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
        viewCarousel: { pt: "Carrossel", en: "Carousel" },
        viewAll: { pt: "Ver todos", en: "Show all" },
        prev: { pt: "Certificado anterior", en: "Previous certificate" },
        next: { pt: "Próximo certificado", en: "Next certificate" },
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
