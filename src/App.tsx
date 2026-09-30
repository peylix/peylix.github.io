import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { IconBrandGithub, IconBrandLinkedin, IconArrowUpRight, IconChevronDown, IconMenu2, IconX } from '@tabler/icons-react';
import { profileData } from './data/profile';
import { education } from './data/education';
import { research } from './data/research';
import { publications } from './data/publications';
import { projects } from './data/projects';
import { experience } from './data/experience';
import { skills } from './data/skills';
import { awards } from './data/awards';
import { getEnabledSections, getEnabledSectionConfigs } from './data/config';

// Link keys and publication types are rendered from object keys, so spell out
// the labels that title-casing alone would get wrong (e.g. "Github").
const linkLabels: Record<string, string> = {
  github: 'GitHub',
  demo: 'Demo',
  paper: 'Paper',
  patent: 'Patent',
  status: 'Status'
};

const publicationTypeLabels: Record<string, string> = {
  conference: 'Conference',
  journal: 'Journal',
  patent: 'Patent'
};

const labelFor = (key: string) => linkLabels[key] ?? key.charAt(0).toUpperCase() + key.slice(1);

// Shared horizontal padding so every column edge lines up with the nav.
const gutter = 'px-5 sm:px-8';

const currentYear = new Date().getFullYear();

function Section({ id, index, title, children }: { id: string; index: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-14 grid border-b md:grid-cols-[14rem_1fr]">
      <div className={`${gutter} pt-10 md:sticky md:top-14 md:self-start md:py-12`}>
        <p className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-1 text-lg font-semibold uppercase tracking-wide">{title}</h2>
      </div>
      <div className={`${gutter} pt-6 pb-10 md:border-l md:py-12`}>{children}</div>
    </section>
  );
}

function Meta({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-wide text-faint">{children}</p>;
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="border px-2 py-0.5 font-mono text-[11px] text-muted">{children}</span>;
}

function Links({ links }: { links: Record<string, string | undefined> }) {
  const entries = Object.entries(links).filter((entry): entry is [string, string] => Boolean(entry[1]));
  if (entries.length === 0) return null;
  return (
    <div className="mt-4 flex gap-5">
      {entries.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wide text-accent"
        >
          <span className="underline-offset-4 group-hover:underline">{labelFor(key)}</span>
          <IconArrowUpRight className="h-3.5 w-3.5" stroke={1.75} />
        </a>
      ))}
    </div>
  );
}

// A list whose rows are separated by hairlines, with no rule above the first row.
const ruledList = 'divide-y [&>*]:py-7 [&>*:first-child]:pt-0 [&>*:last-child]:pb-0';

