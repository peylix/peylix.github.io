import { useEffect, useMemo, useRef, useState } from 'react';
import {IconBrandGithub, IconBrandLinkedin, IconMail, IconExternalLink, IconMapPin, IconBuildings, IconSelect, IconSchool, IconFlask, IconAward, IconMenu2, IconX} from '@tabler/icons-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-6">
            <span className="text-lg font-semibold text-slate-900 dark:text-white shrink-0">
              {profileData.name}
            </span>
            <div className="hidden md:flex items-center gap-x-4 lg:gap-x-8 overflow-x-auto">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`whitespace-nowrap text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 -mr-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          // Overlaid rather than in flow: an expanding nav would shift the page
          // under the smooth scroll started by tapping an entry.
          <div className="md:hidden absolute top-full left-0 right-0 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left px-4 sm:px-6 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={profileData.avatar}
              alt={profileData.name}
              className="w-32 h-32 rounded-full shadow-lg ring-4 ring-white dark:ring-slate-800"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {profileData.name}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
                {profileData.title}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-slate-600 dark:text-slate-400 mb-6">
                <span className="flex items-center gap-1">
                  <IconBuildings className="w-4 h-4" />
                  {profileData.institution}
                </span>
                <span className="flex items-center gap-1">
                  <IconMapPin className="w-4 h-4" />
                  {profileData.location}
                </span>
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <IconMail className="w-4 h-4" />
                  {profileData.email}
                </a>
              </div>
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href={profileData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <IconBrandGithub className="w-5 h-5" />
                </a>
                <a
                  href={profileData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <IconBrandLinkedin className="w-5 h-5" />
                </a>
                {/* <a */}
                {/*   href={profileData.social.googleScholar} */}
                {/*   className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" */}
                {/*   aria-label="Google Scholar" */}
                {/* > */}
                {/*   <IconBrandGoogle className="w-5 h-5" /> */}
                {/* </a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      {sections.includes('about') && (
        <section id="about" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">About</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        </section>
      )}

      {/* Education Section */}
      {sections.includes('education') && (
      <section id="education" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Education</h2>
          <div className="grid gap-5 sm:grid-cols-2 items-start">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <IconSchool className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {edu.institution}
                  </h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{edu.degree}</p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">{edu.period}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  {edu.department} • {edu.location}
                </p>
                {edu.details && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{edu.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Research Section */}
      {sections.includes('research') && (
      <section id="research" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Research</h2>
          <div className="space-y-5">
            {research.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <IconFlask className="w-5 h-5 mt-1 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <span className="text-sm text-slate-500 dark:text-slate-500 whitespace-nowrap sm:text-right">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {item.role} • {item.organization}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
                      Advisor: {item.advisor}
                    </p>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-2 text-slate-600 dark:text-slate-400">
                          <span className="text-blue-600 dark:text-blue-400 flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Publications Section */}
      {sections.includes('publications') && (
      <section id="publications" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Publications</h2>
          <ol className="border-y border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
            {publications.map((pub, index) => (
              <li key={index} className="flex gap-4 py-5">
                <span className="pt-0.5 text-sm font-medium tabular-nums text-slate-400 dark:text-slate-600">
                  [{index + 1}]
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {pub.title}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                        pub.type === 'journal'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : pub.type === 'patent'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}
                    >
                      {publicationTypeLabels[pub.type] ?? pub.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{pub.authors}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    <span className="font-medium">{pub.venue}</span> • {pub.year}
                  </p>
                  <div className="flex gap-4 mt-2">
                    {Object.entries(pub.links).map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <IconExternalLink className="w-3 h-3" />
                        {labelFor(key)}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      )}

      {/* Projects Section */}
      {sections.includes('projects') && (
      <section id="projects" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Projects</h2>
          <div className="grid gap-5 mb-6">
            {projects
              .filter((project) => showAllProjects || project.featured)
              .map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded flex-shrink-0">
                        Featured
                      </span>
                    )}
                  </div>
                  {project.period && (
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-3">{project.period}</p>
                  )}
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {Object.entries(project.links).map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <IconExternalLink className="w-3 h-3" />
                        {labelFor(key)}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          {projects.length > projects.filter((p) => p.featured).length && (
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="flex items-center gap-2 mx-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showAllProjects ? 'Show Less' : 'Show All Projects'}
              <IconSelect className={`w-4 h-4 transition-transform ${showAllProjects ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>
      </section>
      )}

      {/* Experience Section */}
      {sections.includes('experience') && (
      <section id="experience" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-3 h-3 mt-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {exp.organization} • {exp.period}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Skills Section */}
      {sections.includes('skills') && (
      <section id="skills" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Skills</h2>
          <dl className="border-y border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
            {skills.map((group, index) => (
              <div key={index} className="py-4 sm:flex sm:gap-6">
                <dt className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:mb-0 sm:w-44 sm:flex-shrink-0 sm:pt-1">
                  {group.category}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      )}

      {/* Awards Section */}
      {sections.includes('awards') && (
      <section id="awards" className="scroll-mt-8 py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Awards & Achievements</h2>
          <div className="grid gap-3 sm:grid-cols-2 items-start">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
              >
                <IconAward className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{award.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} {profileData.name}.</p>
        </div>
      </footer>
    </div>
  );
}
