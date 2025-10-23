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

export interface Project {
  title: string;
  description: string;
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
  period: string;
  description: string;
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
