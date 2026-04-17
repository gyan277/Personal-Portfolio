import { Link } from "react-router-dom";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Index() {
  const stats = [
    { value: "5+", label: "Projects Completed" },
    { value: "5+", label: "Happy Clients" },
    { value: "2+", label: "Years Experience" },
    { value: "100%", label: "Client Satisfaction" },
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
          
          {/* Circuit paths */}
          <g stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.4">
            <path d="M 100 100 L 300 100 L 300 200 L 500 200" />
            <path d="M 200 50 L 200 150 L 400 150" />
            <path d="M 600 100 L 800 100 L 800 300" />
            <path d="M 150 300 L 350 300 L 350 400 L 550 400" />
            <path d="M 700 250 L 900 250 L 900 450" />
          </g>
          
          {/* Circuit nodes */}
          <g fill="#3b82f6" opacity="0.6">
            <circle cx="100" cy="100" r="4" />
            <circle cx="300" cy="100" r="4" />
            <circle cx="300" cy="200" r="4" />
            <circle cx="500" cy="200" r="4" />
            <circle cx="200" cy="50" r="4" />
            <circle cx="200" cy="150" r="4" />
            <circle cx="400" cy="150" r="4" />
            <circle cx="600" cy="100" r="4" />
            <circle cx="800" cy="100" r="4" />
            <circle cx="800" cy="300" r="4" />
          </g>
        </svg>
      </div>

      {/* Animated Glow Effects */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-40 right-20 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-15 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 z-50 shadow-lg">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Gyan Daniel Nana Yaw
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link to="/" className="text-sm font-medium text-blue-400 transition-colors">
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
              <Link to="/skills" className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors">
                Skills
              </Link>
              <Link to="/contact" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm shadow-lg shadow-blue-500/50">
                Get in Touch
              </Link>
            </div>
            <button className="md:hidden p-2 hover:bg-slate-800 rounded-lg text-slate-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                    Full Stack Developer & Designer
                    </span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 leading-tight">
                    Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Gyan Daniel Nana Yaw</span>
                  </h1>
                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    I transform ideas into stunning, functional digital products. With 2+ years of experience in full-stack development, I create solutions that are beautiful, performant, and user-focused.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all inline-flex items-center justify-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/projects" className="px-8 py-3 border-2 border-blue-500 text-blue-400 rounded-lg font-semibold hover:bg-blue-500/10 transition-colors inline-flex items-center justify-center">
                    View My Work
                  </Link>
                </div>
                <div className="flex gap-4 pt-4">
                  <a href="https://github.com/gyan277" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800 transition-all text-slate-300">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/daniel-gyan9a068b346" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800 transition-all text-slate-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="mailto:gyandaniel599@gmail.com" className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500 hover:text-blue-400 hover:bg-slate-800 transition-all text-slate-300">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-3xl"></div>
                <div className="relative">
                  {/* Profile Image */}
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    {/* Image */}
                    <img 
                      src="/profile.jpg" 
                      alt="Gyan Daniel Nana Yaw" 
                      className="relative w-full h-full object-cover rounded-2xl border-2 border-blue-500/40 shadow-2xl shadow-blue-500/30"
                    />
                    
                    {/* Decorative glowing elements */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl opacity-30 blur-2xl"></div>
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-30 blur-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm border-y border-slate-700/50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-300 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
