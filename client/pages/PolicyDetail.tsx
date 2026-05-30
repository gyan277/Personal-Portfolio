import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, Globe, CheckCircle, Loader, Share2 } from 'lucide-react';
import { translateText, LANGUAGES, LANGUAGE_FLAGS, GhanaLanguage } from '../services/translation';
import VerificationModal from '../components/VerificationModal';
import { useAuth } from '../context/AuthContext';

const POLICIES: Record<string, any> = {
  '1': {
    id: '1',
    title: 'National Health Insurance Amendment Act',
    summary: 'Expanding NHIS coverage to include mental health services and chronic disease management for all Ghanaian citizens.',
    bullets: [
      'Mental health services will be covered under NHIS for all registered members.',
      'Chronic disease medications including diabetes and hypertension drugs are now free.',
      'Registration fee waived for citizens below the poverty line.',
    ],
    full_text: `The National Health Insurance Authority (NHIA) hereby proposes amendments to the National Health Insurance Act, 2003 (Act 650) to expand coverage and improve access to healthcare for all Ghanaian citizens.\n\nSection 1: Mental Health Coverage\nAll registered NHIS members shall be entitled to mental health services including outpatient consultations, prescribed medications, and inpatient care at accredited facilities.\n\nSection 2: Chronic Disease Management\nThe following chronic disease medications shall be provided free of charge to registered members: antidiabetic drugs, antihypertensive medications, antiretroviral therapy, and cancer treatment drugs on the essential medicines list.\n\nSection 3: Poverty Exemption\nCitizens identified as indigent by the District Social Welfare Department shall be registered under NHIS free of charge and shall receive full benefits under this Act.`,
    category: 'Health',
    votes_for: 8420,
    votes_against: 1230,
    votes_abstain: 540,
    region: 'National',
    status: 'active',
    created_at: '2025-05-20',
    expires_at: '2025-06-20',
  },
};

export default function PolicyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const policy = POLICIES[id || '1'] || POLICIES['1'];

  const [lang, setLang] = useState<GhanaLanguage>('en');
  const [translating, setTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [vote, setVote] = useState<'for' | 'against' | 'abstain' | null>(null);
  const [showVerify, setShowVerify] = useState(false);
  const [voted, setVoted] = useState(false);

  const total = policy.votes_for + policy.votes_against + policy.votes_abstain;
  const forPct = Math.round((policy.votes_for / total) * 100);
  const againstPct = Math.round((policy.votes_against / total) * 100);
  const abstainPct = 100 - forPct - againstPct;

  const handleTranslate = async (l: GhanaLanguage) => {
    setLang(l);
    setShowLangPicker(false);
    if (l === 'en') { setTranslatedText(''); return; }
    setTranslating(true);
    try {
      const result = await translateText(policy.full_text, l, 'civic policy');
      setTranslatedText(result);
    } catch (e) {
      console.error('Translation failed:', e);
      setTranslatedText(policy.full_text);
    }
    setTranslating(false);
  };

  const handleVote = (type: 'for' | 'against' | 'abstain') => {
    setVote(type);
    if (!profile?.ghana_card_verified) setShowVerify(true);
    else submitVote(type);
  };

  const submitVote = (type: string) => {
    setVoted(true);
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="ghana-gradient px-5 pt-5 pb-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80">
            <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
          </button>
          <button className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center">
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] bg-white/20 text-white px-2.5 py-1 rounded-full font-bold">{policy.category}</span>
            <span className="text-[10px] text-white/50">{policy.region}</span>
          </div>
          <h1 className="text-white font-bold text-lg leading-snug mb-1">{policy.title}</h1>
          <p className="text-white/50 text-xs">Expires {policy.expires_at}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* Vote Results */}
        <div className="mx-4 -mt-4 bg-white rounded-3xl p-4 card-shadow mb-3 relative z-10">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Live Vote Results · {total.toLocaleString()} total</p>
          <div className="space-y-2.5">
            {[
              { label: 'Support', pct: forPct, color: 'bg-green-500', count: policy.votes_for, text: 'text-green-700' },
              { label: 'Oppose', pct: againstPct, color: 'bg-red-400', count: policy.votes_against, text: 'text-red-600' },
              { label: 'Abstain', pct: abstainPct, color: 'bg-gray-200', count: policy.votes_abstain, text: 'text-gray-500' },
            ].map(({ label, pct, color, count, text }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={`font-bold ${text}`}>{label}</span>
                  <span className="text-gray-400">{count.toLocaleString()} <span className="font-bold">({pct}%)</span></span>
                </div>
                <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Bullet Summary */}
        <div className="mx-4 bg-white rounded-2xl p-4 card-shadow mb-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Key Points</p>
          <ul className="space-y-2.5">
            {policy.bullets.map((b: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-700 text-[10px] font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{b}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Text + Translation */}
        <div className="mx-4 bg-white rounded-2xl p-4 card-shadow mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Policy Text</p>
            <button
              onClick={() => setShowLangPicker(!showLangPicker)}
              className="flex items-center gap-1.5 text-xs text-green-700 font-semibold bg-green-50 px-3 py-1.5 rounded-full"
            >
              <Globe className="w-3.5 h-3.5" />
              {LANGUAGE_FLAGS[lang]} {LANGUAGES[lang]}
            </button>
          </div>

          {showLangPicker && (
            <div className="grid grid-cols-2 gap-2 mb-3 p-3 bg-gray-50 rounded-xl">
              {(Object.entries(LANGUAGES) as [GhanaLanguage, string][]).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => handleTranslate(code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    lang === code ? 'bg-green-700 text-white' : 'bg-white text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <span>{LANGUAGE_FLAGS[code]}</span>
                  {name}
                </button>
              ))}
            </div>
          )}

          {translating ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Translating to {LANGUAGES[lang]}...</p>
                <p className="text-xs text-gray-400 mt-0.5">Powered by Claude AI</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {translatedText || policy.full_text}
            </p>
          )}
        </div>

        {/* Vote Section */}
        {!voted ? (
          <div className="mx-4 bg-white rounded-3xl p-4 card-shadow mb-4">
            <p className="text-sm font-bold text-gray-800 mb-0.5">Cast Your Vote</p>
            <p className="text-xs text-gray-400 mb-4">Anonymous & encrypted · One vote per policy</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { type: 'for' as const, icon: ThumbsUp, label: 'Support', active: 'border-green-500 bg-green-50', iconColor: 'text-green-600' },
                { type: 'against' as const, icon: ThumbsDown, label: 'Oppose', active: 'border-red-400 bg-red-50', iconColor: 'text-red-500' },
                { type: 'abstain' as const, icon: Minus, label: 'Abstain', active: 'border-gray-400 bg-gray-50', iconColor: 'text-gray-500' },
              ].map(({ type, icon: Icon, label, active, iconColor }) => (
                <button
                  key={type}
                  onClick={() => handleVote(type)}
                  className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all active:scale-95 ${
                    vote === type ? active : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${vote === type ? iconColor : 'text-gray-300'}`} />
                  <span className={`text-xs font-bold ${vote === type ? iconColor : 'text-gray-400'}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-4 bg-green-50 border border-green-100 rounded-3xl p-4 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-green-800 text-sm">Vote Recorded!</p>
              <p className="text-xs text-green-600 mt-0.5">Your anonymous vote has been counted.</p>
            </div>
          </div>
        )}
      </div>

      {showVerify && (
        <VerificationModal
          onClose={() => setShowVerify(false)}
          onVerified={() => { setShowVerify(false); if (vote) submitVote(vote); }}
        />
      )}
    </div>
  );
}
