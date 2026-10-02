# Workflow

Toda mudança no código dos sites-portfolio (qualquer arquivo deste repositório) deve ser
seguida por commit e push para o GitHub — não deixar alterações apenas no working directory.

# Build

O site é gerado a partir de `src/` — não editar os `.html` da raiz à mão (exceto `404.html`).

- Conteúdo: `src/data.js` (projetos, certificados, áreas, contato) e `src/case-studies.js`
  (estudos de caso; um projeto aponta para o seu com `caseStudy: '<slug>'`).
- Componentes: `src/components.jsx`. Estilos: `src/styles.css` (Tailwind compilado).
- `npm run build` gera `index.html`, as quatro áreas, `estudo-<slug>.html` (pré-renderizados,
  hidratados por `assets/client.js`), `assets/styles.css` e `sitemap.xml`. Commitar a saída.
- `npm run og` regera as imagens de prévia em `images/og/` (rodar ao criar página ou mudar título;
  incluir o novo card em `scripts/og-images.mjs`).
- Estatísticas de visita: GoatCounter (código `eusouopeu`, em `build.mjs` e `404.html`). Nada
  aparece no site; o painel só é visível logado em eusouopeu.goatcounter.com. Cliques
  rastreados via atributo `data-goatcounter-click`.

# Melhorias futuras

## Páginas de estudo de caso por projeto (dumbfood feito; estender aos demais)

Para vaga de análise de negócios/produto, o que diferencia é o *processo*, não só o resultado.
Hoje cada projeto no portfólio é um card raso (título + descrição curta + link). Uma página
(ou modal) por projeto com contexto, descoberta, decisões e métricas — estilo estudo de caso —
vale mais que isso.

Sugestão de estrutura por estudo de caso:
- Contexto/problema que motivou o projeto
- Processo de descoberta (pesquisa, entrevistas, hipóteses)
- Decisões de produto/design tomadas e por quê
- Stack e principais desafios técnicos
- Resultado/métricas, ou o que ficaria diferente numa próxima iteração

O primeiro (dumbfood) está em `src/case-studies.js`; os próximos seguem a mesma estrutura.
