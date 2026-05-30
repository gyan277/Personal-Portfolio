import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [phase, setPhase] = useState<'show' | 'fade'>('show');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fade'), 2000);
    const finishTimer = setTimeout(() => onFinish(), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ghana-gradient transition-opacity duration-500 ${
        phase === 'fade' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/3" />
      <div className="absolute top-1/4 left-8 w-16 h-16 bg-yellow-400/10 rounded-full" />
      <div className="absolute bottom-1/4 right-8 w-10 h-10 bg-white/10 rounded-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-5 animate-fade-in">
        {/* Logo */}
        <div className="w-28 h-28 bg-white/15 rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl shadow-black/20 backdrop-blur-sm">
          <img
            src="/logo.png"
            alt="Dodow Amanmuo"
            className="w-20 h-20 object-contain"
          />
        </div>

        {/* App Name */}
        <div className="text-center">
          <h1 className="text-white font-bold text-3xl tracking-tight">
            Dodow Amanmuo
          </h1>
          <p className="text-white/60 text-sm mt-1 font-medium">
            Ghana Civic Platform
          </p>
        </div>

        {/* Ghana flag bar */}
        <div className="flex gap-1 mt-2">
          <div className="h-1.5 w-10 bg-red-500 rounded-full" />
          <div className="h-1.5 w-10 bg-yellow-400 rounded-full" />
          <div className="h-1.5 w-10 bg-green-300 rounded-full" />
        </div>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Powered by */}
      <p className="absolute bottom-8 text-white/30 text-xs font-medium">
        Powered by Claude AI · Ghana Civic Platform
      </p>
    </div>
  );
}
