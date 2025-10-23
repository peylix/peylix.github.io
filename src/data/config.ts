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
