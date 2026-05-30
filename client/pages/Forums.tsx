import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import NewPostModal from '../components/NewPostModal';
import { MessageSquare, Heart, ChevronRight, Plus, Globe, MapPin, Search, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const POSTS = [
  {
    id: '1',
    title: 'How will the new NHIS changes affect rural communities?',
    content: 'I live in a rural area and I am concerned about whether the new NHIS changes will actually reach us. The nearest hospital is 40km away...',
    author: 'Abena Mensah',
    initials: 'AM',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80',
    district: 'Kwabre East',
    region: 'Ashanti',
    is_national: false,
    likes: 42,
    replies_count: 18,
    time: '2h ago',
    category: 'Health',
    categoryColor: 'text-blue-600',
    categoryBg: 'bg-blue-50',
    bannerImg: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
  },
  {
    id: '2',
    title: 'Free SHS is good but we need more teachers',
    content: 'The policy is great but implementation is the challenge. Our school has 3 teachers for 400 students. Quality over quantity matters...',
    author: 'Kofi Asante',
    initials: 'KA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    district: null,
    region: 'National',
    is_national: true,
    likes: 128,
    replies_count: 56,
    time: '5h ago',
    category: 'Education',
    categoryColor: 'text-green-600',
    categoryBg: 'bg-green-50',
    bannerImg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
  },
  {
    id: '3',
    title: 'Road levy will hurt transport operators',
    content: 'As a trotro driver, this new levy will increase our fuel costs significantly. Who will compensate us? We already struggle...',
    author: 'Yaw Darko',
    initials: 'YD',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    district: 'Accra Metropolitan',
    region: 'Greater Accra',
    is_national: false,
    likes: 89,
    replies_count: 34,
    time: '1d ago',
    category: 'Infrastructure',
    categoryColor: 'text-orange-600',
    categoryBg: 'bg-orange-50',
    bannerImg: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80',
  },
  {
    id: '4',
    title: 'Agricultural fund should prioritize women farmers',
    content: 'Women make up 60% of Ghana\'s farmers but receive less than 10% of agricultural support. This must change now...',
    author: 'Akosua Boateng',
    initials: 'AB',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=80&q=80',
    district: null,
    region: 'National',
    is_national: true,
    likes: 203,
    replies_count: 71,
    time: '2d ago',
    category: 'Agriculture',
    categoryColor: 'text-emerald-600',
    categoryBg: 'bg-emerald-50',
    bannerImg: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80',
  },
];

export default function Forums() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'national' | 'district'>('national');
  const [search, setSearch] = useState('');
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState(POSTS);

  const filtered = posts.filter(p => {
    const matchTab = tab === 'national' ? p.is_national : !p.is_national;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleNewPost = (post: any) => {
    setPosts(prev => [post, ...prev]);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="relative overflow-hidden rounded-b-3xl">
        {/* Background image - Ghanaian community */}
        <img
          src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=480&q=80"
          alt="Community"
          className="w-full h-52 object-cover"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=480&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/60 to-green-900/90" />

        {/* Kente stripe at top */}
        <div className="absolute top-0 left-0 right-0 flex h-1.5">
          {['bg-red-600','bg-yellow-400','bg-green-400','bg-black','bg-red-600','bg-yellow-400','bg-green-400','bg-black'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>

        <div className="absolute inset-0 px-5 pt-8 pb-5 flex flex-col justify-between">
          <div>
            <h1 className="text-white font-bold text-2xl mb-1">Forums</h1>
            <p className="text-white/70 text-xs">Discuss policies with fellow citizens</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 -mt-3">
        <button
          onClick={() => setTab('national')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all ${
            tab === 'national'
              ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
              : 'bg-white text-gray-400 border border-gray-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          National
        </button>
        <button
          onClick={() => setTab('district')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold transition-all ${
            tab === 'district'
              ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
              : 'bg-white text-gray-400 border border-gray-100'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          {profile?.district || 'My District'}
        </button>
      </div>

      {/* Trending badge */}
      <div className="px-4 mb-2 flex items-center gap-2">
        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
        <span className="text-xs text-gray-400 font-medium">{filtered.length} active discussions</span>
      </div>

      {/* Posts */}
      <div className="px-4 space-y-3 pb-4">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-gray-200" />
            </div>
            <p className="text-gray-400 text-sm font-semibold">No discussions yet</p>
            <p className="text-gray-300 text-xs mt-1">Be the first to start a conversation</p>
          </div>
        )}
        {filtered.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden card-shadow border border-gray-50 active:scale-[0.98] transition-transform cursor-pointer"
            onClick={() => navigate(`/forums/${post.id}`)}
          >
            {/* Banner Image */}
            <div className="relative h-24 overflow-hidden">
              <img
                src={post.bannerImg}
                alt={post.category}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className={`absolute top-2 right-2 text-[10px] font-bold px-2.5 py-1 rounded-full ${post.categoryBg} ${post.categoryColor}`}>
                {post.category}
              </span>
            </div>

            <div className="p-4">
              {/* Author */}
              <div className="flex items-center gap-2.5 mb-3">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-8 h-8 rounded-xl object-cover flex-shrink-0"
                  onError={e => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    el.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-8 h-8 ghana-gradient rounded-xl hidden flex-shrink-0 items-center justify-center">
                  <span className="text-white text-xs font-bold">{post.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">{post.author}</p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    {post.is_national
                      ? <><Globe className="w-2.5 h-2.5" /> National</>
                      : <><MapPin className="w-2.5 h-2.5" /> {post.district}</>
                    }
                    <span className="text-gray-200">·</span>
                    {post.time}
                  </p>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">{post.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">{post.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2.5 border-t border-gray-50">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                    liked.has(post.id) ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-current' : ''}`} />
                  {post.likes + (liked.has(post.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-green-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  {post.replies_count}
                </button>
                <button className="ml-auto flex items-center gap-1 text-xs text-green-700 font-bold">
                  Read more <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowNewPost(true)}
        className="fixed bottom-24 right-4 w-14 h-14 ghana-gradient rounded-2xl flex items-center justify-center shadow-xl shadow-green-800/30 z-40 active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* New Post Modal */}
      {showNewPost && (
        <NewPostModal
          onClose={() => setShowNewPost(false)}
          onPost={handleNewPost}
        />
      )}
    </Layout>
  );
}
