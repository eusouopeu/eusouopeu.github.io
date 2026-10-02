// Generates the 1200×630 social preview images in images/og/ (one per page).
// Run with `npm run og` when titles change; the PNGs are committed.
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';

const cards = [
    { file: 'index', eyebrow: 'PORTFÓLIO / CURRÍCULO', title: 'Análise de Negócios', title2: '& Gestão de Produto' },
    { file: 'financas', eyebrow: 'FINANÇAS', title: 'Análise Financeira', title2: '& Indicadores de Desempenho' },
    { file: 'operacoes', eyebrow: 'OPERAÇÕES', title: 'Planejamento', title2: '& Processos' },
    { file: 'growth', eyebrow: 'MARKETING & GROWTH', title: 'Performance de Negócios', title2: '& Growth Analytics' },
    { file: 'produto', eyebrow: 'PRODUTO', title: 'Gestão de Produto', title2: '& Design Thinking' },
    { file: 'estudo-dumbfood', eyebrow: 'ESTUDO DE CASO', title: 'dumbfood', title2: 'Da receita à lista por gôndola' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const photo = readFileSync('images/profile-square.png').toString('base64');

const svg = ({ eyebrow, title, title2 }) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#5B93C4"/><stop offset="1" stop-color="#D4AF37"/></linearGradient>
    <pattern id="az" width="200" height="200" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="#5B93C4" stroke-width="1.2" opacity="0.18">
        <circle cx="0" cy="0" r="70"/><circle cx="200" cy="0" r="70"/><circle cx="0" cy="200" r="70"/><circle cx="200" cy="200" r="70"/><circle cx="100" cy="100" r="30"/>
      </g>
    </pattern>
    <clipPath id="c"><circle cx="1010" cy="315" r="110"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="#0B1220"/>
  <rect width="1200" height="630" fill="url(#az)"/>
  <rect x="0" y="0" width="12" height="630" fill="url(#g)"/>
  <text x="90" y="200" font-family="Menlo, monospace" font-size="24" letter-spacing="5" fill="#92A0B8">${esc(eyebrow)}</text>
  <text x="90" y="300" font-family="Georgia, serif" font-size="68" font-weight="bold" fill="#ECEFF4">${esc(title)}</text>
  <text x="90" y="380" font-family="Georgia, serif" font-size="44" fill="#ECEFF4">${esc(title2)}</text>
  <text x="90" y="500" font-family="Georgia, serif" font-size="38" font-weight="bold" fill="url(#g)">Pedro Teles</text>
  <text x="90" y="545" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#92A0B8">Administração · UFBA · Salvador, BA</text>
  <circle cx="1010" cy="315" r="120" fill="none" stroke="rgba(91,147,196,0.35)" stroke-width="10"/>
  <image href="data:image/png;base64,${photo}" x="900" y="205" width="220" height="220" clip-path="url(#c)" preserveAspectRatio="xMidYMid slice"/>
</svg>`;

mkdirSync('images/og', { recursive: true });
for (const card of cards) {
    await sharp(Buffer.from(svg(card))).png({ compressionLevel: 9 }).toFile(`images/og/${card.file}.png`);
    console.log('wrote', `images/og/${card.file}.png`);
}
