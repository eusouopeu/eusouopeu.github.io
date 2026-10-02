// ---------------------------------------------------------------
// Shared React components for every page (hub, four area pages,
// case studies). Bundled and prerendered by build.mjs — edit here,
// then run `npm run build`.
// ---------------------------------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import {
    portfolioData, areaContent, skillsByArea, languages, experienceJobs, langContent, contact,
} from './data.js';
import { caseStudies, caseStudyCopy } from './case-studies.js';

const t = (group, key, lang) => langContent[group][key][lang];

// ---- Preferences ------------------------------------------------
// The prerendered HTML is always pt/light, so the first client render
// must match it; the real preference is applied in an effect. With no
// saved choice, the visitor's system theme and browser language win.
// Only an explicit toggle is persisted.

const readStored = (key) => {
    try { return localStorage.getItem(key); } catch (e) { return null; }
};
const store = (key, value) => {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
};

export const preferredTheme = () => {
    const saved = readStored('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const preferredLang = () => {
    const saved = readStored('lang');
    if (saved === 'pt' || saved === 'en') return saved;
    return (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
};

const usePrefs = () => {
    const [theme, setThemeState] = useState('light');
    const [lang, setLangState] = useState('pt');

    useEffect(() => {
        setThemeState(preferredTheme());
        setLangState(preferredLang());
    }, []);

    useEffect(() => {
        document.body.classList.toggle('light-theme', theme === 'light');
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    }, [lang]);

    const setTheme = (value) => { store('theme', value); setThemeState(value); };
    const setLang = (value) => { store('lang', value); setLangState(value); };
    return { theme, setTheme, lang, setLang };
};

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

// ---- Shared chrome ----------------------------------------------

const SkipLink = ({ lang }) => (
    <a href="#main" className="skip-link">{t('a11y', 'skip', lang)}</a>
);

const NavControls = ({ lang, setLang, theme, setTheme }) => (
    <React.Fragment>
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={t('a11y', theme === 'dark' ? 'themeToLight' : 'themeToDark', lang)}
            className="text-lg text-dim hover:text-current transition-colors duration-300"
        >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true"></i>
        </button>
        <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={t('a11y', 'langToggle', lang)}
            lang={lang === 'pt' ? 'en' : 'pt'}
            className="font-mono text-xs font-semibold text-dim hover:text-current transition-colors duration-300 border border-current rounded px-2 py-1"
            style={{ borderColor: 'var(--border)' }}
        >
            {lang === 'pt' ? 'EN' : 'PT'}
        </button>
    </React.Fragment>
);

const Navbar = ({ lang, setLang, theme, setTheme, homeHref = '#home', links = [] }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isMenuOpen]);

    return (
        <nav aria-label={t('a11y', 'mainNav', lang)} className={`fixed w-full z-50 top-0 py-3 md:py-4 transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <a href={homeHref} className="text-xl md:text-2xl font-display font-semibold gradient-text">Pedro Teles</a>
                {links.length > 0 && (
                    <div className="hidden md:flex items-center space-x-7 text-sm font-medium tracking-wide">
                        {links.map(([href, label]) => (
                            <a key={href} href={href} className="text-dim hover:text-current transition-colors duration-300">{label}</a>
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <NavControls lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
                    {links.length > 0 && (
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={t('a11y', isMenuOpen ? 'menuClose' : 'menuOpen', lang)}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            className="md:hidden text-xl"
                        >
                            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
                        </button>
                    )}
                </div>
            </div>
            {links.length > 0 && (
                <div id="mobile-menu" hidden={!isMenuOpen} className="md:hidden mt-3" style={{ backgroundColor: 'var(--card)', borderTop: '1px solid var(--border)' }}>
                    {links.map(([href, label]) => (
                        <a key={href} href={href} className="block py-3 px-6 text-sm text-dim" onClick={() => setIsMenuOpen(false)}>{label}</a>
                    ))}
                </div>
            )}
        </nav>
    );
};

const ExternalLink = ({ href, lang, children, ...rest }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}<span className="sr-only"> {t('a11y', 'newTab', lang)}</span>
    </a>
);

const SocialIcons = ({ lang }) => (
    <div className="flex justify-center space-x-6 text-2xl">
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${t('a11y', 'newTab', lang)}`} data-goatcounter-click="contato-linkedin" className="text-dim hover:text-current transition-colors duration-300"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
        <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${t('a11y', 'newTab', lang)}`} data-goatcounter-click="contato-github" className="text-dim hover:text-current transition-colors duration-300"><i className="fab fa-github" aria-hidden="true"></i></a>
        <a href={`mailto:${contact.email}`} aria-label={`E-mail: ${contact.email}`} data-goatcounter-click="contato-email" className="text-dim hover:text-current transition-colors duration-300"><i className="fas fa-envelope" aria-hidden="true"></i></a>
    </div>
);

const Footer = () => (
    <footer className="py-8" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container mx-auto px-4 md:px-8 text-center text-dim text-sm">
            <p>&copy; {new Date().getFullYear()} Pedro Caio Feitosa Teles</p>
        </div>
    </footer>
);

// ---- Area page sections -----------------------------------------

const Hero = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const content = areaContent[area];

    return (
        <header id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20 md:pt-16 overflow-hidden">
            <div className="azulejo-field" aria-hidden="true"></div>
            <div ref={ref} className="relative max-w-3xl mx-auto fade-in-up">
                <p className="eyebrow text-dim mb-6">{t('hero', 'eyebrow', lang)}</p>
                <img src="images/profile-square.png" alt={t('a11y', 'portrait', lang)} width="128" height="128" className="hero-frame w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-5 object-cover" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-4 leading-tight">
                    {t('hero', 'greeting', lang)} <span className="gradient-text">Pedro Teles</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-dim">{content.heroTitle[lang]}</p>
                <p className="font-mono text-xs md:text-sm text-dim mb-7 tracking-wide">{t('hero', 'facts', lang)}</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <ExternalLink href={content.resumeFile} lang={lang} data-goatcounter-click={`cv-${area}`} className="btn-primary font-semibold py-3 px-8 rounded-lg text-base w-full sm:w-auto">{t('hero', 'cvButton', lang)}</ExternalLink>
                    <SocialIcons lang={lang} />
                </div>
            </div>
            <a href="#about" aria-label={t('hero', 'scrollHint', lang)} className="absolute bottom-8 text-dim text-xl animate-bounce hidden sm:block">
                <i className="fas fa-chevron-down" aria-hidden="true"></i>
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
        <section id="about" className="py-12 md:py-16 section-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start">
                    <div ref={aboutRef} className="md:col-span-2 fade-in-up">
                        <p className="eyebrow text-dim mb-3">{t('about', 'eyebrow', lang)}</p>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">{t('about', 'title', lang)}</h2>
                        <div className="space-y-4 text-base md:text-lg leading-relaxed">
                            <p>{bio[lang]}</p>
                        </div>
                    </div>
                    <div ref={expRef} id="experience" className="md:col-span-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">{t('experience', 'title', lang)}</h2>
                        <div className="space-y-6">
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
    const study = project.caseStudy && caseStudies[project.caseStudy];
    return (
        <article className="card rounded-lg overflow-hidden fade-in-up flex flex-col" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="card-icon-tile" aria-hidden="true">
                <i className={`fas ${project.icon} text-4xl`} style={{ color: 'var(--azul)' }}></i>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="tag text-xs font-mono px-2 py-1 rounded">{project.lang}</span>
                    {study && <span className="tag-gold text-xs font-mono px-2 py-1 rounded">{t('portfolio', 'caseStudy', lang)}</span>}
                </div>
                <h3 className="text-lg font-semibold mb-2 font-mono">{project[`title_${lang}`]}</h3>
                <p className="text-sm text-dim mb-5 flex-1">{project[`description_${lang}`]}</p>
                <div className="flex flex-wrap gap-2">
                    {study && (
                        <a href={`estudo-${study.slug}.html`} data-goatcounter-click={`estudo-${study.slug}`} className="btn-primary text-sm font-medium py-2 px-4 rounded-md inline-flex items-center gap-2">
                            <i className="fas fa-book-open" aria-hidden="true"></i>{t('portfolio', 'caseStudy', lang)}
                        </a>
                    )}
                    <ExternalLink href={project.link} lang={lang} data-goatcounter-click={`projeto-${project.id}`} className="btn-ghost text-sm font-medium py-2 px-4 rounded-md inline-flex items-center gap-2">
                        <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>{t('portfolio', 'view', lang)}
                    </ExternalLink>
                </div>
            </div>
        </article>
    );
};

const resolveProjectsForArea = (area) =>
    portfolioData.projects
        .filter(p => p.areas.includes(area))
        .map(p => ({ ...p, ...(p.overrides && p.overrides[area] ? p.overrides[area] : {}) }));

const Portfolio = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    // Projects with a case study come first.
    const projects = resolveProjectsForArea(area).sort((a, b) => Boolean(b.caseStudy) - Boolean(a.caseStudy));
    return (
        <section id="projects" className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div ref={ref} className="text-center mb-10 fade-in-up">
                    <p className="eyebrow text-dim mb-3">{t('portfolio', 'eyebrow', lang)}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold mb-3">{t('portfolio', 'title', lang)}</h2>
                    <p className="text-dim">{t('portfolio', 'subtitle', lang)}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} lang={lang} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CertificateCard = ({ cert, lang, className = '', role }) => (
    <div className={className} role={role}>
        <div className="card p-6 rounded-lg flex flex-col items-center text-center h-full">
            <i className="fas fa-certificate text-3xl mb-4" aria-hidden="true" style={{ color: cert.category === 'product' ? 'var(--gold)' : 'var(--azul)' }}></i>
            <h3 className="text-base font-semibold mb-1" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{cert[`name_${lang}`]}</h3>
            <p className="text-sm italic text-dim mb-1">{cert.institution}</p>
            <p className="font-mono text-xs text-dim mb-5">{cert[`hours_${lang}`]}</p>
            <ExternalLink href={cert.link} lang={lang} className="btn-ghost text-xs font-medium py-2 px-4 rounded-md mt-auto">
                {t('certificates', 'download', lang)}<span className="sr-only">: {cert[`name_${lang}`]}</span>
            </ExternalLink>
        </div>
    </div>
);

const Certificates = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const trackRef = useRef();
    const [viewMode, setViewMode] = useState('carousel');
    const certsForArea = portfolioData.certificates.filter(c => c.areas.includes(area));

    const scrollByCard = (direction) => {
        const track = trackRef.current;
        if (!track || !track.firstElementChild) return;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0');
        const step = track.firstElementChild.getBoundingClientRect().width + gap;
        const maxScroll = track.scrollWidth - track.clientWidth;
        let target = track.scrollLeft + direction * step;
        if (target < -4) target = maxScroll;
        else if (target > maxScroll + 4) target = 0;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        track.scrollTo({ left: target, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const toggleStyle = (active) => (active ? { backgroundColor: 'var(--btn)', color: '#F8FAFC' } : { color: 'var(--ink-dim)' });

    return (
        <section id="certificates" ref={ref} className="py-12 md:py-16 section-alt fade-in-up" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-6">
                    <p className="eyebrow text-dim mb-3">{t('certificates', 'eyebrow', lang)}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">{t('certificates', 'title', lang)}</h2>
                </div>
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-full p-1" style={{ border: '1px solid var(--border)' }}>
                        <button onClick={() => setViewMode('carousel')} aria-pressed={viewMode === 'carousel'} className="text-xs font-medium py-2 px-4 rounded-full inline-flex items-center gap-2 transition-colors duration-200" style={toggleStyle(viewMode === 'carousel')}>
                            <i className="fas fa-images" aria-hidden="true"></i>{t('certificates', 'viewCarousel', lang)}
                        </button>
                        <button onClick={() => setViewMode('all')} aria-pressed={viewMode === 'all'} className="text-xs font-medium py-2 px-4 rounded-full inline-flex items-center gap-2 transition-colors duration-200" style={toggleStyle(viewMode === 'all')}>
                            <i className="fas fa-grip" aria-hidden="true"></i>{t('certificates', 'viewAll', lang)}
                        </button>
                    </div>
                </div>
                {viewMode === 'carousel' ? (
                    <div className="flex items-center gap-3">
                        <button onClick={() => scrollByCard(-1)} aria-label={t('certificates', 'prev', lang)} aria-controls="cert-track" className="btn-ghost hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center">
                            <i className="fas fa-chevron-left" aria-hidden="true"></i>
                        </button>
                        <div
                            id="cert-track"
                            ref={trackRef}
                            role="list"
                            tabIndex={0}
                            aria-label={t('a11y', 'certList', lang)}
                            className="cert-track flex gap-6 overflow-x-auto flex-1 py-2"
                        >
                            {certsForArea.map((cert) => (
                                <CertificateCard key={cert.id} cert={cert} lang={lang} role="listitem" className="flex-shrink-0 w-60" />
                            ))}
                        </div>
                        <button onClick={() => scrollByCard(1)} aria-label={t('certificates', 'next', lang)} aria-controls="cert-track" className="btn-ghost hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center">
                            <i className="fas fa-chevron-right" aria-hidden="true"></i>
                        </button>
                    </div>
                ) : (
                    <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certsForArea.map((cert) => (
                            <CertificateCard key={cert.id} cert={cert} lang={lang} role="listitem" />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const SkillGroup = ({ title, tags }) => (
    <div>
        <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{title}</h3>
        <ul className="flex flex-wrap gap-2">
            {tags.map(tag => <li key={tag} className="tag text-sm py-1 px-3 rounded-full">{tag}</li>)}
        </ul>
    </div>
);

const Skills = ({ lang, area }) => {
    const groupsRef = useRef();
    const langRef = useRef();
    useFadeInUp(groupsRef);
    useFadeInUp(langRef);
    const groups = skillsByArea[area];

    return (
        <section id="skills" className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <p className="eyebrow text-dim mb-3">{t('skills', 'eyebrow', lang)}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">{t('skills', 'title', lang)}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    <div ref={groupsRef} className="card card-static p-6 md:p-8 rounded-lg lg:col-span-2 fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {groups.map(group => (
                                <SkillGroup key={group.id} title={group[`title_${lang}`]} tags={group.tags} />
                            ))}
                        </div>
                    </div>
                    <div ref={langRef} className="card card-static p-6 md:p-8 rounded-lg lg:col-span-2 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="font-semibold text-base mb-4" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{t('skills', 'langTitle', lang)}</h3>
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

const ContactStrip = ({ lang, subtitle }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contact.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (e) {
            window.location.href = `mailto:${contact.email}`;
        }
    };

    return (
        <section id="contact" className="py-12 md:py-16 section-alt" style={{ borderTop: '1px solid var(--border)' }}>
            <div ref={ref} className="container mx-auto px-4 md:px-8 text-center max-w-2xl fade-in-up">
                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-3">{t('footer', 'cta', lang)}</h2>
                {subtitle && <p className="text-dim mb-8">{subtitle}</p>}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                    <a href={`mailto:${contact.email}`} data-goatcounter-click="contato-email" className="btn-primary font-semibold py-3 px-6 rounded-lg text-base inline-flex items-center justify-center gap-2">
                        <i className="fas fa-envelope" aria-hidden="true"></i>{t('footer', 'emailButton', lang)}
                    </a>
                    <ExternalLink href={contact.linkedin} lang={lang} data-goatcounter-click="contato-linkedin" className="btn-ghost font-semibold py-3 px-6 rounded-lg text-base inline-flex items-center justify-center gap-2">
                        <i className="fab fa-linkedin" aria-hidden="true"></i>{t('footer', 'linkedinButton', lang)}
                    </ExternalLink>
                    {contact.calendar && (
                        <ExternalLink href={contact.calendar} lang={lang} data-goatcounter-click="contato-agenda" className="btn-ghost font-semibold py-3 px-6 rounded-lg text-base inline-flex items-center justify-center gap-2">
                            <i className="fas fa-calendar-days" aria-hidden="true"></i>{t('footer', 'calendarButton', lang)}
                        </ExternalLink>
                    )}
                </div>
                <p className="mt-6 font-mono text-sm text-dim">
                    {contact.email}
                    <button onClick={copyEmail} className="ml-3 underline underline-offset-4 hover:text-current" data-goatcounter-click="contato-copiar-email">
                        {t('footer', 'copyEmail', lang)}
                    </button>
                </p>
                <p role="status" aria-live="polite" className="text-sm mt-2" style={{ color: 'var(--azul)', minHeight: '1.25rem' }}>
                    {copied ? t('footer', 'copied', lang) : ''}
                </p>
            </div>
        </section>
    );
};

export function App({ area }) {
    const { theme, setTheme, lang, setLang } = usePrefs();
    const links = Object.entries(langContent.nav).map(([key, value]) => [`#${key}`, value[lang]]);

    return (
        <React.Fragment>
            <SkipLink lang={lang} />
            <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} links={links} />
            <main id="main">
                <Hero lang={lang} area={area} />
                <AboutAndExperience lang={lang} area={area} />
                <Portfolio lang={lang} area={area} />
                <Certificates lang={lang} area={area} />
                <Skills lang={lang} area={area} />
                <ContactStrip lang={lang} subtitle={areaContent[area].footerCta[lang]} />
            </main>
            <Footer />
        </React.Fragment>
    );
}

