import { useState } from 'react';
import { X, Globe, MapPin, ChevronDown, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NewPostModalProps {
  onClose: () => void;
  onPost: (post: any) => void;
}

const CATEGORIES = ['Health', 'Education', 'Infrastructure', 'Agriculture', 'Finance', 'Security', 'General'];

export default function NewPostModal({ onClose, onPost }: NewPostModalProps) {
  const { profile } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [isNational, setIsNational] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    onPost({
      id: `new-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      author: profile?.full_name || 'You',
      initials: (profile?.full_name || 'Y')[0],
      avatar: null,
      district: profile?.district || null,
      region: profile?.region || 'National',
      is_national: isNational,
      likes: 0,
      replies_count: 0,
      time: 'Just now',
      category,
      categoryColor: 'text-green-600',
      categoryBg: 'bg-green-50',
      bannerImg: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80',
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[480px] bg-white rounded-t-3xl animate-slide-up max-h-[90vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 text-base">New Discussion</h2>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Author info */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3">
            <div className="w-10 h-10 ghana-gradient rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{(profile?.full_name || 'Y')[0]}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{profile?.full_name || 'You'}</p>
              <p className="text-xs text-gray-400">{profile?.region || 'Ghana'}</p>
            </div>
          </div>

          {/* Scope toggle */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Post to</label>
            <div className="flex gap-2">
              <button
                onClick={() => setIsNational(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold border-2 transition-all ${
                  isNational ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                National
              </button>
              <button
                onClick={() => setIsNational(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold border-2 transition-all ${
                  !isNational ? 'border-green-600 bg-green-50 text-green-700' : 'border-gray-100 text-gray-400'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {profile?.district || 'My District'}
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm text-gray-800 focus:outline-none focus:border-green-500 appearance-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Title</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What do you want to discuss?"
              maxLength={120}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-green-500 transition-all"
            />
            <p className="text-[10px] text-gray-300 text-right mt-1">{title.length}/120</p>
          </div>

          {/* Content */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Your thoughts</label>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Share your perspective on this topic..."
              rows={5}
              maxLength={1000}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-green-500 transition-all resize-none"
            />
            <p className="text-[10px] text-gray-300 text-right mt-1">{content.length}/1000</p>
          </div>
        </div>

        {/* Post Button */}
        <div className="px-5 py-4 border-t border-gray-50 safe-bottom">
          <button
            onClick={handlePost}
            disabled={!title.trim() || !content.trim() || loading}
            className="w-full py-4 ghana-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-all shadow-lg shadow-green-800/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Post Discussion
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
