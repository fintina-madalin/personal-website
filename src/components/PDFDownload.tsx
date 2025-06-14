'use client';

import { jsPDF } from 'jspdf';
import { Resume } from '@/types/resume';

interface PDFDownloadProps {
  resume: Resume;
}

export default function PDFDownload({ resume }: PDFDownloadProps) {
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
    const contactInfo = `${resume.personalInfo.location} | ${resume.personalInfo.phone} | ${resume.personalInfo.email || 'contact@example.com'}`;
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
      doc.text(`${job.company} | ${job.location} | ${job.startDate} - ${job.endDate}`, margin, yPosition);
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

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SKILLS', margin, yPosition);
    yPosition += 8;

    Object.entries(resume.skills).forEach(([category, skills]) => {
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      const categoryName = category.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
      doc.text(categoryName, margin, yPosition);
      yPosition += 6;

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const skillsText = skills.join(', ');
      yPosition = addWrappedText(skillsText, margin, yPosition, contentWidth, 9);
      yPosition += 8;
    });

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
    <button
      onClick={generatePDF}
      className="fixed top-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-mono text-sm px-3 py-1 rounded-lg border border-blue-400/50 hover:border-purple-400/50 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm z-10"
    >
      <span className="flex items-center space-x-2">
        <span>📄</span>
        <span>[download_pdf]</span>
      </span>
    </button>
  );
} 