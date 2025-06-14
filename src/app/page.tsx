import { getResumeData } from '@/utils/resume';
import PDFDownload from '@/components/PDFDownload';
import CollapsibleSection from '@/components/CollapsibleSection';

export default function Home() {
  const resume = getResumeData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <PDFDownload resume={resume} />
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur-xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {resume.personalInfo.name}
            </h1>
            <p className="text-xl text-gray-300 mb-4 font-mono">{resume.personalInfo.title}</p>
            <div className="flex justify-center space-x-4 text-gray-400 text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                {resume.personalInfo.location}
              </span>
              <span>•</span>
              <a href={`mailto:${resume.personalInfo.email}`} className="hover:text-blue-400 transition-colors">
                {resume.personalInfo.email || 'contact@example.com'}
              </a>
            </div>
            <div className="flex justify-center space-x-6 mt-6">
              <a href={resume.personalInfo.socialLinks.github || '#'} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                <span className="font-mono text-sm">[GitHub]</span>
              </a>
              <a href={resume.personalInfo.socialLinks.linkedin || '#'} target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-blue-400 transition-colors flex items-center space-x-2">
                <span className="font-mono text-sm">[LinkedIn]</span>
              </a>
            </div>
            
            {/* About Me Section */}
            <div className="mt-8 pt-6 border-t border-gray-600">
              <h2 className="text-lg font-bold text-green-400 mb-3 flex items-center justify-center">
                <span className="mr-2 font-mono">$</span>
                <span className="font-mono">about_me</span>
              </h2>
              <p className="text-gray-300 leading-relaxed font-mono text-sm max-w-3xl mx-auto">
                {resume.personalInfo.summary}
              </p>
            </div>
          </div>
        </header>

        {/* Work Experience Section */}
        <CollapsibleSection
          title="work_experience"
          icon="&gt;"
          iconColor="text-blue-400"
          borderColor="border-blue-500/50"
        >
          <div className="space-y-6">
            {resume.workExperience.map((job, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 font-mono">{job.position}</h3>
                    <p className="text-gray-300 font-mono text-sm">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 font-mono text-sm">{job.location}</p>
                    <p className="text-green-400 font-mono text-xs">
                      {job.startDate} → {job.endDate}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-start">
                      <span className="text-purple-400 mr-2 font-mono">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Projects Section */}
        {resume.projects.length > 0 && (
          <CollapsibleSection
            title="projects"
            icon="*"
            iconColor="text-yellow-400"
            borderColor="border-yellow-500/50"
          >
            <div className="space-y-6">
              {resume.projects.map((project, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-yellow-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-400 font-mono">{project.name}</h3>
                      <p className="text-gray-300 font-mono text-sm">{project.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 font-mono text-sm">
                        {project.startDate} → {project.endDate}
                      </p>
                      <p className="text-cyan-400 font-mono text-xs">{project.status}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-900/30 text-blue-300 border border-blue-700/50 rounded text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-300 font-mono text-sm transition-colors"
                  >
                    [view_project] →
                  </a>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Skills Section */}
        <CollapsibleSection
          title="skills"
          icon="#"
          iconColor="text-purple-400"
          borderColor="border-purple-500/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(resume.skills).map(([category, skills]) => (
              <div key={category} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 font-mono">
                  {category.replace(/([A-Z])/g, '_$1').toLowerCase()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600 rounded-md text-sm font-mono hover:border-blue-500/50 transition-colors"
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
          title="education"
          icon="@"
          iconColor="text-cyan-400"
          borderColor="border-cyan-500/50"
        >
          <div className="space-y-6">
            {resume.education.map((edu, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 font-mono">{edu.degree}</h3>
                    <p className="text-gray-300 font-mono text-sm">{edu.institution}</p>
                    <p className="text-gray-400 font-mono text-xs">{edu.location}</p>
                  </div>
                  <div className="text-right">
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
          title="certifications"
          icon="%"
          iconColor="text-orange-400"
          borderColor="border-orange-500/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.certifications.map((cert, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-orange-500/50 transition-colors">
                <h3 className="text-lg font-semibold text-orange-400 font-mono">{cert.name}</h3>
                <p className="text-gray-300 font-mono text-sm">{cert.issuer}</p>
                <p className="text-green-400 font-mono text-xs">{cert.date}</p>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Languages Section */}
        <CollapsibleSection
          title="languages"
          icon="&amp;"
          iconColor="text-pink-400"
          borderColor="border-pink-500/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.languages.map((lang, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-pink-500/50 transition-colors">
                <h3 className="text-lg font-semibold text-pink-400 font-mono">{lang.language}</h3>
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
