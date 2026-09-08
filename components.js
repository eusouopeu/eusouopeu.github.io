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
        <header id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20 md:pt-16 overflow-hidden">
            <div className="azulejo-field" aria-hidden="true"></div>
            <div ref={ref} className="relative max-w-3xl mx-auto fade-in-up">
                <p className="eyebrow text-dim mb-6">{langContent.hero.eyebrow[lang]}</p>
                <img src="images/profile-square.png" alt="Retrato de Pedro Teles" className="hero-frame w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-5 object-cover" />
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold mb-4 leading-tight">
                    {langContent.hero.greeting[lang]} <span className="gradient-text">Pedro Teles</span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-dim">{content.heroTitle[lang]}</p>
                <p className="font-mono text-xs md:text-sm text-dim mb-7 tracking-wide">{langContent.hero.facts[lang]}</p>
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
        <section id="about" className="py-12 md:py-16 section-alt" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-5 gap-10 md:gap-12 items-start">
                    <div ref={aboutRef} className="md:col-span-2 fade-in-up">
                        <p className="eyebrow text-dim mb-3">{langContent.about.eyebrow[lang]}</p>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">{langContent.about.title[lang]}</h2>
                        <div className="space-y-4 text-base md:text-lg leading-relaxed">
                            <p>{bio[lang]}</p>
                        </div>
                    </div>
                    <div ref={expRef} id="experience" className="md:col-span-3 fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8">{langContent.experience.title[lang]}</h2>
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
        <section id="projects" className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div ref={ref} className="text-center mb-10 fade-in-up">
                    <p className="eyebrow text-dim mb-3">{langContent.portfolio.eyebrow[lang]}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold mb-3">{langContent.portfolio.title[lang]}</h2>
                    <p className="text-dim">{langContent.portfolio.subtitle[lang]}</p>
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

const CertificateCard = ({ cert, lang, className = '', style }) => (
    <div className={className} style={style}>
        <div className="card p-6 rounded-lg flex flex-col items-center text-center h-full">
            <i className="fas fa-certificate text-3xl mb-4" style={{ color: cert.category === 'product' ? 'var(--gold)' : 'var(--azul)' }}></i>
            <h4 className="text-base font-semibold mb-1">{cert[`name_${lang}`]}</h4>
            <p className="text-sm italic text-dim mb-1">{cert.institution}</p>
            <p className="font-mono text-xs text-dim mb-5">{cert[`hours_${lang}`]}</p>
            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs font-medium py-2 px-4 rounded-md mt-auto">{langContent.certificates.download[lang]}</a>
        </div>
    </div>
);

const Certificates = ({ lang, area }) => {
    const ref = useRef();
    useFadeInUp(ref);
    const trackRef = useRef();
    const [viewMode, setViewMode] = useState('carousel');
    const certsForArea = portfolioData.certificates.filter(c => c.areas.includes(area));

    const animateScrollTo = (track, target, duration = 350) => {
        const start = track.scrollLeft;
        const change = target - start;
        const startTime = performance.now();
        const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
        const step = (now) => {
            const elapsed = Math.min((now - startTime) / duration, 1);
            track.scrollLeft = start + change * easeInOutQuad(elapsed);
            if (elapsed < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const scrollByCard = (direction) => {
        const track = trackRef.current;
        if (!track || !track.firstElementChild) return;
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0');
        const step = track.firstElementChild.getBoundingClientRect().width + gap;
        const maxScroll = track.scrollWidth - track.clientWidth;
        let target = track.scrollLeft + direction * step;
        if (target < 4) target = maxScroll;
        else if (target > maxScroll - 4) target = 0;
        animateScrollTo(track, target);
    };

    return (
        <section id="certificates" ref={ref} className="py-12 md:py-16 section-alt fade-in-up" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-6">
                    <p className="eyebrow text-dim mb-3">{langContent.certificates.eyebrow[lang]}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">{langContent.certificates.title[lang]}</h2>
                </div>
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-full p-1" style={{ border: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setViewMode('carousel')}
                            aria-pressed={viewMode === 'carousel'}
                            className="text-xs font-medium py-2 px-4 rounded-full inline-flex items-center gap-2 transition-colors duration-200"
                            style={viewMode === 'carousel' ? { backgroundColor: 'var(--azul)', color: '#F8FAFC' } : { color: 'var(--ink-dim)' }}
                        >
                            <i className="fas fa-images"></i>{langContent.certificates.viewCarousel[lang]}
                        </button>
                        <button
                            onClick={() => setViewMode('all')}
                            aria-pressed={viewMode === 'all'}
                            className="text-xs font-medium py-2 px-4 rounded-full inline-flex items-center gap-2 transition-colors duration-200"
                            style={viewMode === 'all' ? { backgroundColor: 'var(--azul)', color: '#F8FAFC' } : { color: 'var(--ink-dim)' }}
                        >
                            <i className="fas fa-grip"></i>{langContent.certificates.viewAll[lang]}
                        </button>
                    </div>
                </div>
                {viewMode === 'carousel' ? (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scrollByCard(-1)}
                            aria-label={langContent.certificates.prev[lang]}
                            className="btn-ghost hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <div ref={trackRef} className="flex gap-6 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none' }}>
                            {certsForArea.map((cert) => (
                                <CertificateCard key={cert.id} cert={cert} lang={lang} className="flex-shrink-0 w-60" />
                            ))}
                        </div>
                        <button
                            onClick={() => scrollByCard(1)}
                            aria-label={langContent.certificates.next[lang]}
                            className="btn-ghost hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full items-center justify-center"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certsForArea.map((cert) => (
                            <CertificateCard key={cert.id} cert={cert} lang={lang} />
                        ))}
                    </div>
                )}
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
        <section id="skills" className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-10">
                    <p className="eyebrow text-dim mb-3">{langContent.skills.eyebrow[lang]}</p>
                    <h2 className="text-3xl md:text-4xl font-display font-semibold">{langContent.skills.title[lang]}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    <div ref={groupsRef} className="card p-6 md:p-8 rounded-lg lg:col-span-2 fade-in-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {groups.map(group => (
                                <SkillGroup key={group.id} title={group[`title_${lang}`]} tags={group.tags} />
                            ))}
                        </div>
                    </div>
                    <div ref={langRef} className="card p-6 md:p-8 rounded-lg lg:col-span-2 fade-in-up" style={{ animationDelay: '0.1s' }}>
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
        <section className="py-12 md:py-16 section-alt" style={{ borderTop: '1px solid var(--border)' }}>
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
