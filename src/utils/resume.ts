import resumeEn from '../data/resume.json';
import resumeRo from '../data/resume.ro.json';
import type { Resume } from '../types/resume';

export type Locale = 'en' | 'ro';

export const getResumeData = (locale: Locale = 'en'): Resume => {
  return (locale === 'ro' ? resumeRo : resumeEn) as Resume;
};