// ---- Hub (index.html) -------------------------------------------

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
    viewProfile: { pt: "Ver perfil", en: "View profile" },
    contactSubtitle: { pt: "Aberto a oportunidades de estágio em negócios, dados e produto.", en: "Open to internship opportunities in business, data, and product." },
};

const areaCardCopy = {
    financas: { pt: "Análise financeira, modelagem e indicadores de desempenho.", en: "Financial analysis, modeling, and performance indicators." },
    operacoes: { pt: "Planejamento estratégico, processos e indicadores operacionais.", en: "Strategic planning, process improvement, and operational indicators." },
    growth: { pt: "Performance de negócios, growth analytics e benchmarking.", en: "Business performance, growth analytics, and benchmarking." },
    produto: { pt: "Gestão de produto, pesquisa e desenvolvimento front-end.", en: "Product management, research, and front-end development." },
};

const AREA_ORDER = ['financas', 'operacoes', 'growth', 'produto'];
const AREA_ICON = { financas: 'fa-chart-line', operacoes: 'fa-gears', growth: 'fa-rocket', produto: 'fa-layer-group' };

const AreaCard = ({ area, lang }) => (
    <a href={`${area}.html`} data-goatcounter-click={`hub-${area}`} className="card rounded-lg p-8 flex flex-col items-start text-left no-underline transition-transform" style={{ color: 'var(--ink)' }}>
        <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5" style={{ background: 'var(--azul-soft)' }} aria-hidden="true">
            <i className={`fas ${AREA_ICON[area]} text-2xl`} style={{ color: 'var(--azul)' }}></i>
        </div>
        <h2 className="text-xl font-display font-semibold mb-2">{areaContent[area].label[lang]}</h2>
        <p className="text-sm text-dim mb-5">{areaCardCopy[area][lang]}</p>
        <span className="btn-ghost text-sm font-medium py-2 px-4 rounded-md inline-flex items-center gap-2">
            {hubContent.viewProfile[lang]} <i className="fas fa-arrow-right" aria-hidden="true"></i>
        </span>
    </a>
);

