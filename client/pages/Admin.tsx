import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, FileText, Users, MessageSquare,
  Settings, LogOut, Plus, Search, ChevronRight,
  TrendingUp, Eye, Trash2, Edit, CheckCircle,
  XCircle, Clock, BarChart3, Bell, Shield, X, Send
} from 'lucide-react';

const STATS = [
  { label: 'Total Policies', value: '24', change: '+3 this week', icon: FileText, color: 'text-green-700', bg: 'bg-green-50' },
  { label: 'Total Users', value: '8,241', change: '+142 today', icon: Users, color: 'text-blue-700', bg: 'bg-blue-50' },
  { label: 'Votes Cast', value: '124.5K', change: '+2.1K today', icon: TrendingUp, color: 'text-purple-700', bg: 'bg-purple-50' },
  { label: 'Forum Posts', value: '386', change: '+18 today', icon: MessageSquare, color: 'text-amber-700', bg: 'bg-amber-50' },
];

const POLICIES = [
  { id: '1', title: 'National Health Insurance Amendment Act', category: 'Health', status: 'active', votes: 10190, date: 'May 20, 2025' },
  { id: '2', title: 'Free SHS Extension Policy 2025', category: 'Education', status: 'active', votes: 14010, date: 'May 18, 2025' },
  { id: '3', title: 'Road Infrastructure Levy Bill', category: 'Infrastructure', status: 'active', votes: 12100, date: 'May 15, 2025' },
  { id: '4', title: 'Agricultural Modernization Fund', category: 'Agriculture', status: 'active', votes: 10200, date: 'May 10, 2025' },
  { id: '5', title: 'Digital Ghana Initiative 2025', category: 'Technology', status: 'draft', votes: 0, date: 'May 25, 2025' },
];

const USERS = [
  { id: '1', name: 'Kwame Mensah', email: 'kwame@example.com', role: 'citizen', region: 'Ashanti', verified: true, joined: 'May 1, 2025' },
  { id: '2', name: 'Abena Serwaa', email: 'abena@example.com', role: 'assembly', region: 'Greater Accra', verified: true, joined: 'Apr 28, 2025' },
  { id: '3', name: 'Yaw Darko', email: 'yaw@example.com', role: 'citizen', region: 'Western', verified: false, joined: 'May 5, 2025' },
  { id: '4', name: 'Ama Boateng', email: 'ama@example.com', role: 'minister', region: 'Eastern', verified: true, joined: 'Mar 15, 2025' },
];

const CATEGORIES = ['Health', 'Education', 'Infrastructure', 'Agriculture', 'Finance', 'Security', 'Technology', 'General'];

const statusColor: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  draft: 'bg-yellow-100 text-yellow-700',
  passed: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
};

const roleColor: Record<string, string> = {
  citizen: 'bg-gray-100 text-gray-600',
  assembly: 'bg-blue-100 text-blue-700',
  minister: 'bg-purple-100 text-purple-700',
};

