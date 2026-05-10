'use client';

import { getResumeData } from '@/utils/resume';
import CollapsibleSection from '@/components/CollapsibleSection';
import TimelineSection, { TimelineItem } from '@/components/TimelineSection';
import { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';

function PromptLine({ command }: { command: string }) {
  return (
    <div className="flex items-baseline gap-2 text-xs sm:text-sm">
      <span className="text-mint">~/resume</span>
      <span className="text-gray-600">$</span>
      <span className="text-gray-200">{command}</span>
    </div>
  );
}

export default function Home() {
  const resume = getResumeData();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navigationItems = useMemo(() => [
    { href: '#work_experience', label: 'work_experience', icon: '>', accent: 'text-mint' },
    { href: '#skills', label: 'skills', icon: '#', accent: 'text-peach' },
    { href: '#education', label: 'education', icon: '@', accent: 'text-mint' },
    { href: '#certifications', label: 'certifications', icon: '%', accent: 'text-peach' },
    { href: '#languages', label: 'languages', icon: '&', accent: 'text-mint' },
  ], []);

  const handleNavClick = () => {
    setIsMobileNavOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(resume.personalInfo.name, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(resume.personalInfo.title, margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    const contactInfo = `${resume.personalInfo.location} | ${resume.personalInfo.email} | fintina.ro`;
    doc.text(contactInfo, margin, yPosition);
    yPosition += 15;

    // Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SUMMARY', margin, yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(resume.personalInfo.summary, margin, yPosition, contentWidth, 10);
    yPosition += 10;

    // Work Experience
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('WORK EXPERIENCE', margin, yPosition);
    yPosition += 8;

    resume.workExperience.forEach((job) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(job.position, margin, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${job.company} | ${job.contract_type} | ${job.location} | ${job.startDate} - ${job.endDate}`, margin, yPosition);
      yPosition += 8;

      job.highlights.forEach((highlight) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        yPosition = addWrappedText(`• ${highlight.text}`, margin + 5, yPosition, contentWidth - 5, 9);
        yPosition += 2;
      });
      yPosition += 5;
    });

    // Skills
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    // Education
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCATION', margin, yPosition);
    yPosition += 8;

    resume.education.forEach((edu) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(edu.degree, margin, yPosition);
      yPosition += 6;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${edu.institution} | ${edu.location} | ${edu.startDate} - ${edu.endDate}`, margin, yPosition);
      yPosition += 10;
    });

    // Certifications
    if (resume.certifications.length > 0) {
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICATIONS', margin, yPosition);
      yPosition += 8;

      resume.certifications.forEach((cert) => {
        if (yPosition > 260) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(cert.name, margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`${cert.issuer} | ${cert.date}`, margin, yPosition);
        yPosition += 8;
      });
    }

    // Languages
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('LANGUAGES', margin, yPosition);
    yPosition += 8;

    resume.languages.forEach((lang) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${lang.language}: ${lang.proficiency}`, margin, yPosition);
      yPosition += 6;
    });

    // Save the PDF
    const fileName = `${resume.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    doc.save(fileName);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
        className="fixed top-4 left-4 z-30 md:hidden bg-gray-800/90 backdrop-blur-sm border border-gray-600 rounded-lg p-2 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
        aria-label="Toggle navigation"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <span className={`block h-0.5 bg-current transition-transform duration-300 ${isMobileNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 bg-current transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 bg-current transition-transform duration-300 ${isMobileNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>

      {/* Navigation Section */}
      <div className={`fixed top-0 left-0 right-0 z-20 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 transition-transform duration-300 ${isMobileNavOpen ? 'translate-y-0' : '-translate-y-full'} md:sticky md:translate-y-0`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="hidden md:flex items-center gap-2 font-mono text-xs text-gray-500 mb-2">
            <span className="text-mint">~/resume</span>
            <span className="text-gray-600">$</span>
            <span className="text-gray-400">git</span>
            <span className="text-gray-300">checkout</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-500 italic">pick a section</span>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-start gap-2 md:items-center">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="group px-3 py-1.5 bg-gray-900/60 border border-gray-700/60 rounded hover:bg-gray-800/80 hover:border-gray-500 transition-colors font-mono text-xs sm:text-sm flex items-center gap-2"
              >
                <span className={`${item.accent}`}>{item.icon}</span>
                <span className="text-gray-300 group-hover:text-white">{item.label}</span>
              </a>
            ))}
            <button
              onClick={() => {
                generatePDF();
                setIsMobileNavOpen(false);
              }}
              className="ml-0 md:ml-auto px-3 py-1.5 bg-gray-900/60 border border-mint/40 rounded hover:bg-mint/10 hover:border-mint/60 transition-colors font-mono text-xs sm:text-sm flex items-center gap-2 text-mint"
            >
              <span>↓</span>
              <span>download_pdf</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section — terminal window */}
        <header className="mb-8 md:mb-12">
          <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-900/70 backdrop-blur-sm shadow-xl">
            {/* terminal title bar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 border-b border-gray-700">
              <span className="w-3 h-3 rounded-full bg-peach" aria-hidden />
              <span className="w-3 h-3 rounded-full bg-mint/60" aria-hidden />
              <span className="w-3 h-3 rounded-full bg-mint" aria-hidden />
              <span className="ml-2 font-mono text-xs text-gray-400 truncate">
                bash — fintina@portfolio: ~/resume
              </span>
            </div>

            {/* terminal body */}
            <div className="px-4 py-5 sm:px-6 sm:py-6 font-mono text-sm">
              {/* banner */}
              <pre className="text-mint text-[0.6rem] sm:text-xs md:text-sm leading-tight overflow-x-auto whitespace-pre" aria-hidden>
{`╭──────────────────────────────────────────────╮
│  ${resume.personalInfo.name.padEnd(43)}│
│  ${resume.personalInfo.title.padEnd(43)}│
╰──────────────────────────────────────────────╯`}
              </pre>
              <h1 className="sr-only">{resume.personalInfo.name}</h1>

              {/* whoami */}
              <div className="mt-4 sm:mt-5">
                <PromptLine command="whoami" />
                <div className="pl-3 mt-1 flex items-center gap-2 text-gray-300">
                  <span className="w-2 h-2 bg-mint rounded-full animate-pulse" aria-hidden />
                  <span>{resume.personalInfo.name}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-gray-400">{resume.personalInfo.location}</span>
                </div>
              </div>

              {/* contact --list */}
              <div className="mt-4 sm:mt-5">
                <PromptLine command="contact --list" />
                <ul className="pl-3 mt-1 space-y-0.5 text-xs sm:text-sm">
                  <li className="flex items-baseline gap-2">
                    <span className="text-gray-600 select-none">├──</span>
                    <span className="text-gray-400 w-16 sm:w-20 inline-block">github</span>
                    <a
                      href={resume.personalInfo.socialLinks.github || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mint hover:text-white hover:underline truncate"
                    >
                      github.com/fintina-madalin
                    </a>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-gray-600 select-none">├──</span>
                    <span className="text-gray-400 w-16 sm:w-20 inline-block">linkedin</span>
                    <a
                      href={resume.personalInfo.socialLinks.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-mint hover:text-white hover:underline truncate"
                    >
                      linkedin.com/in/fintina-madalin
                    </a>
                  </li>
                  <li className="flex items-baseline gap-2">
                    <span className="text-gray-600 select-none">└──</span>
                    <span className="text-gray-400 w-16 sm:w-20 inline-block">email</span>
                    <a
                      href={`mailto:${resume.personalInfo.email}`}
                      className="text-mint hover:text-white hover:underline truncate"
                    >
                      {resume.personalInfo.email || 'contact@example.com'}
                    </a>
                  </li>
                </ul>
              </div>

              {/* about_me */}
              <div className="mt-4 sm:mt-5">
                <PromptLine command="cat about_me.md" />
                <p className="pl-3 mt-1 text-gray-300 leading-relaxed text-xs sm:text-sm">
                  {resume.personalInfo.summary}
                </p>
              </div>

              {/* idle prompt */}
              <div className="mt-5 flex items-center gap-2 text-xs">
                <span className="text-mint">~/resume</span>
                <span className="text-gray-600">$</span>
                <span className="inline-block w-2 h-4 bg-gray-300 animate-pulse" aria-hidden />
              </div>
            </div>
          </div>
        </header>

        {/* Work Experience Section */}
        <CollapsibleSection
          id="work_experience"
          title="work_experience"
          icon="&gt;"
          iconColor="text-mint"
          borderColor="border-mint/40"
        >
          <TimelineSection
            items={resume.workExperience.map<TimelineItem>((job) => ({
              subject: `${job.position} @ ${job.company}`,
              context: `${job.location} · ${job.contract_type}`,
              startDate: job.startDate,
              endDate: job.endDate,
              highlights: job.highlights,
            }))}
            defaultExpanded={3}
            accentColor="text-mint"
          />
        </CollapsibleSection>

        {/* Skills Section */}
        <CollapsibleSection
          id="skills"
          title="skills"
          icon="#"
          iconColor="text-peach"
          borderColor="border-peach/40"
        >
          <div className="font-mono text-xs sm:text-sm bg-gray-900/40 border border-gray-800 rounded-md px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex items-center gap-2 mb-3 text-gray-500">
              <span className="text-mint">~/resume/skills</span>
              <span>$</span>
              <span className="text-gray-400">tree</span>
              <span className="text-gray-600">--depth=2</span>
            </div>
            <div className="text-peach mb-1">skills/</div>
            {(() => {
              const categories = Object.entries(resume.skills) as [string, string[]][];
              return categories.map(([category, skills], catIdx) => {
                const isLastCat = catIdx === categories.length - 1;
                const branch = isLastCat ? '└──' : '├──';
                const childPrefix = isLastCat ? '    ' : '│   ';
                return (
                  <div key={category}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-gray-600 select-none">{branch}</span>
                      <span className="text-peach/80">{category.replace(/([A-Z])/g, '_$1').toLowerCase()}/</span>
                    </div>
                    {skills.map((skill, i) => {
                      const isLastSkill = i === skills.length - 1;
                      const skillBranch = isLastSkill ? '└──' : '├──';
                      return (
                        <div key={i} className="flex items-baseline gap-2 hover:bg-gray-800/40 rounded-sm px-1 transition-colors">
                          <span className="text-gray-600 select-none whitespace-pre">{childPrefix}{skillBranch}</span>
                          <span className="text-gray-300">{skill}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              });
            })()}
          </div>
        </CollapsibleSection>

        {/* Education Section */}
        <CollapsibleSection
          id="education"
          title="education"
          icon="@"
          iconColor="text-mint"
          borderColor="border-mint/40"
        >
          <TimelineSection
            items={resume.education.map<TimelineItem>((edu) => ({
              subject: `${edu.degree} @ ${edu.institution}`,
              context: edu.location,
              startDate: edu.startDate,
              endDate: edu.endDate,
            }))}
            defaultExpanded={2}
            accentColor="text-mint"
          />
        </CollapsibleSection>

        {/* Certifications Section */}
        <CollapsibleSection
          id="certifications"
          title="certifications"
          icon="%"
          iconColor="text-peach"
          borderColor="border-peach/40"
        >
          <div className="font-mono text-xs sm:text-sm bg-gray-900/40 border border-gray-800 rounded-md px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex items-center gap-2 mb-3 text-gray-500">
              <span className="text-mint">~/resume/certifications</span>
              <span>$</span>
              <span className="text-gray-400">git</span>
              <span className="text-gray-300">log</span>
              <span className="text-gray-600">--oneline</span>
            </div>
            <ul className="space-y-1.5">
              {resume.certifications.map((cert, index) => {
                const hash = (cert.name + cert.issuer + cert.date)
                  .split('')
                  .reduce((h, c) => ((h << 5) + h + c.charCodeAt(0)) & 0xffffffff, 5381);
                const shortHash = Math.abs(hash).toString(16).padStart(7, '0').slice(0, 7);
                return (
                  <li key={index} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 hover:bg-gray-800/40 rounded-sm px-1 transition-colors">
                    <span className="text-peach">{shortHash}</span>
                    <span className="text-mint/80">{cert.date}</span>
                    <span className="text-peach font-semibold">{cert.name}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-400">{cert.issuer}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </CollapsibleSection>

        {/* Languages Section */}
        <CollapsibleSection
          id="languages"
          title="languages"
          icon="&amp;"
          iconColor="text-mint"
          borderColor="border-mint/40"
        >
          <div className="font-mono text-xs sm:text-sm bg-gray-900/40 border border-gray-800 rounded-md px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex items-center gap-2 mb-3 text-gray-500">
              <span className="text-mint">~/resume/languages</span>
              <span>$</span>
              <span className="text-gray-400">cat</span>
              <span className="text-gray-300">languages.tsv</span>
            </div>
            <ul className="space-y-1.5">
              {resume.languages.map((lang, index) => (
                <li key={index} className="flex items-baseline gap-3 hover:bg-gray-800/40 rounded-sm px-1 transition-colors">
                  <span className="text-gray-600 select-none">&gt;</span>
                  <span className="text-mint font-semibold w-24 sm:w-28 inline-block">{lang.language}</span>
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-300">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleSection>

        {/* Recommendations Section */}
        {resume.recommendations && resume.recommendations.length > 0 && (
          <CollapsibleSection
            title="recommendations"
            icon="★"
            iconColor="text-peach"
            borderColor="border-peach/40"
          >
            <div className="space-y-6">
              {resume.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-peach/40 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-peach to-mint rounded-full flex items-center justify-center">
                        <span className="text-white font-mono text-lg">👤</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-peach font-mono mb-2">{rec.recommender}</h3>
                      <blockquote className="text-gray-300 text-sm leading-relaxed italic">
                        &ldquo;{rec.text}&rdquo;
                      </blockquote>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}
      </div>
    </main>
  );
}
