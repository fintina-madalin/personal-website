'use client';

import { getResumeData } from '@/utils/resume';
import CollapsibleSection from '@/components/CollapsibleSection';
import { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';

export default function Home() {
  const resume = getResumeData();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navigationItems = useMemo(() => [
    {
      href: '#work_experience',
      label: 'work_experience',
      icon: '>',
      bgColor: 'bg-blue-900/30',
      textColor: 'text-blue-300',
      borderColor: 'border-blue-700/50',
      hoverColor: 'hover:bg-blue-800/50'
    },
    {
      href: '#skills',
      label: 'skills',
      icon: '#',
      bgColor: 'bg-purple-900/30',
      textColor: 'text-purple-300',
      borderColor: 'border-purple-700/50',
      hoverColor: 'hover:bg-purple-800/50'
    },
    {
      href: '#education',
      label: 'education',
      icon: '@',
      bgColor: 'bg-cyan-900/30',
      textColor: 'text-cyan-300',
      borderColor: 'border-cyan-700/50',
      hoverColor: 'hover:bg-cyan-800/50'
    },
    {
      href: '#certifications',
      label: 'certifications',
      icon: '%',
      bgColor: 'bg-orange-900/30',
      textColor: 'text-orange-300',
      borderColor: 'border-orange-700/50',
      hoverColor: 'hover:bg-orange-800/50'
    },
    {
      href: '#languages',
      label: 'languages',
      icon: '&',
      bgColor: 'bg-pink-900/30',
      textColor: 'text-pink-300',
      borderColor: 'border-pink-700/50',
      hoverColor: 'hover:bg-pink-800/50'
    }
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
    const contactInfo = `${resume.personalInfo.location} | ${resume.personalInfo.email} | fintina.ro'}`;
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
        yPosition = addWrappedText(`• ${highlight}`, margin + 5, yPosition, contentWidth - 5, 9);
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
      <div className={`fixed top-0 left-0 right-0 z-20 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 transition-transform duration-300 ${isMobileNavOpen ? 'translate-y-0' : '-translate-y-full'} md:sticky md:translate-y-0`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:justify-center gap-3 md:items-center">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`px-4 py-2 ${item.bgColor} ${item.textColor} border ${item.borderColor} rounded ${item.hoverColor} transition-colors font-mono text-sm text-center flex items-center justify-center space-x-2`}
              >
                <span className="font-mono">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
            <button
              onClick={() => {
                generatePDF();
                setIsMobileNavOpen(false);
              }}
              className="px-4 py-2 bg-green-900/30 text-green-300 border border-green-700/50 rounded hover:bg-green-800/50 transition-colors font-mono text-sm flex items-center justify-center space-x-2"
            >
              <span className="font-mono">↓</span>
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
        {/* Header Section */}
        <header className="text-center mb-8 md:mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {resume.personalInfo.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 font-mono">{resume.personalInfo.title}</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-400 text-sm">
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                {resume.personalInfo.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <a href={`mailto:${resume.personalInfo.email}`} className="hover:text-blue-400 transition-colors">
                {resume.personalInfo.email || 'contact@example.com'}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6 mt-6">
              <a href={resume.personalInfo.socialLinks.github || '#'} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2">
                <span className="font-mono text-sm">[GitHub]</span>
              </a>
              <a href={resume.personalInfo.socialLinks.linkedin || '#'} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center space-x-2">
                <span className="font-mono text-sm">[LinkedIn]</span>
              </a>
            </div>
            
            {/* About Me Section */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-600">
              <h2 className="text-base md:text-lg font-bold text-green-400 mb-3 flex items-center justify-center">
                <span className="font-mono">about_me</span>
              </h2>
              <p className="text-gray-300 leading-relaxed font-mono text-xs sm:text-sm max-w-3xl mx-auto px-2 sm:px-0">
                {resume.personalInfo.summary}
              </p>
            </div>
          </div>
        </header>

        {/* Work Experience Section */}
        <CollapsibleSection
          id="work_experience"
          title="work_experience"
          icon="&gt;"
          iconColor="text-blue-400"
          borderColor="border-blue-500/50"
        >
          <div className="space-y-4 md:space-y-6">
            {resume.workExperience.map((job, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6 hover:border-blue-500/50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 space-y-2 md:space-y-0">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-blue-400 font-mono">{job.position}</h3>
                    <p className="text-gray-300 font-mono text-sm">{job.company} | {job.contract_type}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-gray-400 font-mono text-sm">{job.location}</p>
                    <p className="text-green-400 font-mono text-xs">
                      {job.startDate} → {job.endDate}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-gray-300 text-xs sm:text-sm flex items-start">
                      <span className="text-purple-400 mr-2 font-mono flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Skills Section */}
        <CollapsibleSection
          id="skills"
          title="skills"
          icon="#"
          iconColor="text-purple-400"
          borderColor="border-purple-500/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {Object.entries(resume.skills).map(([category, skills]) => (
              <div key={category} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6 hover:border-purple-500/50 transition-colors">
                <h3 className="text-base md:text-lg font-semibold text-purple-400 mb-3 font-mono">
                  {category.replace(/([A-Z])/g, '_$1').toLowerCase()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 md:px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600 rounded-md text-xs sm:text-sm font-mono hover:border-blue-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Education Section */}
        <CollapsibleSection
          id="education"
          title="education"
          icon="@"
          iconColor="text-cyan-400"
          borderColor="border-cyan-500/50"
        >
          <div className="space-y-4 md:space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6 hover:border-cyan-500/50 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-2 md:space-y-0">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-cyan-400 font-mono">{edu.degree}</h3>
                    <p className="text-gray-300 font-mono text-sm">{edu.institution}</p>
                    <p className="text-gray-400 font-mono text-xs">{edu.location}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-green-400 font-mono text-sm">
                      {edu.startDate} → {edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-gray-400 font-mono text-xs">GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Certifications Section */}
        <CollapsibleSection
          id="certifications"
          title="certifications"
          icon="%"
          iconColor="text-orange-400"
          borderColor="border-orange-500/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {resume.certifications.map((cert, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6 hover:border-orange-500/50 transition-colors">
                <h3 className="text-base md:text-lg font-semibold text-orange-400 font-mono">{cert.name}</h3>
                <p className="text-gray-300 font-mono text-sm">{cert.issuer}</p>
                <p className="text-green-400 font-mono text-xs">{cert.date}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Languages Section */}
        <CollapsibleSection
          id="languages"
          title="languages"
          icon="&amp;"
          iconColor="text-pink-400"
          borderColor="border-pink-500/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {resume.languages.map((lang, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 md:p-6 hover:border-pink-500/50 transition-colors">
                <h3 className="text-base md:text-lg font-semibold text-pink-400 font-mono">{lang.language}</h3>
                <p className="text-gray-300 font-mono text-sm">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Recommendations Section */}
        {resume.recommendations && resume.recommendations.length > 0 && (
          <CollapsibleSection
            title="recommendations"
            icon="★"
            iconColor="text-yellow-300"
            borderColor="border-yellow-400/50"
          >
            <div className="space-y-6">
              {resume.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-400/50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-mono text-lg">👤</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-yellow-300 font-mono mb-2">{rec.recommender}</h3>
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
