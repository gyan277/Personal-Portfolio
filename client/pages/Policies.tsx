import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { FileText, Search, ChevronRight, ThumbsUp, ThumbsDown, Minus, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Health', 'Education', 'Infrastructure', 'Finance', 'Agriculture', 'Security'];

const POLICIES = [
  {
    id: '1',
    title: 'National Health Insurance Amendment Act',
    summary: 'Expanding NHIS coverage to include mental health services and chronic disease management.',
    bullets: [
      'Mental health services will be covered under NHIS for all registered members.',
      'Chronic disease medications including diabetes and hypertension drugs are now free.',
      'Registration fee waived for citizens below the poverty line.',
    ],
    category: 'Health',
    status: 'active',
    votes_for: 8420,
    votes_against: 1230,
    votes_abstain: 540,
    region: 'National',
    created_at: '2025-05-20',
    categoryColor: 'bg-blue-50 text-blue-700',
    categoryDot: 'bg-blue-500',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80',
  },
  {
    id: '2',
    title: 'Free SHS Extension Policy 2025',
    summary: 'Extending free senior high school education to include TVET and vocational training.',
    bullets: [
      'Technical and vocational schools will be fully funded under the Free SHS program.',
      'Students in TVET programs receive monthly stipends for tools and materials.',
      'New TVET centers to be built in all 16 regions by 2026.',
    ],
    category: 'Education',
    status: 'active',
    votes_for: 12800,
    votes_against: 890,
    votes_abstain: 320,
    region: 'National',
    created_at: '2025-05-18',
    categoryColor: 'bg-green-50 text-green-700',
    categoryDot: 'bg-green-500',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80',
  },
  {
    id: '3',
    title: 'Road Infrastructure Levy Bill',
    summary: 'Introducing a 2% levy on fuel to fund road construction and maintenance nationwide.',
    bullets: [
      'A 2% levy on all petroleum products will fund road infrastructure.',
      'Revenue will be managed by a new independent Road Fund Board.',
      'Priority roads in rural areas will receive 40% of the fund allocation.',
    ],
    category: 'Infrastructure',
    status: 'active',
    votes_for: 4200,
    votes_against: 6800,
    votes_abstain: 1100,
    region: 'National',
    created_at: '2025-05-15',
    categoryColor: 'bg-orange-50 text-orange-700',
    categoryDot: 'bg-orange-500',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&q=80',
  },
  {
    id: '4',
    title: 'Agricultural Modernization Fund',
    summary: 'GHS 500 million fund to support smallholder farmers with modern equipment and training.',
    bullets: [
      'Smallholder farmers can access low-interest loans up to GHS 50,000.',
      'Free training programs on modern farming techniques in all districts.',
      'Subsidized fertilizers and seeds for registered farmers.',
    ],
    category: 'Agriculture',
    status: 'active',
    votes_for: 9100,
    votes_against: 420,
    votes_abstain: 680,
    region: 'National',
    created_at: '2025-05-10',
    categoryColor: 'bg-emerald-50 text-emerald-700',
    categoryDot: 'bg-emerald-500',
    img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80',
  },
];

export default function Policies() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = POLICIES.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="relative overflow-hidden rounded-b-3xl">
        {/* Background image - Ghana Parliament */}
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=480&q=80"
          alt="Ghana Parliament"
          className="w-full h-52 object-cover"
          onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=480&q=80'; }}
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
            <h1 className="text-white font-bold text-2xl mb-1">Policies</h1>
            <p className="text-white/70 text-xs">Read, understand & vote on Ghana's policies</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search policies..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-4 py-3 -mt-3 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
                : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-4 mb-2">
        <p className="text-xs text-gray-400 font-medium">{filtered.length} policies found</p>
      </div>

      {/* Policy List */}
      <div className="px-4 space-y-3 pb-4">
        {filtered.map(policy => {
          const total = policy.votes_for + policy.votes_against + policy.votes_abstain;
          const forPct = Math.round((policy.votes_for / total) * 100);
          const againstPct = Math.round((policy.votes_against / total) * 100);

          return (
            <Link
              key={policy.id}
              to={`/policies/${policy.id}`}
              className="block bg-white rounded-3xl overflow-hidden card-shadow border border-gray-50 active:scale-[0.98] transition-transform"
            >
              {/* Policy Banner Image */}
              <div className="relative h-28 overflow-hidden">
                <img
                  src={policy.img}
                  alt={policy.category}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=80'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${policy.categoryDot}`} />
                    <span className="text-[10px] font-bold text-white">{policy.category}</span>
                  </div>
                  <span className="text-[10px] text-white/60">· {policy.region}</span>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/90 px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] text-white font-semibold">Active</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3">{policy.title}</h3>

                {/* 3 Bullets */}
                <ul className="space-y-1.5 mb-3">
                  {policy.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="w-4 h-4 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-700 text-[9px] font-bold">{i + 1}</span>
                      </span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Vote Bar */}
                <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mb-2">
                  <div className="bg-green-500 rounded-l-full" style={{ width: `${forPct}%` }} />
                  <div className="bg-red-400" style={{ width: `${againstPct}%` }} />
                  <div className="bg-gray-100 rounded-r-full flex-1" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <ThumbsUp className="w-3 h-3 text-green-500" />
                    {policy.votes_for.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <ThumbsDown className="w-3 h-3 text-red-400" />
                    {policy.votes_against.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Minus className="w-3 h-3 text-gray-300" />
                    {policy.votes_abstain.toLocaleString()}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-green-700 font-bold">
                    Vote now <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Layout>
  );
}
