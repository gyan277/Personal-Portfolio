import { TrendingUp, ExternalLink } from 'lucide-react';

const NEWS = [
  {
    id: 1,
    title: "Parliament passes new Education Reform Bill",
    source: "GBC Ghana",
    time: "2h ago",
    category: "Education",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  {
    id: 2,
    title: "Health Ministry announces free maternal care expansion",
    source: "Joy News",
    time: "4h ago",
    category: "Health",
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-500",
  },
  {
    id: 3,
    title: "Infrastructure levy debate continues in Assembly",
    source: "Citi FM",
    time: "6h ago",
    category: "Finance",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
];

export default function NewsSection() {
  return (
    <div className="px-4 py-3 pb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-green-700" />
          </div>
          <h3 className="font-bold text-gray-800 text-sm">Ghana News</h3>
        </div>
        <button className="text-xs text-green-700 font-semibold">See all</button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {NEWS.map(item => (
          <div
            key={item.id}
            className="flex-shrink-0 w-52 bg-white rounded-2xl p-3.5 card-shadow border border-gray-50"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
              <span className={`text-[10px] font-bold ${item.text}`}>{item.category}</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 mb-2.5">
              {item.title}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-300 font-medium">{item.source} · {item.time}</span>
              <ExternalLink className="w-3 h-3 text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
