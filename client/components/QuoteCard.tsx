export default function QuoteCard() {
  return (
    <div className="mx-4 my-4">
      <div className="relative overflow-hidden rounded-3xl ghana-gradient p-5">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-10 -translate-x-10" />
        <div className="absolute top-4 right-8 w-3 h-3 bg-yellow-400/60 rounded-full" />
        <div className="absolute bottom-6 right-16 w-2 h-2 bg-white/30 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              <div className="w-4 h-1.5 bg-red-500 rounded-full" />
              <div className="w-4 h-1.5 bg-yellow-400 rounded-full" />
              <div className="w-4 h-1.5 bg-green-400 rounded-full" />
            </div>
            <span className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Civic Wisdom</span>
          </div>
          <p className="text-white font-semibold text-sm leading-relaxed mb-3">
            "Democracy is not just about voting — it's about understanding what you're voting for."
          </p>
          <p className="text-white/50 text-xs font-medium">— Dodow Amanmuo Platform</p>
        </div>
      </div>
    </div>
  );
}
