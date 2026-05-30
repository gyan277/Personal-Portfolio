import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, ChevronRight, Bell, Globe, Lock, HelpCircle, Star, CheckCircle, Edit3, Scale, Building2, UserCheck, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import VerificationModal from '../components/VerificationModal';

export default function Profile() {
  const { profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showVerify, setShowVerify] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const MENU_SECTIONS = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', sub: 'Manage alerts & reminders', color: 'bg-blue-50 text-blue-600' },
        { icon: Globe, label: 'Language', sub: 'English (Default)', color: 'bg-purple-50 text-purple-600' },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: Lock, label: 'Privacy & Security', sub: 'Manage your data', color: 'bg-green-50 text-green-600' },
        { icon: HelpCircle, label: 'Help & Support', sub: 'FAQs and contact us', color: 'bg-amber-50 text-amber-600' },
        { icon: Star, label: 'Rate the App', sub: 'Share your feedback', color: 'bg-red-50 text-red-500' },
      ],
    },
  ];

  const roleConfig = {
    minister: { Icon: Scale, label: 'Minister', bg: 'bg-purple-100', text: 'text-purple-700' },
    assembly: { Icon: Building2, label: 'Assembly Member', bg: 'bg-blue-100', text: 'text-blue-700' },
    citizen: { Icon: UserCheck, label: 'Citizen', bg: 'bg-green-100', text: 'text-green-700' },
  };
  const role = roleConfig[profile?.role || 'citizen'];
  const RoleIcon = role.Icon;

  return (
    <Layout>
      {/* Header */}
      <div className="ghana-gradient px-5 pt-5 pb-12 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <h1 className="text-white font-bold text-2xl relative z-10">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="mx-4 -mt-8 relative z-10 mb-4">
        <div className="bg-white rounded-3xl p-5 card-shadow border border-gray-50">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 ghana-gradient rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-green-800/20">
                {profile?.full_name?.[0] || 'C'}
              </div>
              {profile?.ghana_card_verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 text-base leading-tight">{profile?.full_name || 'Citizen'}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{profile?.region || 'Ghana'}</p>
                </div>
                <button className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
                  <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${role.bg} ${role.text}`}>
                  <RoleIcon className="w-3 h-3" />
                  {role.label}
                </span>
                {!profile?.ghana_card_verified && (
                  <button
                    onClick={() => setShowVerify(true)}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 flex items-center gap-1"
                  >
                    <Shield className="w-2.5 h-2.5" />
                    Verify ID
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-50">
            {[
              { label: 'Votes Cast', value: profile?.votes_cast || 0, color: 'text-green-700' },
              { label: 'Posts', value: profile?.posts_count || 0, color: 'text-blue-700' },
              { label: 'Impact', value: 'High', color: 'text-amber-600' },
            ].map(({ label, value, color }) => (
              <div key={label} className="text-center bg-gray-50 rounded-2xl py-3">
                <p className={`font-bold text-base ${color}`}>{value}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      {MENU_SECTIONS.map(section => (
        <div key={section.title} className="mx-4 mb-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{section.title}</p>
          <div className="bg-white rounded-3xl card-shadow border border-gray-50 overflow-hidden">
            {section.items.map(({ icon: Icon, label, sub, color }, i) => (
              <button
                key={label}
                className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                  i < section.items.length - 1 ? 'border-b border-gray-50' : ''
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-200" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Admin Panel Button - only for minister/assembly */}
      {(profile?.role === 'minister' || profile?.role === 'assembly') && (
        <div className="mx-4 mb-3">
          <Link
            to="/admin"
            className="w-full flex items-center gap-3 py-4 px-4 ghana-gradient text-white font-bold rounded-3xl shadow-lg shadow-green-800/20 active:scale-[0.98] transition-transform"
          >
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Admin Dashboard</p>
              <p className="text-white/70 text-xs">Manage policies, users & more</p>
            </div>
            <ChevronRight className="w-4 h-4 text-white/60" />
          </Link>
        </div>
      )}

      {/* Sign Out */}
      <div className="mx-4 mb-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 font-bold rounded-3xl text-sm border border-red-100 active:scale-[0.98] transition-transform"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pb-6">
        <div className="flex gap-1 justify-center mb-2">
          <div className="h-1 w-6 bg-red-500 rounded-full" />
          <div className="h-1 w-6 bg-yellow-400 rounded-full" />
          <div className="h-1 w-6 bg-green-600 rounded-full" />
        </div>
        <p className="text-xs text-gray-300 font-medium">Dodow Amanmuo v1.0 · Made for Ghana</p>
      </div>

      {showVerify && (
        <VerificationModal
          onClose={() => setShowVerify(false)}
          onVerified={() => {
            setShowVerify(false);
            updateProfile({ ghana_card_verified: true });
          }}
        />
      )}
    </Layout>
  );
}
