import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) { setError(error.message); setLoading(false); }
    else navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden ghana-gradient px-6 pt-14 pb-16">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=480&q=80"
          alt="Ghana"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute -bottom-16 -left-10 w-56 h-56 bg-white/5 rounded-full" />

        {/* Kente stripe */}
        <div className="flex gap-0 mb-8 w-20 overflow-hidden rounded-full h-2 relative z-10">
          {['bg-red-600','bg-yellow-400','bg-green-400','bg-red-600','bg-yellow-400','bg-green-400'].map((c, i) => (
            <div key={i} className={`flex-1 ${c}`} />
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center border border-white/20">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg tracking-tight">Dodow Amanmuo</h1>
              <p className="text-white/60 text-xs">Ghana Civic Platform</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
            Welcome back
          </h2>
          <p className="text-white/70 text-sm">
            Your voice shapes Ghana's future
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="flex-1 px-5 -mt-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-green-900/10 border border-gray-100 p-6 mb-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-4 py-3 rounded-2xl flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:bg-white transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <button type="button" className="text-xs text-green-700 font-semibold">
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-green-500 focus:bg-white transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 ghana-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 mt-2 disabled:opacity-60 active:scale-[0.98] transition-transform shadow-lg shadow-green-800/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mb-6">
          New to Dodow Amanmuo?{' '}
          <Link to="/signup" className="text-green-700 font-bold">
            Create account
          </Link>
        </p>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 bg-green-50 rounded-2xl px-4 py-3 mb-6">
          <Sparkles className="w-4 h-4 text-green-600" />
          <p className="text-xs text-green-700 font-medium">
            Powered by Claude AI · Votes are anonymous & encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