export default function Portfolio() {
  // Config is static, so memoise to keep these arrays stable across renders.
  const sections = useMemo(() => getEnabledSections(), []);
  const navSections = useMemo(() => getEnabledSectionConfigs(), []);

  const [activeSection, setActiveSection] = useState(sections[0] ?? 'about');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // While a click-triggered smooth scroll is in flight the clicked section stays
  // active, otherwise the highlight flickers through every section on the way.
  const clickScrolling = useRef(false);
  const clickTimer = useRef<number | undefined>(undefined);

  // Keep the nav highlight in sync with manual scrolling.
  useEffect(() => {
    const syncActiveSection = () => {
      if (clickScrolling.current) return;

      // A section counts as active once its top passes just under the nav.
      const line = 80;
      let current = sections[0];
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) {
          current = id;
        }
      }

      // The final section can be too short to ever reach the line, so let the
      // bottom of the page select it.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        current = sections[sections.length - 1];
      }

      setActiveSection(current);
    };

    syncActiveSection();
    window.addEventListener('scroll', syncActiveSection, { passive: true });
    window.addEventListener('resize', syncActiveSection);
    return () => {
      window.removeEventListener('scroll', syncActiveSection);
      window.removeEventListener('resize', syncActiveSection);
    };
  }, [sections]);

  useEffect(() => () => window.clearTimeout(clickTimer.current), []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);

    clickScrolling.current = true;
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => {
      clickScrolling.current = false;
    }, 700);

    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Section numbers follow the enabled order, so disabling one renumbers the rest.
  const indexOf = (id: string) => sections.indexOf(id);

  const socialLinks = [
    { href: profileData.social.github, label: 'GitHub', Icon: IconBrandGithub },
    { href: profileData.social.linkedin, label: 'LinkedIn', Icon: IconBrandLinkedin }
  ];

  const heroFacts = [
    { label: 'Institution', value: profileData.institution },
    { label: 'Location', value: profileData.location },
    {
      label: 'Email',
      value: (
        <a href={`mailto:${profileData.email}`} className="break-all underline-offset-4 hover:text-accent hover:underline">
          {profileData.email}
        </a>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-stretch border-x">
          <button
            onClick={() => scrollToSection(sections[0])}
            className={`${gutter} flex shrink-0 items-center text-sm font-semibold tracking-tight md:w-56 md:border-r`}
          >
            {profileData.name}
          </button>
          <div className="ml-auto hidden items-stretch overflow-x-auto lg:flex">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap px-3 font-mono text-xs uppercase tracking-wide transition-colors ${
                  activeSection === section.id ? 'bg-ink text-paper' : 'text-muted hover:bg-wash hover:text-ink'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-auto flex w-14 items-center justify-center border-l text-muted transition-colors hover:bg-wash hover:text-ink lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX className="h-5 w-5" stroke={1.5} /> : <IconMenu2 className="h-5 w-5" stroke={1.5} />}
          </button>
        </div>
        {menuOpen && (
          // Overlaid rather than in flow: an expanding nav would shift the page
          // under the smooth scroll started by tapping an entry.
          <div className="absolute left-0 right-0 top-full border-b bg-paper lg:hidden">
            <div className="mx-auto max-w-5xl divide-y border-x">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`${gutter} flex w-full items-center gap-4 py-3 text-left font-mono text-xs uppercase tracking-wide transition-colors ${
                    activeSection === section.id ? 'bg-ink text-paper' : 'text-muted hover:bg-wash hover:text-ink'
                  }`}
                >
                  <span className="opacity-60">{String(indexOf(section.id) + 1).padStart(2, '0')}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="mx-auto max-w-5xl border-x">
        {/* Hero Section */}
        <header className="border-b">
          <div className="grid md:grid-cols-[14rem_1fr]">
            <div className={`${gutter} pt-10 md:py-12`}>
              <img
                src={profileData.avatar}
                alt={profileData.name}
                className="aspect-square w-28 border object-cover md:w-full"
              />
            </div>
            <div className={`${gutter} flex flex-col justify-end pt-6 pb-10 md:border-l md:py-12`}>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profileData.name}</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted">{profileData.title}</p>
            </div>
          </div>
          <div className="grid gap-px border-t bg-line sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
            {heroFacts.map((fact) => (
              <div key={fact.label} className={`${gutter} bg-paper py-4`}>
                <p className="font-mono text-[11px] uppercase tracking-wide text-faint">{fact.label}</p>
                <p className="mt-1 text-sm">{fact.value}</p>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-px">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center bg-paper py-4 transition-colors hover:bg-ink hover:text-paper lg:w-16"
                >
                  <Icon className="h-5 w-5" stroke={1.5} />
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* About Section */}
        {sections.includes('about') && (
          <Section id="about" index={indexOf('about')} title="About">
            <p className="max-w-3xl text-lg leading-relaxed">{profileData.bio}</p>
          </Section>
        )}

        {/* Education Section */}
        {sections.includes('education') && (
          <Section id="education" index={indexOf('education')} title="Education">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {education.map((edu, index) => (
                <div key={index}>
                  <Meta>{edu.period}</Meta>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{edu.institution}</h3>
                  <p className="mt-1">{edu.degree}</p>
                  <p className="mt-3 text-sm text-muted">
                    {edu.department} · {edu.location}
                  </p>
                  {edu.details && <p className="mt-2 text-sm text-muted">{edu.details}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Research Section */}
        {sections.includes('research') && (
          <Section id="research" index={indexOf('research')} title="Research">
            <div className={ruledList}>
              {research.map((item, index) => (
                <article key={index}>
                  <Meta>
                    {item.period} · {item.role}
                  </Meta>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.organization}</p>
                  <p className="text-sm text-muted">Supervisor: {item.advisor}</p>
                  <ul className="mt-4 space-y-2">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-1 shrink-0 bg-accent" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* Publications Section */}
        {sections.includes('publications') && (
          <Section id="publications" index={indexOf('publications')} title="Publications">
            <ol className={ruledList}>
              {publications.map((pub, index) => (
                <li key={index} className="flex gap-4">
                  <span className="pt-1 font-mono text-xs tabular-nums text-faint">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold tracking-tight">{pub.title}</h3>
                      <span
                        className={`shrink-0 border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide ${
                          pub.type === 'patent' ? 'text-muted' : 'border-accent text-accent'
                        }`}
                      >
                        {publicationTypeLabels[pub.type] ?? pub.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{pub.authors}</p>
                    <p className="mt-1 text-sm text-muted">
                      <span className="text-ink">{pub.venue}</span> · {pub.year}
                    </p>
                    <Links links={pub.links} />
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Projects Section */}
        {sections.includes('projects') && (
          <Section id="projects" index={indexOf('projects')} title="Projects">
            <div className={ruledList}>
              {projects
                .filter((project) => showAllProjects || project.featured)
                .map((project, index) => (
                  <article key={index}>
                    <div className="flex items-center justify-between gap-4">
                      <Meta>{project.period}</Meta>
                      {project.featured && (
                        <span className="bg-ink px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-paper">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight">{project.title}</h3>
                    <p className="mt-2 text-muted">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <Links links={project.links} />
                  </article>
                ))}
            </div>
            {projects.length > projects.filter((p) => p.featured).length && (
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="mt-8 flex w-full items-center justify-center gap-2 border py-3 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-ink hover:text-paper"
              >
                {showAllProjects ? 'Show less' : `Show all ${projects.length} projects`}
                <IconChevronDown
                  className={`h-4 w-4 transition-transform ${showAllProjects ? 'rotate-180' : ''}`}
                  stroke={1.5}
                />
              </button>
            )}
          </Section>
        )}

        {/* Experience Section */}
        {sections.includes('experience') && (
          <Section id="experience" index={indexOf('experience')} title="Experience">
            <div className={ruledList}>
              {experience.map((exp, index) => (
                <article key={index}>
                  <Meta>
                    {exp.period}
                    {exp.location && ` · ${exp.location}`}
                  </Meta>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">{exp.title}</h3>
                  <p className="mt-1 text-sm text-muted">{exp.organization}</p>
                  <p className="mt-3 text-muted">{exp.description}</p>
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* Skills Section */}
        {sections.includes('skills') && (
          <Section id="skills" index={indexOf('skills')} title="Skills">
            <dl className="space-y-5">
              {skills.map((group, index) => (
                <div key={index} className="sm:flex sm:gap-6">
                  <dt className="mb-2 font-mono text-xs uppercase tracking-wide text-faint sm:mb-0 sm:w-40 sm:shrink-0 sm:pt-1">
                    {group.category}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {/* Awards Section */}
        {sections.includes('awards') && (
          <Section id="awards" index={indexOf('awards')} title="Awards & Achievements">
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {awards.map((award, index) => (
                <li key={index}>
                  <span className="block h-0.5 w-6 bg-accent" />
                  <p className="mt-3 font-medium leading-snug">{award.title}</p>
                  <p className="mt-1 text-sm text-muted">{award.description}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Footer */}
        <footer className={`${gutter} flex items-center justify-between py-6 font-mono text-xs uppercase tracking-wide text-faint`}>
          <p>
            © {currentYear} {profileData.name}
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="uppercase hover:text-ink">
            Top ↑
          </button>
        </footer>
      </main>
    </div>
  );
}
