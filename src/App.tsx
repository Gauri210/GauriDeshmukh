import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Circle, FileText, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { PROFILE, experience, interests, projects, skills } from '@/content';
import { Artwork } from '@/components/Artwork';
import { CustomCursor } from '@/components/CustomCursor';

const NAV = [
  ['work', 'Selected work'],
  ['about', 'About'],
] as const;

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-40% 0px -55% 0px' });
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const active = useActiveSection();
  useScrollReveal();

  const contactHref = PROFILE.email ? `mailto:${PROFILE.email}` : PROFILE.github;
  const contactLabel = PROFILE.email ? PROFILE.email.toUpperCase() : 'SEE MY WORK ON GITHUB';

  return (
    <main className="portfolio min-h-[100dvh]">
      <CustomCursor />
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[var(--paper)]">Skip to content</a>

      <header className="header-bar">
        <div className="page-wrap flex h-[72px] items-center justify-between">
          <a href="#top" aria-label="Back to top" className="group flex items-center gap-3">
            <span className="display flex h-9 w-9 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--paper)] transition-transform group-hover:-rotate-6">GD</span>
            <span className="display text-[15px] font-bold">GAURI DESHMUKH<span className="text-[var(--coral)]"></span></span>
          </a>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id} className="nav-link eyebrow">{label}</a>)}
          </nav>
          <a href="#contact" className="eyebrow hidden items-center gap-2 rounded-full border border-[var(--ink)] px-4 py-2.5 transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] md:flex">Let&apos;s talk <ArrowUpRight size={13} /></a>
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] md:hidden">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-5 border-t border-[var(--line)] bg-[var(--paper)] px-6 py-6 md:hidden" aria-label="Mobile navigation">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="eyebrow">{label}</a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)} className="eyebrow coral-text">Let&apos;s talk</a>
          </nav>
        )}
      </header>

      <section id="top" className="page-wrap flex min-h-[72svh] items-center py-10 md:py-12">
        <div className="mx-auto w-full max-w-[1200px] text-center">
          <h1 className="display reveal text-[clamp(2.2rem,8.8vw,7.5rem)] font-semibold leading-[.98] tracking-[-.045em] text-[var(--ink)]">
            GAURI DESHMUKH<span className="text-[var(--coral)]"></span>
          </h1>

          <p className="eyebrow hero-tagline soft reveal reveal-delay mt-5">Curious by nature</p>

          <img
            src="/botanical-flower.png"
            alt=""
            aria-hidden="true"
            className="reveal reveal-delay-2 mx-auto mt-5 h-[170px] w-auto sm:h-[190px]"
          />

          <div className="reveal reveal-delay-2 mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-[var(--ink)] px-5 py-3 text-[12px] font-semibold text-[var(--paper)] transition-colors hover:bg-[var(--coral)] sm:px-6 sm:py-3.5 sm:text-[13px]">
              Explore selected work <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" />
            </a>
            <a href="#about" className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)] px-5 py-3 text-[12px] font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] sm:px-6 sm:py-3.5 sm:text-[13px]">
              About Me <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </section>

      <section id="work" className="page-wrap section-pad">
        <div className="scroll-reveal mb-10 flex flex-col justify-between gap-5 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow coral-text mb-4 flex items-center gap-2"><Circle size={7} fill="currentColor" /> Projects</p>
            <h2 className="display text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[.95]">Selected work<span className="text-[var(--coral)]"></span></h2>
          </div>
          <p className="soft max-w-[340px] text-[15px] leading-[1.7]"></p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-6">
          {projects.map((p, i) => (
            <article
              key={p.id}
              className={`project-card scroll-reveal flex flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] ${
                i < 2 ? 'xl:col-span-3' : 'xl:col-span-2'
              }`}
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="relative h-[220px] overflow-hidden border-b border-[var(--line)]">
                <Artwork kind={p.art} />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="mono text-[9px] tracking-wider text-[var(--coral-text)] font-semibold">
                    {p.category}
                  </span>
                  <span className="mono text-[9px] text-[var(--soft)]">{p.id}</span>
                </div>

                <h3 className="display text-[24px] font-semibold leading-tight tracking-[-.04em] text-[var(--ink)]">
                  {p.title}
                </h3>

                <p className="soft mt-2.5 text-[13.5px] leading-[1.65]">
                  {p.description}
                </p>

                {p.dispatchNote && (
                  <p className="soft mt-2.5 text-[13px] italic leading-[1.6]">{p.dispatchNote}</p>
                )}

                {open === p.id && (
                  <div id={`detail-${p.id}`} className="mt-4 rounded-[2px] border-l-2 border-[var(--coral)] bg-[var(--paper-2)] p-3 text-[12.5px] leading-[1.65] text-[var(--ink)]">
                    <p>{p.detail}</p>
                  </div>
                )}

                <ul className="mb-5 mt-4 flex flex-wrap gap-1.5">
                  {p.tools.map((t) => (
                    <li key={t} className="mono text-[9.5px] rounded-md border border-[var(--line)] bg-[var(--paper)]/60 px-2 py-0.5 text-[var(--soft)]">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-[var(--line)] pt-3 text-[12.5px] font-medium">
                  <button
                    type="button"
                    onClick={() => setOpen(open === p.id ? null : p.id)}
                    aria-expanded={open === p.id}
                    aria-controls={`detail-${p.id}`}
                    className="hover:text-[var(--coral)] transition-colors"
                  >
                    {open === p.id ? 'Less' : 'More'}
                  </button>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-[var(--ink)] hover:text-[var(--coral)] transition-colors"
                    >
                      GitHub <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="page-wrap section-pad">
        <div className="grid gap-8 md:grid-cols-[1fr_180px] md:items-start lg:grid-cols-[1fr_200px] lg:gap-10">
          <div className="scroll-reveal">
            <p className="eyebrow coral-text mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--coral)]" />
              About
            </p>
            <h2 className="display text-[clamp(2.5rem,5vw,4.2rem)] font-semibold leading-[.98] text-[var(--ink)]">
                <span className="block">99% cleaning data.</span>
                <span className="block">1% figuring out why.</span>
            </h2>
            <p className="soft mt-6 max-w-[560px] text-[15.5px] leading-[1.8]">
              I&apos;m a third-year Data Science student at NMIMS MPSTME, Mumbai. I like to understand and extract meaningful insights from data, and build models that help us make sense of it and make better decisions. I&apos;m always curious about how things work, not only in technology but other fields as well. I enjoy exploring new ideas, and learning from different perspectives.
            </p>
            <p className="soft mt-4 max-w-[560px] text-[15.5px] leading-[1.8]">
              I enjoy working on projects that challenge me to think critically, creatively and learn something new.
            </p>

            <div className="mt-8 grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow soft mb-4">Tools I reach for</p>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <li key={s} className="skill-pill rounded-full border border-[var(--line)] px-3.5 py-1.5 text-[12px] mono">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="eyebrow soft mb-4">What I&apos;m into</p>
                <ul className="flex flex-wrap gap-2">
                  {interests.map((s) => (
                    <li key={s} className="skill-pill rounded-full border border-[var(--line)] px-3.5 py-1.5 text-[12px] mono">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <p className="eyebrow soft mb-2">Track record</p>
              <ol className="border-t border-[var(--line)]">
                {experience.map((e) => (
                  <li key={e.title} className="grid grid-cols-[64px_1fr] gap-4 border-b border-[var(--line)] py-5">
                    <span className="mono coral-text pt-0.5 text-[11px] font-semibold">{e.when}</span>
                    <div>
                      <h3 className="display text-[18px] font-semibold tracking-[-.025em] text-[var(--ink)]">{e.title}</h3>
                      <p className="soft mt-1.5 text-[13.5px] leading-[1.65]">{e.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Small portrait box. Add your photo to public/about-photo.jpg (portrait crop, roughly 4:5). */}
          <div className="scroll-reveal mx-auto w-full max-w-[200px] lg:sticky lg:top-28">
            <div className="aspect-[4/5] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)]">
              <img
                src="/about-photo.png"
                alt="Gauri Deshmukh"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[var(--ink)] text-[var(--paper)]">
        <div className="page-wrap pb-8 pt-20 md:pb-10 md:pt-24">
          <div className="grid gap-10 border-b border-[#f3f0e6]/20 pb-14 md:grid-cols-[1fr_auto] md:items-start md:pb-16">
            <div>
              <p className="eyebrow mb-5 text-[var(--lime)]">CONTACT</p>
              <h2 className="display max-w-[740px] text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[.92]">Get in <br /><span className="text-[var(--lime)]">touch.</span></h2>
              <p className="mt-6 max-w-[420px] text-[15px] leading-[1.7] text-[#c2cec4]">Open to internships and research collaborations. If you&apos;re working on something interesting, I&apos;d be glad to hear about it.</p>
            </div>
            <div className="flex w-fit flex-col items-start gap-3">
              <a href={contactHref} {...(PROFILE.email ? {} : { target: '_blank', rel: 'noreferrer' })} className="group inline-flex w-fit items-center gap-4 rounded-full border border-[var(--lime)] px-6 py-4 text-[13px] font-semibold text-[var(--paper)] transition-colors hover:bg-[var(--lime)] hover:text-[var(--ink)]">
                {PROFILE.email ? <Mail size={16} /> : <Github size={16} />} {contactLabel} <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              {PROFILE.github && (
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-4 rounded-full border border-[var(--lime)] px-6 py-4 text-[13px] font-semibold text-[var(--paper)] transition-colors hover:bg-[var(--lime)] hover:text-[var(--ink)]">
                  <Github size={16} /> GitHub <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              )}
              {PROFILE.linkedin && (
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="group inline-flex w-fit items-center gap-4 rounded-full border border-[var(--lime)] px-6 py-4 text-[13px] font-semibold text-[var(--paper)] transition-colors hover:bg-[var(--lime)] hover:text-[var(--ink)]">
                  <Linkedin size={16} /> LinkedIn <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-5 pt-6 md:flex-row md:items-center md:justify-between">
            <span className="mono text-[11px] tracking-[.1em]">GAURI DESHMUKH · MUMBAI</span>
            {PROFILE.resume && <a href={PROFILE.resume} target="_blank" rel="noreferrer" aria-label="Résumé" className="hover:text-[var(--lime)]"><FileText size={18} /></a>}
            <span className="mono text-[11px] tracking-wide text-[#c2cec4]">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}