export default function Admin() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'policies' | 'users' | 'forums' | 'settings'>('dashboard');
  const [showNewPolicy, setShowNewPolicy] = useState(false);
  const [search, setSearch] = useState('');
  const [policies, setPolicies] = useState(POLICIES);
  const [newPolicy, setNewPolicy] = useState({
    title: '', category: 'Health', summary: '', full_text: '',
    region: 'National', status: 'draft', expires_days: '30',
  });

  const handleSignOut = async () => { await signOut(); navigate('/login'); };

  const handlePublishPolicy = () => {
    if (!newPolicy.title || !newPolicy.summary) return;
    setPolicies(prev => [{
      id: `p${Date.now()}`, title: newPolicy.title, category: newPolicy.category,
      status: newPolicy.status, votes: 0, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }, ...prev]);
    setNewPolicy({ title: '', category: 'Health', summary: '', full_text: '', region: 'National', status: 'draft', expires_days: '30' });
    setShowNewPolicy(false);
  };

  const deletePolicy = (id: string) => setPolicies(prev => prev.filter(p => p.id !== id));
  const toggleStatus = (id: string) => setPolicies(prev => prev.map(p =>
    p.id === id ? { ...p, status: p.status === 'active' ? 'draft' : 'active' } : p
  ));

  const filteredPolicies = policies.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'policies', icon: FileText, label: 'Policies' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'forums', icon: MessageSquare, label: 'Forums' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 max-w-[480px] mx-auto overflow-hidden">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-100 flex flex-col items-center py-4 gap-1 flex-shrink-0 shadow-sm">
        {/* Logo */}
        <div className="w-10 h-10 ghana-gradient rounded-xl flex items-center justify-center mb-3">
          <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" onError={e => { (e.target as HTMLImageElement).style.display='none'; }} />
        </div>
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              activeTab === id ? 'ghana-gradient text-white shadow-md shadow-green-700/20' : 'text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
        <div className="flex-1" />
        <button onClick={handleSignOut} className="w-10 h-10 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-50">
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="font-bold text-gray-900 text-sm capitalize">{activeTab}</h1>
            <p className="text-[10px] text-gray-400">Admin Panel</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center">
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 ghana-gradient rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold">{(profile?.full_name || 'A')[0]}</span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="p-4 space-y-4">
              {/* Kente stripe */}
              <div className="flex h-1.5 rounded-full overflow-hidden">
                {['bg-red-600','bg-yellow-400','bg-green-600','bg-black','bg-red-600','bg-yellow-400','bg-green-600','bg-black'].map((c,i) => (
                  <div key={i} className={`flex-1 ${c}`} />
                ))}
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map(({ label, value, change, icon: Icon, color, bg }) => (
                  <div key={label} className="bg-white rounded-2xl p-3 card-shadow">
                    <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center mb-2`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{label}</p>
                    <p className="text-[10px] text-green-600 font-semibold mt-0.5">{change}</p>
                  </div>
                ))}
              </div>
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Quick Actions</p>
                <div className="space-y-2">
                  {[
                    { label: 'Upload New Policy', icon: Plus, action: () => { setActiveTab('policies'); setShowNewPolicy(true); }, color: 'bg-green-50 text-green-700' },
                    { label: 'View All Users', icon: Users, action: () => setActiveTab('users'), color: 'bg-blue-50 text-blue-700' },
                    { label: 'Moderate Forums', icon: MessageSquare, action: () => setActiveTab('forums'), color: 'bg-purple-50 text-purple-700' },
                    { label: 'System Settings', icon: Settings, action: () => setActiveTab('settings'), color: 'bg-gray-50 text-gray-700' },
                  ].map(({ label, icon: Icon, action, color }) => (
                    <button key={label} onClick={action} className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Recent Activity</p>
                <div className="space-y-3">
                  {[
                    { text: 'New user registered from Ashanti', time: '2m ago', icon: Users, color: 'text-blue-500' },
                    { text: '142 votes on Health Insurance Bill', time: '15m ago', icon: TrendingUp, color: 'text-green-500' },
                    { text: 'New forum post in Education', time: '1h ago', icon: MessageSquare, color: 'text-purple-500' },
                    { text: 'Policy draft saved by Minister Ama', time: '2h ago', icon: FileText, color: 'text-amber-500' },
                  ].map(({ text, time, icon: Icon, color }, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className={`w-7 h-7 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-700 leading-snug">{text}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* POLICIES TAB */}
          {activeTab === 'policies' && (
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search policies..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-green-500" />
                </div>
                <button onClick={() => setShowNewPolicy(true)} className="ghana-gradient text-white px-3 py-2.5 rounded-xl flex items-center gap-1.5 text-xs font-bold shadow-md shadow-green-700/20">
                  <Plus className="w-3.5 h-3.5" /> New
                </button>
              </div>
              <div className="space-y-2">
                {filteredPolicies.map(policy => (
                  <div key={policy.id} className="bg-white rounded-2xl p-3.5 card-shadow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-xs font-bold text-gray-800 leading-snug flex-1">{policy.title}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusColor[policy.status]}`}>{policy.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-3">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-full font-medium text-gray-600">{policy.category}</span>
                      <span>{policy.votes.toLocaleString()} votes</span>
                      <span>{policy.date}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                      <button onClick={() => toggleStatus(policy.id)} className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl ${policy.status === 'active' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                        {policy.status === 'active' ? <><Clock className="w-3 h-3" /> Unpublish</> : <><CheckCircle className="w-3 h-3" /> Publish</>}
                      </button>
                      <button className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700">
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button onClick={() => deletePolicy(policy.id)} className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-red-50 text-red-600 ml-auto">
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input placeholder="Search users..." className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-green-500" />
              </div>
              <div className="space-y-2">
                {USERS.map(user => (
                  <div key={user.id} className="bg-white rounded-2xl p-3.5 card-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 ghana-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">{user.name[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-gray-800 truncate">{user.name}</p>
                          {user.verified && <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${roleColor[user.role]}`}>{user.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-2.5">
                      <span>{user.region}</span>
                      <span>·</span>
                      <span>Joined {user.joined}</span>
                    </div>
                    <div className="flex gap-2 pt-2 border-t border-gray-50">
                      <button className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-xl bg-blue-50 text-blue-700">
                        <Eye className="w-3 h-3" /> View
                      </button>
                      {!user.verified && (
                        <button className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-xl bg-green-50 text-green-700">
                          <Shield className="w-3 h-3" /> Verify
                        </button>
                      )}
                      <button className="flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-xl bg-red-50 text-red-600">
                        <XCircle className="w-3 h-3" /> Ban
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FORUMS TAB */}
          {activeTab === 'forums' && (
            <div className="p-4 space-y-3">
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Forum Overview</p>
                <div className="grid grid-cols-3 gap-2">
                  {[{ label: 'Total Posts', value: '386', color: 'text-green-700' }, { label: 'Reported', value: '4', color: 'text-red-600' }, { label: 'Pending', value: '12', color: 'text-amber-600' }].map(s => (
                    <div key={s.label} className="text-center bg-gray-50 rounded-xl py-3">
                      <p className={`font-bold text-lg ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Reported Posts</p>
              {[
                { title: 'Misleading info about NHIS', author: 'Unknown User', reports: 3 },
                { title: 'Spam post in Education forum', author: 'Bot Account', reports: 7 },
              ].map((post, i) => (
                <div key={i} className="bg-white rounded-2xl p-3.5 card-shadow border-l-4 border-red-400">
                  <p className="text-xs font-bold text-gray-800 mb-1">{post.title}</p>
                  <p className="text-[10px] text-gray-400 mb-3">By {post.author} · {post.reports} reports</p>
                  <div className="flex gap-2">
                    <button className="flex-1 text-[10px] font-bold py-1.5 rounded-xl bg-red-50 text-red-600">Remove Post</button>
                    <button className="flex-1 text-[10px] font-bold py-1.5 rounded-xl bg-gray-50 text-gray-600">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="p-4 space-y-3">
              <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-2">Platform</p>
                {[
                  { label: 'Platform Name', value: 'Dodow Amanmuo' },
                  { label: 'Default Language', value: 'English' },
                  { label: 'Vote Expiry (days)', value: '30' },
                  { label: 'Max File Size (MB)', value: '10' },
                ].map(({ label, value }, i, arr) => (
                  <div key={label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                    <span className="text-xs text-gray-400 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-2">AI Settings</p>
                {[
                  { label: 'Claude AI', value: 'Connected' },
                  { label: 'Auto-translate', value: 'Enabled' },
                  { label: 'AI Moderation', value: 'Enabled' },
                ].map(({ label, value }, i, arr) => (
                  <div key={label} className={`flex items-center justify-between px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                    <span className="text-xs font-medium text-gray-700">{label}</span>
                    <span className="text-xs text-green-600 font-bold">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-4 card-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Broadcast Notification</p>
                <textarea placeholder="Send a message to all users..." rows={3} className="w-full px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:border-green-500 resize-none mb-2" />
                <button className="w-full py-2.5 ghana-gradient text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Send to All Users
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NEW POLICY MODAL */}
      {showNewPolicy && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNewPolicy(false)} />
          <div className="relative w-full max-w-[480px] bg-white rounded-t-3xl animate-slide-up max-h-[90vh] flex flex-col">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <h2 className="font-bold text-gray-900">Upload Policy</h2>
              <button onClick={() => setShowNewPolicy(false)} className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Policy Title *</label>
                <input value={newPolicy.title} onChange={e => setNewPolicy(p => ({ ...p, title: e.target.value }))} placeholder="e.g. National Water Policy 2025" className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500 transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Category</label>
                  <select value={newPolicy.category} onChange={e => setNewPolicy(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500 appearance-none">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Status</label>
                  <select value={newPolicy.status} onChange={e => setNewPolicy(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500 appearance-none">
                    <option value="draft">Draft</option>
                    <option value="active">Publish Now</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Summary (shown to citizens) *</label>
                <textarea value={newPolicy.summary} onChange={e => setNewPolicy(p => ({ ...p, summary: e.target.value }))} placeholder="Brief summary of the policy..." rows={3} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500 resize-none transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Full Policy Text</label>
                <textarea value={newPolicy.full_text} onChange={e => setNewPolicy(p => ({ ...p, full_text: e.target.value }))} placeholder="Paste the full policy document here..." rows={6} className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500 resize-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Region</label>
                  <select value={newPolicy.region} onChange={e => setNewPolicy(p => ({ ...p, region: e.target.value }))} className="w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500 appearance-none">
                    <option>National</option>
                    <option>Greater Accra</option>
                    <option>Ashanti</option>
                    <option>Western</option>
                    <option>Eastern</option>
                    <option>Central</option>
                    <option>Volta</option>
                    <option>Northern</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Expires (days)</label>
                  <input type="number" value={newPolicy.expires_days} onChange={e => setNewPolicy(p => ({ ...p, expires_days: e.target.value }))} className="w-full px-3 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-green-500" />
                </div>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-gray-50">
              <button onClick={handlePublishPolicy} disabled={!newPolicy.title || !newPolicy.summary} className="w-full py-4 ghana-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-green-800/20">
                <BarChart3 className="w-4 h-4" />
                {newPolicy.status === 'active' ? 'Publish Policy' : 'Save as Draft'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
