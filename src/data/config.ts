export interface SectionConfig {
  id: string;
  enabled: boolean;
  label: string;
}

export const sectionConfig: SectionConfig[] = [
  {
    id: 'about',
    enabled: true,
    label: 'About'
  },
  {
    id: 'education',
    enabled: true,
    label: 'Education'
  },
  {
    id: 'research',
    enabled: true,
    label: 'Research'
  },
  {
    id: 'publications',
    enabled: true,
    label: 'Publications'
  },
  {
    id: 'projects',
    enabled: true,
    label: 'Projects'
  },
  {
    id: 'experience',
    enabled: true,
    label: 'Experience'
  },
  {
    id: 'skills',
    enabled: true,
    label: 'Skills'
  },
  {
    id: 'awards',
    enabled: true,
    label: 'Awards'
  }
];

/**
 * get enabled sections
 */
export const getEnabledSections = (): string[] => {
  return sectionConfig
    .filter(section => section.enabled)
    .map(section => section.id);
};

/**
 * get enabled sections with their nav labels
 */
export const getEnabledSectionConfigs = (): SectionConfig[] => {
  return sectionConfig.filter(section => section.enabled);
};
