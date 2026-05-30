import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ChevronDown, ArrowRight, ArrowLeft, Scale, Building2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../services/supabaseClient';

const REGIONS = ['Greater Accra','Ashanti','Western','Eastern','Central','Volta','Northern','Upper East','Upper West','Brong-Ahafo','Oti','Bono East','Ahafo','Savannah','North East','Western North'];

const ROLES: { value: UserRole; label: string; desc: string; Icon: any }[] = [
  { value: 'citizen', label: 'Citizen', desc: 'Read & vote on policies', Icon: UserCheck },
  { value: 'assembly', label: 'Assembly Member', desc: 'Post district policies', Icon: Building2 },
  { value: 'minister', label: 'Minister / Official', desc: 'Full platform access', Icon: Scale },
];

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'citizen' as UserRole, region: '', district: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const { error } = await signUp(form.email, form.password, {
      full_name: form.fullName,
      role: form.role,
      region: form.region,
      district: form.district,
    });
    if (error) { setError(error.message); setLoading(false); }
    else navigate('/home');
  };

  return (
    <div className="min-h-full flex flex-col bg-white">
      <div className="ghana-gradient px-6 pt-10 pb-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="p-1.5 bg-white/20 rounded-xl">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold">Create Account</h2>
            <p className="text-white/70 text-xs">Step {step} of 2</p>
          </div>
        </div>
        {/* Progress */}
        <div className="flex gap-1.5">
          {[1, 2].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-yellow-400' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 pt-6">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-2xl mb-4">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Full Name</label>
              <input value={form.fullName} onChange={e => update('fullName', e.target.value)} placeholder="Kwame Mensah" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 pr-12" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button onClick={() => setStep(2)} disabled={!form.fullName || !form.email || !form.password} className="w-full py-4 ghana-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">I am a...</label>
              <div className="space-y-2">
                {ROLES.map(r => (
                  <button key={r.value} onClick={() => update('role', r.value)} className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 transition-all text-left ${form.role === r.value ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-gray-50'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${form.role === r.value ? 'bg-green-100' : 'bg-white'}`}>
                      <r.Icon className={`w-5 h-5 ${form.role === r.value ? 'text-green-700' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${form.role === r.value ? 'text-green-700' : 'text-gray-800'}`}>{r.label}</p>
                      <p className="text-xs text-gray-400">{r.desc}</p>
                    </div>
                    {form.role === r.value && <div className="ml-auto w-5 h-5 bg-green-600 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full" /></div>}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Region</label>
              <div className="relative">
                <select value={form.region} onChange={e => update('region', e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none">
                  <option value="">Select region</option>
                  {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">District (optional)</label>
              <input value={form.district} onChange={e => update('district', e.target.value)} placeholder="e.g. Accra Metropolitan" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button onClick={handleSubmit} disabled={loading || !form.region} className="w-full py-4 ghana-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50 mt-2">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
