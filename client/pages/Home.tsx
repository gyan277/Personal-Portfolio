import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import NewsSection from '../components/NewsSection';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, TrendingUp, Users, ChevronRight, Bell, Zap, CheckCircle, Scale, Building2, UserCheck, MapPin, ArrowRight } from 'lucide-react';

const METRICS = [
  { label: 'Active Policies', value: '24', icon: FileText, bg: 'bg-green-50', color: 'text-green-700', border: 'border-green-100' },
  { label: 'Votes Cast', value: '12.4K', icon: TrendingUp, bg: 'bg-blue-50', color: 'text-blue-700', border: 'border-blue-100' },
  { label: 'Discussions', value: '386', icon: MessageSquare, bg: 'bg-purple-50', color: 'text-purple-700', border: 'border-purple-100' },
  { label: 'Citizens', value: '8.2K', icon: Users, bg: 'bg-amber-50', color: 'text-amber-700', border: 'border-amber-100' },
];

const RECENT_POLICIES = [
  { id: '1', title: 'National Health Insurance Amendment', category: 'Health', votes: 10190, pct: 82, color: 'bg-blue-500' },
  { id: '2', title: 'Free SHS Extension Policy 2025', category: 'Education', votes: 14010, pct: 93, color: 'bg-green-500' },
  { id: '3', title: 'Road Infrastructure Levy Bill', category: 'Infrastructure', votes: 12100, pct: 35, color: 'bg-orange-500' },
];

const roleConfig = {
  minister: { Icon: Scale, label: 'Minister' },
  assembly: { Icon: Building2, label: 'Assembly Member' },
  citizen: { Icon: UserCheck, label: 'Citizen' },
};

// Ghanaian-themed banner cards
const BANNERS = [
  {
    id: 1,
    title: 'Parliament of Ghana',
    subtitle: 'Where your voice matters',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
    overlay: 'from-green-900/80 to-green-700/40',
  },
  {
    id: 2,
    title: 'Accra, Ghana',
    subtitle: 'Building a better nation together',
    img: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&q=80',
    overlay: 'from-slate-900/80 to-slate-700/40',
  },
  {
    id: 3,
    title: 'Civic Engagement',
    subtitle: 'Every vote shapes the future',
    img: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80',
    overlay: 'from-green-900/80 to-emerald-700/40',
  },
];

export default function Home() {
  const { profile } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const role = roleConfig[profile?.role || 'citizen'];
  const RoleIcon = role.Icon;

  return (
    <Layout>
      {/* Header */}
      <div className="ghana-gradient px-5 pt-5 pb-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Kente-inspired top stripe */}
        <div className="flex gap-0 mb-4 overflow-hidden rounded-full w-24 h-1.5">
          {['bg-red-500','bg-yellow-400','bg-green-400','bg-red-500','bg-yellow-400','bg-green-400'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-xs font-medium">{greeting}</p>
              <h1 className="text-white font-bold text-xl leading-tight">
                {profile?.full_name?.split(' ')[0] || 'Citizen'}
              </h1>
            </div>
            <button className="relative w-10 h-10 bg-white/15 rounded-2xl flex items-center justify-center border border-white/20">
              <Bell className="w-4 h-4 text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full border border-white" />
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20">
              <RoleIcon className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-semibold">{role.label}</span>
            </div>
            {profile?.region && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                <MapPin className="w-3 h-3 text-white/60" />
                <span className="text-white/70 text-xs">{profile.region}</span>
              </div>
            )}
            {profile?.ghana_card_verified && (
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30">
                <CheckCircle className="w-3 h-3 text-yellow-300" />
                <span className="text-yellow-200 text-xs font-semibold">Verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 px-4 -mt-4 relative z-10">
        {METRICS.map(({ label, value, icon: Icon, bg, color, border }) => (
          <div key={label} className={`bg-white rounded-2xl p-4 card-shadow border ${border}`}>
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Ghana Banner Carousel */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Featured</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
          {BANNERS.map(banner => (
            <div
              key={banner.id}
              className="flex-shrink-0 w-64 h-36 rounded-2xl overflow-hidden relative card-shadow"
            >
              <img
                src={banner.img}
                alt={banner.title}
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80';
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${banner.overlay}`} />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{banner.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{banner.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kente Pattern Divider */}
      <div className="mx-4 mt-5 rounded-2xl overflow-hidden h-8 flex">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 ${
              i % 4 === 0 ? 'bg-red-600' :
              i % 4 === 1 ? 'bg-yellow-400' :
              i % 4 === 2 ? 'bg-green-700' :
              'bg-black'
            }`}
          />
        ))}
      </div>

      {/* AI Feature Banner */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
          alt="AI"
          className="w-full h-24 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/70" />
        <div className="absolute inset-0 flex items-center gap-3 px-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-yellow-300" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">AI Translation Active</p>
            <p className="text-white/70 text-xs">Policies in 7 Ghanaian languages</p>
          </div>
          <Link to="/policies" className="bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1">
            Try <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quote */}
      <div className="mx-4 mt-4 relative overflow-hidden rounded-2xl ghana-gradient p-4">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="flex gap-0.5 mb-2">
            {['bg-red-500','bg-yellow-400','bg-green-400'].map((c, i) => (
              <div key={i} className={`h-1 w-6 rounded-full ${c}`} />
            ))}
          </div>
          <p className="text-white font-semibold text-sm leading-relaxed">
            "Democracy is not just about voting — it's about understanding what you're voting for."
          </p>
          <p className="text-white/50 text-xs mt-2 font-medium">— Dodow Amanmuo Platform</p>
        </div>
      </div>

      {/* Active Policies */}
      <div className="px-4 mt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">Active Policies</h3>
          <Link to="/policies" className="text-xs text-green-700 font-semibold flex items-center gap-0.5">
            See all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2.5">
          {RECENT_POLICIES.map(policy => (
            <Link
              key={policy.id}
              to={`/policies/${policy.id}`}
              className="flex items-center gap-3 bg-white rounded-2xl p-3.5 card-shadow border border-gray-50 active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-green-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{policy.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${policy.color} rounded-full`} style={{ width: `${policy.pct}%` }} />
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{policy.votes.toLocaleString()} votes</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-200 flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      <NewsSection />
    </Layout>
  );
}
