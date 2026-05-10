export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  summary: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export type HighlightKind = "ai" | "metric" | "decision" | "story";

export interface Highlight {
  text: string;
  kind: HighlightKind;
}

export interface WorkExperience {
  company: string;
  position: string;
  location: string;
  contract_type: string;
  startDate: string;
  endDate: string;
  highlights: Highlight[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Skills {
  programmingLanguages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devOps: string[];
  tools: string[];
  ai?: string[];
  services?: string[];
}

export interface Project {
  name: string;
  company: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  status: string;
  link: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Recommendation {
  recommender: string;
  text: string;
}

export interface Resume {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  recommendations?: Recommendation[];
} 