export function Hub() {
    const { theme, setTheme, lang, setLang } = usePrefs();

    return (
        <React.Fragment>
            <SkipLink lang={lang} />
            <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} homeHref="./" />
            <main id="main">
                <header className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 overflow-hidden">
                    <div className="azulejo-field" aria-hidden="true"></div>
                    <div className="relative max-w-2xl mx-auto">
                        <p className="eyebrow text-dim mb-6">{hubContent.eyebrow[lang]}</p>
                        <img src="images/profile-square.png" alt={t('a11y', 'portrait', lang)} width="128" height="128" className="hero-frame w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-7 object-cover" />
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-4 leading-tight">
                            {hubContent.greeting[lang]} <span className="gradient-text">Pedro Teles</span>
                        </h1>
                        <p className="text-lg md:text-xl mb-6 text-dim">{hubContent.title[lang]}</p>
                        <p className="font-mono text-xs md:text-sm text-dim mb-8 tracking-wide">{hubContent.facts[lang]}</p>
                        <p className="text-base md:text-lg text-dim mb-10">{hubContent.bio[lang]}</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <ExternalLink href="certificates/Curriculo Pedro Teles.pdf" lang={lang} data-goatcounter-click="cv-geral" className="btn-ghost text-sm font-medium py-2 px-5 rounded-md inline-flex items-center gap-2">
                                <i className="fas fa-file-arrow-down" aria-hidden="true"></i>{hubContent.genericCv[lang]}
                            </ExternalLink>
                            <SocialIcons lang={lang} />
                        </div>
                    </div>
                </header>
                <section aria-labelledby="picker" className="py-12 md:py-16 section-alt" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="container mx-auto px-4 md:px-8">
                        <p id="picker" className="eyebrow text-dim mb-10 text-center">{hubContent.pickerEyebrow[lang]}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                            {AREA_ORDER.map(area => <AreaCard key={area} area={area} lang={lang} />)}
                        </div>
                    </div>
                </section>
                <ContactStrip lang={lang} subtitle={hubContent.contactSubtitle[lang]} />
            </main>
            <Footer />
        </React.Fragment>
    );
}

