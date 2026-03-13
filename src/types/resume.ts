export const TEMPLATES = ["classic", "modern", "sidebar"] as const;

export type TemplateType = (typeof TEMPLATES)[number];
export interface Certificate {
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
}
export interface Language {
  name: string;
  level: "Basic" | "Intermediate" | "Professional" | "Native";
}
export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
export interface Education {
  institution: string;
  location: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
export interface Project {
  name: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  description: string[];
}
export interface ResumeFormValues {
  template: TemplateType;
  theme: "blue" | "green" | "purple" | "dark";
  personalInfo: {
    fullName: string;
    targetRole: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  achievements: string[];
  certificates: Certificate[];
  languages: Language[];
}
