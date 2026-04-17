import { Link } from "react-router-dom";
import { ExternalLink, Smartphone, Globe, Home, Building2 } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "iOS Mobile App",
      description: "A fully functional iOS application built with modern technologies, delivering seamless user experience on Apple devices.",
      icon: Smartphone,
      status: "Completed",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
      tags: ["iOS", "Swift", "Mobile"],
      gradient: "from-purple-600 to-pink-600",
      url: "https://apps.apple.com/your-app", // Replace with your actual iOS app URL
    },
    {
      title: "Android Mobile App",
      description: "A fully functional Android application built with modern technologies, delivering seamless user experience on Android devices.",
      icon: Smartphone,
      status: "Completed",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
      tags: ["Android", "Mobile", "Cross-platform"],
      gradient: "from-green-600 to-teal-600",
      url: "https://play.google.com/store/apps/your-app", // Replace with your actual Android app URL
    },
    {
      title: "Website Project",
      description: "A responsive and modern website with clean design, optimized performance, and excellent user interface.",
      icon: Globe,
      status: "Completed",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      gradient: "from-blue-600 to-cyan-600",
      url: "https://careerghana.netlify.app",
    },
    {
      title: "Rental Management App",
      description: "An innovative rental management application streamlining property listings, bookings, and tenant management with real-time updates.",
      icon: Home,
      status: "In Progress",
      statusColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      tags: ["React", "Node.js", "Supabase"],
      gradient: "from-orange-600 to-red-600",
      url: "#", // Will be updated when project is live
    },
    {
      title: "Hostel Booking System",
      description: "A comprehensive hostel booking platform featuring room availability, online payments, and automated reservation management.",
      icon: Building2,
      status: "In Progress",
      statusColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      tags: ["Full Stack", "Payment Integration", "Real-time"],
      gradient: "from-teal-600 to-green-600",
      url: "#", // Will be updated when project is live
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
              Gyan Daniel
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
              <Link to="/projects" className="text-sm font-medium text-blue-400 transition-colors">
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

        {/* Projects Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">My Projects</h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                A showcase of my work including completed projects and ongoing developments. Each project represents my commitment to quality and innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map((project, idx) => {
                const IconComponent = project.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    {/* Project Header with Icon */}
                    <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{ 
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)'
                        }}></div>
                      </div>
                      <IconComponent className="w-12 h-12 text-white relative z-10" />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${project.statusColor}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4">
                      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 mb-3 leading-relaxed text-sm line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full font-medium border border-blue-500/30">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Project Button */}
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:border-blue-500/50 border border-slate-600 text-xs"
                      >
                        View Project
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <div className="inline-block bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Interested in working together?</h3>
                <p className="text-slate-400 mb-6">
                  I'm always open to discussing new projects and opportunities.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