// ---- Case study (estudo-<slug>.html) ----------------------------

const RichBody = ({ blocks }) => (
    <div className="prose-case text-base md:text-lg leading-relaxed">
        {blocks.map((block, i) => (typeof block === 'string'
            ? <p key={i}>{block}</p>
            : <ul key={i} className="my-4">{block.list.map((item, j) => <li key={j}>{item}</li>)}</ul>
        ))}
    </div>
);

export function CaseStudy({ slug }) {
    const { theme, setTheme, lang, setLang } = usePrefs();
    const study = caseStudies[slug];
    const backHref = `${study.area}.html#projects`;
    const links = study.sections.map(s => [`#${s.id}`, s.nav[lang]]);

    return (
        <React.Fragment>
            <SkipLink lang={lang} />
            <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} homeHref={backHref} links={links} />
            <main id="main">
                <header className="relative px-4 pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
                    <div className="azulejo-field" aria-hidden="true"></div>
                    <div className="relative max-w-3xl mx-auto">
                        <a href={backHref} className="text-sm text-dim hover:text-current inline-flex items-center gap-2 mb-8">
                            <i className="fas fa-arrow-left" aria-hidden="true"></i>{caseStudyCopy.back[lang]}
                        </a>
                        <p className="eyebrow text-dim mb-4">{caseStudyCopy.eyebrow[lang]}</p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-4 leading-tight font-mono">{study.title}</h1>
                        <p className="text-lg md:text-xl text-dim mb-8">{study.tagline[lang]}</p>
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {study.meta[lang].map(([k, v]) => (
                                <div key={k}>
                                    <dt className="eyebrow text-dim mb-1">{k.toUpperCase()}</dt>
                                    <dd className="text-sm">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <ExternalLink href={study.link} lang={lang} data-goatcounter-click={`estudo-${slug}-app`} className="btn-primary font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center gap-2">
                                <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>{caseStudyCopy.openApp[lang]}
                            </ExternalLink>
                            {study.repo && (
                                <ExternalLink href={study.repo} lang={lang} data-goatcounter-click={`estudo-${slug}-repo`} className="btn-ghost font-semibold py-3 px-6 rounded-lg inline-flex items-center justify-center gap-2">
                                    <i className="fab fa-github" aria-hidden="true"></i>{caseStudyCopy.repo[lang]}
                                </ExternalLink>
                            )}
                        </div>
                    </div>
                </header>

                <section aria-label={caseStudyCopy.numbers[lang]} className="section-alt py-10" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                    <div className="max-w-3xl mx-auto px-4">
                        <p className="eyebrow text-dim mb-6">{caseStudyCopy.numbers[lang]}</p>
                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {study.metrics.map(m => (
                                <li key={m.value + m.label.pt}>
                                    <p className="text-3xl md:text-4xl font-display font-semibold gradient-text">{m.value}</p>
                                    <p className="text-sm text-dim mt-1">{m.label[lang]}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="max-w-3xl mx-auto px-4 py-12 md:py-16 space-y-14 md:space-y-16">
                    {study.sections.map((section, i) => (
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} style={{ scrollMarginTop: '6rem' }}>
                            <p className="font-mono text-xs text-dim mb-2">{String(i + 1).padStart(2, '0')}</p>
                            <h2 id={`${section.id}-title`} className="text-2xl md:text-3xl font-display font-semibold mb-6">{section.title[lang]}</h2>
                            {section.body && <RichBody blocks={section.body[lang]} />}
                            {section.decisions && (
                                <ol className="space-y-4">
                                    {section.decisions.map((d, j) => (
                                        <li key={j} className="card card-static rounded-lg p-6">
                                            <p className="eyebrow mb-2" style={{ color: 'var(--gold-ink)' }}>{caseStudyCopy.decision[lang].toUpperCase()} {j + 1}</p>
                                            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>{d.what[lang]}</h3>
                                            <p className="text-dim leading-relaxed"><span className="sr-only">{caseStudyCopy.why[lang]}: </span>{d.why[lang]}</p>
                                        </li>
                                    ))}
                                </ol>
                            )}
                            {section.stack && (
                                <ul className="flex flex-wrap gap-2 mt-6">
                                    {section.stack.map(s => <li key={s} className="tag text-sm py-1 px-3 rounded-full">{s}</li>)}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                <ContactStrip lang={lang} subtitle={areaContent[study.area].footerCta[lang]} />
            </main>
            <Footer />
        </React.Fragment>
    );
}
