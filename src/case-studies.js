// ---------------------------------------------------------------
// Case studies — one entry per project page (estudo-<slug>.html).
// A project in data.js links here through `caseStudy: '<slug>'`.
// Each section body is a list of paragraphs (strings) or
// { list: [...] } bullet blocks, in both languages.
// ---------------------------------------------------------------

export const caseStudies = {
    dumbfood: {
        slug: 'dumbfood',
        area: 'produto',
        title: 'dumbfood',
        link: 'https://eusouopeu.github.io/dumbfood',
        repo: 'https://github.com/eusouopeu/dumbfood',
        tagline: {
            pt: 'Da receita salva à lista de mercado por gôndola — e o que eu cortei no caminho.',
            en: 'From a saved recipe to an aisle-sorted grocery list — and what I cut along the way.',
        },
        meta: {
            pt: [['Papel', 'Produto, design e desenvolvimento (solo)'], ['Período', 'Jul – Out 2026 · ~10 semanas'], ['Plataformas', 'PWA + app Android']],
            en: [['Role', 'Product, design and development (solo)'], ['Timeline', 'Jul – Oct 2026 · ~10 weeks'], ['Platforms', 'PWA + Android app']],
        },
        metrics: [
            { value: '34', label: { pt: 'entregas versionadas', en: 'versioned releases' } },
            { value: '263', label: { pt: 'testes automatizados', en: 'automated tests' } },
            { value: '10', label: { pt: 'telas', en: 'screens' } },
            { value: '0', label: { pt: 'contas ou servidores para usar', en: 'accounts or servers needed' } },
        ],
        sections: [
            {
                id: 'contexto',
                nav: { pt: 'Contexto', en: 'Context' },
                title: { pt: 'Contexto e problema', en: 'Context and problem' },
                body: {
                    pt: [
                        'Planejar as refeições da semana exige três ferramentas que não conversam: o site da receita, uma nota com a lista de compras e a memória do que já tem em casa. As quantidades vêm para o número de porções do autor, ingredientes repetidos aparecem em várias receitas e a lista sai na ordem em que foi digitada — não na ordem em que se anda no mercado.',
                        'A pergunta de produto: dá para ir de "quero fazer essas 4 receitas" a "lista pronta, somada e por corredor" sem redigitar nada?',
                    ],
                    en: [
                        'Planning a week of meals takes three tools that don’t talk to each other: the recipe site, a note with the grocery list, and your memory of what’s already at home. Quantities come scaled to the author’s servings, repeated ingredients show up across recipes, and the list ends up in typing order — not the order you walk the store.',
                        'The product question: can you go from “I want to cook these 4 recipes” to “list ready, summed up and sorted by aisle” without retyping anything?',
                    ],
                },
            },
            {
                id: 'descoberta',
                nav: { pt: 'Descoberta', en: 'Discovery' },
                title: { pt: 'Descoberta e hipóteses', en: 'Discovery and hypotheses' },
                body: {
                    pt: [
                        'Comecei com três hipóteses, testadas em ciclos curtos de uso real — cada versão ia para o celular no mesmo dia:',
                        { list: [
                            'Redigitar ingredientes é o maior atrito — a importação precisa funcionar com um link colado.',
                            'Uma lista só é útil se bater com o que o mercado vende: "700 g de farinha" não existe na prateleira.',
                            'O que já está em casa precisa sair da lista automaticamente, senão a pessoa compra em dobro.',
                        ] },
                        'O uso mostrou uma quarta, que eu não esperava: boa parte das receitas que as pessoas guardam hoje vem de vídeo (TikTok/Reels), com a receita escrita na legenda ou "nos comentários".',
                    ],
                    en: [
                        'I started from three hypotheses, tested in short cycles of real use — every version shipped to my phone the same day:',
                        { list: [
                            'Retyping ingredients is the biggest friction — import has to work from a pasted link.',
                            'A list is only useful if it matches what the store sells: “700 g of flour” isn’t on the shelf.',
                            'What’s already at home must leave the list automatically, or people buy twice.',
                        ] },
                        'Usage surfaced a fourth one I didn’t expect: many of the recipes people save today come from video (TikTok/Reels), with the recipe written in the caption or “in the comments”.',
                    ],
                },
            },
            {
                id: 'decisoes',
                nav: { pt: 'Decisões', en: 'Decisions' },
                title: { pt: 'Decisões de produto e por quê', en: 'Product decisions and why' },
                decisions: [
                    {
                        what: { pt: 'Importar lendo os dados estruturados da página', en: 'Import by reading the page’s structured data' },
                        why: {
                            pt: 'Sites de receita publicam schema.org/Recipe para o Google. Ler esse JSON-LD é mais confiável que raspar HTML e cobre TudoGostoso, Panelinha e a maioria dos blogs. Para sites que bloqueiam, "colar texto" continua funcionando offline.',
                            en: 'Recipe sites publish schema.org/Recipe for Google. Reading that JSON-LD is more reliable than scraping HTML and covers most Brazilian recipe sites and blogs. For sites that block it, “paste text” still works offline.',
                        },
                    },
                    {
                        what: { pt: 'Arredondar a lista para embalagens reais', en: 'Round the list to real package sizes' },
                        why: {
                            pt: 'A lista mostra 1 kg em vez de 700 g, com a sobra anotada — e a sobra vai para a despensa. A lista passa a ser o que se pega na prateleira, não um cálculo.',
                            en: 'The list shows 1 kg instead of 700 g, with the leftover noted — and the leftover goes into the pantry. The list becomes what you grab off the shelf, not a calculation.',
                        },
                    },
                    {
                        what: { pt: 'Nota fiscal pelo QR Code, não por OCR', en: 'Receipts via QR code, not OCR' },
                        why: {
                            pt: 'O QR da NFC-e traz item, quantidade e preço direto da Sefaz, sem erro de leitura. O OCR da foto ficou só como alternativa sem internet. É isso que alimenta o histórico de preços e a comparação entre mercados.',
                            en: 'The NFC-e QR code returns item, quantity and price straight from the tax authority, with no reading errors. Photo OCR stayed only as an offline fallback. This is what feeds price history and store comparison.',
                        },
                    },
                    {
                        what: { pt: 'Offline-first, sem conta', en: 'Offline-first, no account' },
                        why: {
                            pt: 'Tudo fica no aparelho (IndexedDB). Sem cadastro, a primeira receita entra em segundos; o custo é não ter sincronização, compensado por um backup JSON que mescla ou substitui.',
                            en: 'Everything lives on the device (IndexedDB). With no sign-up, the first recipe goes in within seconds; the trade-off is no sync, offset by a JSON backup that can merge or replace.',
                        },
                    },
                    {
                        what: { pt: 'Cortar o que não era usado', en: 'Cut what wasn’t used' },
                        why: {
                            pt: 'O "modo cozinha", a seleção múltipla de receitas e o filtro por tempo saíram. A tela inicial deixou de ser a lista de receitas e virou "o dia" — o que foi planejado e comido hoje —, porque era a tela aberta várias vezes por dia.',
                            en: '“Cooking mode”, multi-select and the time filter were removed. The home screen stopped being the recipe list and became “today” — what was planned and eaten — because that was the screen opened several times a day.',
                        },
                    },
                ],
            },
            {
                id: 'tecnico',
                nav: { pt: 'Técnico', en: 'Technical' },
                title: { pt: 'Stack e desafios técnicos', en: 'Stack and technical challenges' },
                stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Dexie (IndexedDB)', 'PWA', 'Capacitor (Android)', 'Vercel Functions', 'Vitest'],
                body: {
                    pt: [
                        { list: [
                            'Entender "2 xícaras de farinha de trigo": parser de ingredientes com dicionário de unidades em português e conversão g/kg e ml/l para somar itens iguais entre receitas.',
                            'CORS e anti-bot: a busca da receita roda numa função serverless, com cache de 24 h e limite de 20 requisições/min por IP — sem isso, a função viraria um proxy aberto.',
                            'Peso da primeira abertura: OCR, leitor de QR e vídeo só carregam nas telas que os usam (lazy loading).',
                            'Regra de negócio sem dupla contagem: exercício registrado não aumenta a meta de calorias, porque o fator de atividade do perfil já conta o gasto habitual.',
                        ] },
                    ],
                    en: [
                        { list: [
                            'Understanding “2 cups of wheat flour”: an ingredient parser with a Portuguese unit dictionary and g/kg and ml/l conversion to sum matching items across recipes.',
                            'CORS and anti-bot: recipe fetching runs in a serverless function, with a 24 h cache and a 20 requests/min per-IP limit — without it, the function would be an open proxy.',
                            'First-load weight: OCR, the QR reader and video only load on the screens that use them (lazy loading).',
                            'Business rules without double counting: logged exercise doesn’t raise the calorie goal, because the profile’s activity factor already accounts for habitual expenditure.',
                        ] },
                    ],
                },
            },
            {
                id: 'resultado',
                nav: { pt: 'Resultado', en: 'Outcome' },
                title: { pt: 'Resultado e próxima iteração', en: 'Outcome and next iteration' },
                body: {
                    pt: [
                        'O fluxo central — colar link, escolher receitas e dias, sair com a lista por gôndola descontando a despensa — funciona de ponta a ponta, offline, no navegador e como app Android.',
                        'O que eu faria diferente:',
                        { list: [
                            'Testar com outras pessoas mais cedo. O app cresceu de lista de mercado para planejamento nutricional guiado pelo meu uso; entrevistas curtas teriam mostrado qual desses trabalhos importa mais para quem não sou eu.',
                            'Instrumentar desde o início (eventos anônimos de importação, lista gerada e lista concluída) para decidir cortes com dados, e não só com percepção.',
                            'Definir uma métrica norte cedo — por exemplo, listas concluídas por semana — para avaliar cada funcionalidade nova contra ela.',
                        ] },
                    ],
                    en: [
                        'The core flow — paste a link, pick recipes and days, leave with an aisle-sorted list minus what’s in the pantry — works end to end, offline, in the browser and as an Android app.',
                        'What I’d do differently:',
                        { list: [
                            'Test with other people sooner. The app grew from a grocery list into guided nutrition planning driven by my own use; short interviews would have shown which of those jobs matters most to someone who isn’t me.',
                            'Instrument from day one (anonymous events for import, list generated and list completed) to decide cuts with data, not just perception.',
                            'Set a north-star metric early — e.g. lists completed per week — and weigh every new feature against it.',
                        ] },
                    ],
                },
            },
        ],
    },
};

export const caseStudyCopy = {
    eyebrow: { pt: 'ESTUDO DE CASO', en: 'CASE STUDY' },
    back: { pt: 'Voltar ao portfólio de Produto', en: 'Back to the Product portfolio' },
    openApp: { pt: 'Abrir o app', en: 'Open the app' },
    repo: { pt: 'Código no GitHub', en: 'Code on GitHub' },
    contents: { pt: 'Nesta página', en: 'On this page' },
    numbers: { pt: 'EM NÚMEROS', en: 'BY THE NUMBERS' },
    decision: { pt: 'Decisão', en: 'Decision' },
    why: { pt: 'Por quê', en: 'Why' },
};
