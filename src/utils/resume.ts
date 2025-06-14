import resumeData from '../data/resume.json';
import type { Resume } from '../types/resume';

export const getResumeData = (): Resume => {
  return resumeData as Resume;
}; 