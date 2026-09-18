export interface ProfileData {
  name: string;
  title: string;
  institution: string;
  location: string;
  email: string;
  bio: string;
  avatar: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export interface Education {
  degree: string;
  institution: string;
  department: string;
  location: string;
  period: string;
  details: string;
}

export interface Research {
  title: string;
  role: string;
  organization: string;
  advisor: string;
  period: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  period?: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
  };
  featured: boolean;
}

export interface Experience {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Award {
  title: string;
  description: string;
}

export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: 'conference' | 'journal' | 'patent';
  links: {
    paper?: string;
    status?: string;
    patent?: string;
  };
}
