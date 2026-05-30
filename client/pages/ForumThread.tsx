import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Send, MoreVertical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MOCK_POSTS: Record<string, any> = {
  '1': {
    id: '1',
    title: 'How will the new NHIS changes affect rural communities?',
    content: 'I live in a rural area and I am concerned about whether the new NHIS changes will actually reach us. The nearest hospital is 40km away. Has anyone looked into how the implementation will work for remote areas?',
    author: 'Abena Mensah',
    initials: 'AM',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80',
    time: '2h ago',
    category: 'Health',
    categoryBg: 'bg-blue-50',
    categoryColor: 'text-blue-600',
    bannerImg: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=480&q=80',
    likes: 42,
  },
  '2': {
    id: '2',
    title: 'Free SHS is good but we need more teachers',
    content: 'The policy is great but implementation is the challenge. Our school has 3 teachers for 400 students. Quality over quantity matters. What are your thoughts on how we can solve the teacher shortage?',
    author: 'Kofi Asante',
    initials: 'KA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    time: '5h ago',
    category: 'Education',
    categoryBg: 'bg-green-50',
    categoryColor: 'text-green-600',
    bannerImg: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&q=80',
    likes: 128,
  },
};

const MOCK_REPLIES: Record<string, any[]> = {
  '1': [
    { id: 'r1', author: 'Kwame Boateng', initials: 'KB', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', content: 'This is a very valid concern. I think the government needs to set up mobile health units for rural areas.', time: '1h ago', likes: 12, liked: false },
    { id: 'r2', author: 'Ama Serwaa', initials: 'AS', avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=80&q=80', content: 'The NHIA has mentioned telemedicine as part of the rollout. But we need better internet first!', time: '45m ago', likes: 8, liked: false },
    { id: 'r3', author: 'Yaw Mensah', initials: 'YM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', content: 'I work at a district hospital. We have not received any new guidelines yet. The communication from the ministry is poor.', time: '20m ago', likes: 24, liked: false },
  ],
  '2': [
    { id: 'r1', author: 'Efua Asante', initials: 'EA', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80', content: 'Exactly! My daughter\'s school has 2 science teachers for 600 students. This is not sustainable.', time: '4h ago', likes: 31, liked: false },
    { id: 'r2', author: 'Nana Osei', initials: 'NO', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', content: 'The government should fast-track teacher training colleges and increase salaries to attract more people into teaching.', time: '3h ago', likes: 45, liked: false },
  ],
};

export default function ForumThread() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const post = MOCK_POSTS[id || '1'] || MOCK_POSTS['1'];
  const [replies, setReplies] = useState(MOCK_REPLIES[id || '1'] || []);
  const [message, setMessage] = useState('');
  const [postLiked, setPostLiked] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [replies]);

  const sendReply = () => {
    if (!message.trim()) return;
    const newReply = {
      id: `r${Date.now()}`,
      author: profile?.full_name || 'You',
      initials: (profile?.full_name || 'Y')[0],
      avatar: null,
      content: message.trim(),
      time: 'Just now',
      likes: 0,
      liked: false,
      isOwn: true,
    };
    setReplies(prev => [...prev, newReply]);
    setMessage('');
  };

  const toggleReplyLike = (replyId: string) => {
    setReplies(prev => prev.map(r =>
      r.id === replyId ? { ...r, liked: !r.liked, likes: r.liked ? r.likes - 1 : r.likes + 1 } : r
    ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Banner Header */}
      <div className="relative">
        <img
          src={post.bannerImg}
          alt={post.category}
          className="w-full h-44 object-cover"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=480&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Kente stripe */}
        <div className="absolute top-0 left-0 right-0 flex h-1.5">
          {['bg-red-600','bg-yellow-400','bg-green-400','bg-black','bg-red-600','bg-yellow-400','bg-green-400','bg-black'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>

        <button className="absolute top-6 right-4 w-9 h-9 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
          <MoreVertical className="w-4 h-4 text-white" />
        </button>

        {/* Category */}
        <div className="absolute bottom-3 left-4">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${post.categoryBg} ${post.categoryColor}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Original Post */}
      <div className="bg-white mx-4 -mt-3 rounded-3xl p-4 card-shadow relative z-10 mb-3">
        <div className="flex items-center gap-2.5 mb-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-9 h-9 rounded-xl object-cover"
            onError={e => { (e.target as HTMLImageElement).src = ''; }}
          />
          <div>
            <p className="text-sm font-bold text-gray-900">{post.author}</p>
            <p className="text-[10px] text-gray-400">{post.time}</p>
          </div>
          <button
            onClick={() => setPostLiked(!postLiked)}
            className={`ml-auto flex items-center gap-1 text-xs font-semibold ${postLiked ? 'text-red-500' : 'text-gray-300'}`}
          >
            <Heart className={`w-4 h-4 ${postLiked ? 'fill-current' : ''}`} />
            {post.likes + (postLiked ? 1 : 0)}
          </button>
        </div>
        <h2 className="font-bold text-gray-900 text-base leading-snug mb-2">{post.title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{post.content}</p>
      </div>

      {/* Replies count */}
      <div className="px-4 mb-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
        </p>
      </div>

      {/* Replies */}
      <div className="flex-1 px-4 space-y-3 pb-28">
        {replies.map(reply => (
          <div
            key={reply.id}
            className={`flex gap-2.5 ${reply.isOwn ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            {reply.avatar ? (
              <img
                src={reply.avatar}
                alt={reply.author}
                className="w-8 h-8 rounded-xl object-cover flex-shrink-0 mt-1"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            ) : (
              <div className="w-8 h-8 ghana-gradient rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">{reply.initials}</span>
              </div>
            )}

            {/* Bubble */}
            <div className={`max-w-[75%] ${reply.isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              {!reply.isOwn && (
                <p className="text-[10px] font-bold text-gray-500 px-1">{reply.author}</p>
              )}
              <div className={`rounded-2xl px-3.5 py-2.5 ${
                reply.isOwn
                  ? 'bg-green-700 text-white rounded-tr-sm'
                  : 'bg-white text-gray-800 rounded-tl-sm card-shadow'
              }`}>
                <p className="text-sm leading-relaxed">{reply.content}</p>
              </div>
              <div className={`flex items-center gap-2 px-1 ${reply.isOwn ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] text-gray-400">{reply.time}</span>
                {!reply.isOwn && (
                  <button
                    onClick={() => toggleReplyLike(reply.id)}
                    className={`flex items-center gap-1 text-[10px] font-semibold ${reply.liked ? 'text-red-500' : 'text-gray-300'}`}
                  >
                    <Heart className={`w-3 h-3 ${reply.liked ? 'fill-current' : ''}`} />
                    {reply.likes}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 px-4 py-3 safe-bottom">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 ghana-gradient rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {(profile?.full_name || 'Y')[0]}
            </span>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-2xl px-3 py-2 border border-gray-100">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendReply()}
              placeholder="Share your thoughts..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-300 focus:outline-none"
            />
            <button
              onClick={sendReply}
              disabled={!message.trim()}
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                message.trim() ? 'ghana-gradient shadow-md shadow-green-700/20' : 'bg-gray-100'
              }`}
            >
              <Send className={`w-3.5 h-3.5 ${message.trim() ? 'text-white' : 'text-gray-300'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
