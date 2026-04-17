import { Link } from "react-router-dom";

export default function Experience() {
  const experience = [
    {
      title: "CEO ",
      company: "CareerGhana",
      period: "2026 - Present",
      description: "Leading development of a platfrom to help in Career Path",
    },
    {
      title: "IT Support Specialist (Intern)",
      company: "Mount Olivet Methodist Academy",
      period: "2025-2026",
      description: "Built and maintained multiple SaaS platforms, implemented payment integrations, and optimized database queries.",
    },
    {
      title: "Graphic Designer",
      company: "Freelance",
      period: "2024 - present",
      description: "Changing ideas into artworks and creating flyers",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Circuit Board Background */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#3b82f6" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Animated Glow Effects */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-40 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 z-50 shadow-lg">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Gyan Daniel Nana Yaw
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link to="/experience" className="text-sm font-medium text-blue-400 transition-colors">
                Experience
              </Link>
              <Link to="/projects" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                Projects
              </Link>
              <Link to="/skills" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                Skills
              </Link>
              <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm shadow-lg shadow-blue-500/50">
                Get in Touch
              </Link>
            </div>
          </nav>
        </header>

        {/* Experience Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
              <p className="text-slate-300 text-lg">My journey in building amazing digital products.</p>
            </div>
            <div className="space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pb-8" style={idx !== experience.length - 1 ? { borderLeft: "2px solid rgba(59, 130, 246, 0.3)" } : {}}>
                  <div className="absolute -left-3.5 top-0 w-7 h-7 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-slate-900"></div>
                  <div className="ml-8">
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-blue-400 font-semibold mb-2">{exp.company}</p>
                    <p className="text-sm text-slate-400 mb-3">{exp.period}</p>
                    <p className="text-slate-300 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
