// Prerender entry, used only by build.mjs (Node).
import React from 'react';
import { renderToString } from 'react-dom/server';
import { App, Hub, CaseStudy } from './components.jsx';

export const render = ({ page, area, slug }) => renderToString(
    page === 'hub' ? <Hub /> : page === 'case' ? <CaseStudy slug={slug} /> : <App area={area} />
);

export { areaContent, SITE_URL, contact } from './data.js';
export { caseStudies } from './case-studies.js';
