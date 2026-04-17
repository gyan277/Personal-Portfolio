import { Link } from "react-router-dom";
import { Code2, Palette, Zap } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      category: "Frontend Development",
      icon: Palette,
      items: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Next.js", level: 85 },
      ]
    },
    {
      category: "Backend & Database",
      icon: Code2,
      items: [
        { name: "Node.js & Express", level: 90 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 60 },
        { name: "Firebase", level: 85 },
      ]
    },
    {
      category: "Tools & DevOps",
      icon: Zap,
      items: [
        { name: "Git & GitHub", level: 95 },
        { name: "Docker", level: 70 },
        { name: "Vite & Build Tools", level: 90 },
        { name: "Figma & Design", level: 85 },
      ]
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
              <Link to="/experience" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                Experience
              </Link>
              <Link to="/projects" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                Projects
              </Link>
              <Link to="/skills" className="text-sm font-medium text-blue-400 transition-colors">
                Skills
              </Link>
              <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm shadow-lg shadow-blue-500/50">
                Get in Touch
              </Link>
            </div>
          </nav>
        </header>

        {/* Skills Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h2>
              <p className="text-slate-300 text-lg max-w-2xl">
                I bring a diverse skill set to every project, combining technical knowledge with creative problem-solving.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {skills.map((skill, idx) => {
                const IconComponent = skill.icon;
                return (
                  <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all hover:bg-slate-800/70">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <IconComponent className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {skill.category}
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {skill.items.map((skillItem, i) => (
                        <li key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white">{skillItem.name}</span>
                            <span className="text-xs text-slate-400">{skillItem.level}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${skillItem.level}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
