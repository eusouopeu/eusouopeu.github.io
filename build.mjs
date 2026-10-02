// Build: bundles src/ with esbuild, compiles Tailwind, prerenders every page
// to static HTML at the repo root (GitHub Pages serves it as-is), and writes
// sitemap.xml. Run with `npm run build` and commit the output.

import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// GoatCounter site code — the dashboard lives at https://<code>.goatcounter.com
const GOATCOUNTER = 'eusouopeu';

const version = Date.now().toString(36);
mkdirSync('assets', { recursive: true });

// 1. Client bundle (React in production mode, minified).
await build({
    entryPoints: ['src/client.jsx'],
    bundle: true,
    minify: true,
    format: 'esm',
    target: 'es2019',
    outfile: 'assets/client.js',
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    legalComments: 'none',
});

// 2. Tailwind → assets/styles.css
execFileSync('npx', ['tailwindcss', '-c', 'tailwind.config.cjs', '-i', 'src/styles.css', '-o', 'assets/styles.css', '--minify'], { stdio: 'inherit' });

// 3. Prerender bundle (Node, throwaway).
const serverFile = '.build-server.mjs';
await build({
    entryPoints: ['src/server.jsx'],
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: serverFile,
    jsx: 'automatic',
    packages: 'external',
    define: { 'process.env.NODE_ENV': '"production"' },
});
const { render, areaContent, SITE_URL, contact, caseStudies } = await import(pathToFileURL(serverFile).href + `?v=${version}`);
rmSync(serverFile);

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const person = {
    '@type': 'Person',
    name: 'Pedro Caio Feitosa Teles',
    alternateName: 'Pedro Teles',
    url: SITE_URL + '/',
    image: `${SITE_URL}/images/profile-square.png`,
    email: `mailto:${contact.email}`,
    jobTitle: 'Estudante de Administração',
    address: { '@type': 'PostalAddress', addressLocality: 'Salvador', addressRegion: 'BA', addressCountry: 'BR' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universidade Federal da Bahia (UFBA)' },
    knowsLanguage: ['pt-BR', 'en', 'it', 'zh'],
    sameAs: [contact.linkedin, contact.github],
};

const AREA_TITLES = { financas: 'Análise Financeira', operacoes: 'Operações & Processos', growth: 'Performance & Growth', produto: 'Gestão de Produto' };

const pages = [
    {
        file: 'index.html', root: { page: 'hub' }, og: 'index',
        title: 'Pedro Teles — Portfólio',
        description: 'Pedro Teles — estudante de Administração (UFBA). Escolha uma área — Finanças, Operações, Marketing & Growth ou Produto — para ver o portfólio, currículo e certificações correspondentes.',
        priority: '1.0',
    },
    ...['financas', 'operacoes', 'growth', 'produto'].map(area => ({
        file: `${area}.html`, root: { page: 'area', area }, og: area,
        title: `Pedro Teles — ${AREA_TITLES[area]}`,
        description: areaContent[area].metaDescription.pt,
        priority: '0.8',
    })),
    ...Object.values(caseStudies).map(study => ({
        file: `estudo-${study.slug}.html`, root: { page: 'case', slug: study.slug }, og: `estudo-${study.slug}`,
        title: `Estudo de caso: ${study.title} — Pedro Teles`,
        description: study.tagline.pt,
        ogType: 'article',
        priority: '0.7',
        article: study,
    })),
];

const template = readFileSync('src/template.html', 'utf8');

for (const p of pages) {
    const url = p.file === 'index.html' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}`;
    const jsonld = p.article
        ? { '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.description, url, author: person, image: `${SITE_URL}/images/og/${p.og}.png`, inLanguage: 'pt-BR' }
        : { '@context': 'https://schema.org', ...person, ...(p.file === 'index.html' ? {} : { mainEntityOfPage: url }) };
    const rootAttrs = Object.entries(p.root).map(([k, v]) => `data-${k}="${v}"`).join(' ');
    const vars = {
        title: escapeAttr(p.title),
        description: escapeAttr(p.description),
        url,
        ogType: p.ogType || 'website',
        image: `${SITE_URL}/images/og/${p.og}.png`,
        jsonld: JSON.stringify(jsonld).replace(/</g, '\\u003c'),
        version,
        goatcounter: GOATCOUNTER,
        rootAttrs,
        app: render(p.root),
    };
    const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key]);
    writeFileSync(p.file, html);
    console.log('wrote', p.file);
}

// 4. sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>${p.file === 'index.html' ? `${SITE_URL}/` : `${SITE_URL}/${p.file}`}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync('sitemap.xml', sitemap);
console.log('wrote sitemap.xml');
