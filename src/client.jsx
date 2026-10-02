// Client entry: hydrates the prerendered markup in #root.
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App, Hub, CaseStudy } from './components.jsx';

const root = document.getElementById('root');
const { page, area, slug } = root.dataset;
const element = page === 'hub' ? <Hub /> : page === 'case' ? <CaseStudy slug={slug} /> : <App area={area} />;
hydrateRoot(root, element);
