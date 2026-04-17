import { Link } from "react-router-dom";
import { Code2, Palette, Users, Award } from "lucide-react";

export default function About() {
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
              <Link to="/about" className="text-sm font-medium text-blue-400 transition-colors">
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
          </nav>
        </header>

        {/* About Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-4">
                  I'm Gyan Daniel Nana Yaw, A computer Engineering Student in Kwame Nkrumah University of Science and Technology, a passionate full-stack developer with a keen eye for design and a commitment to clean, maintainable code. I specialize in creating web applications that not only look great but also deliver exceptional user experiences.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Over the past 2 years, I've had the privilege of working with startups and established companies, helping them bring their visions to life through cutting-edge technology and thoughtful design.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex flex-col items-center text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                  <Code2 className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">Quality Code</h3>
                  <p className="text-sm text-slate-400">Maintainable, scalable, and well-documented code that stands the test of time.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                  <Palette className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">Beautiful Design</h3>
                  <p className="text-sm text-slate-400">Pixel-perfect interfaces that captivate users and drive engagement.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 hover:border-blue-500 transition-all">
                  <Users className="w-12 h-12 text-blue-400 mb-4" />
                  <h3 className="font-semibold text-white mb-2">User Focused</h3>
                  <p className="text-sm text-slate-400">Every decision is driven by what's best for the user and your business.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
