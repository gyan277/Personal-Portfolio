import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, MessageSquare, User } from 'lucide-react';
import AnonymityBanner from './AnonymityBanner';

interface LayoutProps {
  children: ReactNode;
  showBanner?: boolean;
}

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/policies', icon: FileText, label: 'Policies' },
  { path: '/forums', icon: MessageSquare, label: 'Forums' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Layout({ children, showBanner = true }: LayoutProps) {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', background: '#f8faf8' }}>
      {showBanner && <AnonymityBanner />}

      {/* Scrollable Content */}
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Extra bottom padding so content doesn't hide behind nav */}
        <div className="pb-24">
          {children}
        </div>
      </main>

      {/* Bottom Navigation — always at bottom, never scrolls */}
      <nav
        style={{ flexShrink: 0 }}
        className="bg-white border-t border-gray-100 bottom-nav-shadow z-50"
      >
        <div className="flex items-center justify-around px-2 pt-2 pb-3">
          {navItems.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center gap-1 px-5 py-1 rounded-2xl transition-all ${
                  active ? 'text-green-700' : 'text-gray-300'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all ${active ? 'bg-green-50' : ''}`}>
                  <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                </div>
                <span className={`text-[10px] font-semibold ${active ? 'text-green-700' : 'text-gray-300'}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
