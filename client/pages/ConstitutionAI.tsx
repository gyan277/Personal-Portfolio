import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sparkles, BookOpen, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

const SUGGESTED = [
  "What are my rights as a Ghanaian citizen?",
  "How is the President elected in Ghana?",
  "What does Chapter 5 of the Constitution say?",
  "Can the government take my land?",
  "What is the role of Parliament?",
  "How can I report a human rights violation?",
];

export default function ConstitutionAI() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I am your Ghana Constitution Assistant, powered by Claude AI.\n\nI can help you understand:\n• Your rights as a citizen\n• How government works\n• Constitutional provisions\n• Civic duties and freedoms\n\nAsk me anything about the 1992 Constitution of Ghana!",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: 'user', content: text.trim() };
    const loadingMsg: Message = { id: `a${Date.now()}`, role: 'assistant', content: '', loading: true };
    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/constitution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text.trim() }),
      });
      const data = await response.json();
      setMessages(prev => prev.map(m =>
        m.id === loadingMsg.id ? { ...m, content: data.answer, loading: false } : m
      ));
    } catch {
      setMessages(prev => prev.map(m =>
        m.id === loadingMsg.id ? { ...m, content: "Sorry, I couldn't connect. Please try again.", loading: false } : m
      ));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=480&q=80"
          alt="Ghana Parliament"
          className="w-full h-36 object-cover"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=480&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 to-green-900/95" />

        {/* Kente stripe */}
        <div className="absolute top-0 left-0 right-0 flex h-1.5">
          {['bg-red-600','bg-yellow-400','bg-green-400','bg-black','bg-red-600','bg-yellow-400','bg-green-400','bg-black'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>

        <div className="absolute inset-0 px-4 flex flex-col justify-between py-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-black/30 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 self-start">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base">Constitution Assistant</h1>
              <p className="text-white/60 text-xs">Powered by Claude AI · Ghana 1992 Constitution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 ghana-gradient rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-green-700/20">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            )}

            {/* Bubble */}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-green-700 text-white rounded-tr-sm'
                  : 'bg-white text-gray-800 rounded-tl-sm card-shadow border border-gray-50'
              }`}>
                {msg.loading ? (
                  <div className="flex items-center gap-1.5 py-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                )}
              </div>
              {msg.role === 'assistant' && !msg.loading && (
                <p className="text-[10px] text-gray-400 px-1">Claude AI · Ghana Constitution</p>
              )}
            </div>
          </div>
        ))}

        {/* Suggested questions - show only at start */}
        {messages.length === 1 && (
          <div className="space-y-2 mt-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Suggested Questions</p>
            {SUGGESTED.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full flex items-center gap-2 bg-white rounded-2xl px-3.5 py-2.5 card-shadow border border-gray-50 text-left active:scale-[0.98] transition-transform"
              >
                <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ChevronRight className="w-3.5 h-3.5 text-green-600" />
                </div>
                <p className="text-xs text-gray-700 font-medium">{q}</p>
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-3 safe-bottom">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-2xl px-3.5 py-2.5 border-2 border-transparent focus-within:border-green-500 transition-all">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about the Ghana Constitution..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-300 focus:outline-none"
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all ${
              input.trim() && !loading
                ? 'ghana-gradient shadow-lg shadow-green-700/20 active:scale-95'
                : 'bg-gray-100'
            }`}
          >
            <Send className={`w-4 h-4 ${input.trim() && !loading ? 'text-white' : 'text-gray-300'}`} />
          </button>
        </div>
        <p className="text-[10px] text-gray-300 text-center mt-2">AI responses are for educational purposes only</p>
      </div>
    </div>
  );
}
