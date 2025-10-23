import { useState } from 'react';
import {IconBrandGithub, IconBrandLinkedin, IconMail, IconExternalLink, IconMapPin, IconBuildings, IconSelect} from '@tabler/icons-react';
import { profileData } from './data/profile';
import { publications } from './data/publications';
import { projects } from './data/projects';
import { experience } from './data/experience';
import { awards } from './data/awards';
import { getEnabledSections } from './data/config';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Get only enabled sections from config
  const sections = getEnabledSections();


  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <span className="text-lg font-semibold text-slate-900 dark:text-white">
              {profileData.name}
            </span>
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize text-sm font-medium transition-colors ${
                    activeSection === section
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
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
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <IconBrandGithub className="w-5 h-5" />
                </a>
                <a
                  href={profileData.social.linkedin}
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
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">About</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        </section>
      )}

      {/* Publications Section */}
      {sections.includes('publications') && (
      <section id="publications" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{pub.authors}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      <span className="font-medium">{pub.venue}</span> • {pub.year}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      pub.type === 'journal'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : pub.type === 'patent'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}
                  >
                    {pub.type}
                  </span>
                </div>
                <div className="flex gap-4 mt-4">
                  {Object.entries(pub.links).map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <IconExternalLink className="w-3 h-3" />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Projects Section */}
      {sections.includes('projects') && (
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Projects</h2>
          <div className="grid gap-6 mb-6">
            {projects
              .filter((project) => showAllProjects || project.featured)
              .map((project, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 rounded">
                        Featured
                      </span>
                    )}
                  </div>
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
                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <IconExternalLink className="w-3 h-3" />
                        {key.charAt(0).toUpperCase() + key.slice(1)}
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
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-3 h-3 mt-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    {exp.organization} • {exp.period}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Awards Section */}
      {sections.includes('awards') && (
      <section id="awards" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Awards & Achievements</h2>
          <div className="grid gap-4">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <p className="text-slate-700 dark:text-slate-300">
                  <span className="font-medium">{award.title}</span> • {award.description}
                </p>
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
