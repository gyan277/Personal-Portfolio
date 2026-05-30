import { Shield, X } from 'lucide-react';
import { useState } from 'react';

export default function AnonymityBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-green-800 to-green-700 px-4 py-2.5 flex items-center gap-2.5">
      <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
        <Shield className="w-3.5 h-3.5 text-white" />
      </div>
      <p className="flex-1 text-white text-xs font-medium leading-snug">
        Your votes are <span className="font-bold">anonymous & encrypted</span>. Identity protected.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 w-5 h-5 bg-white/10 rounded-full flex items-center justify-center"
      >
        <X className="w-3 h-3 text-white/70" />
      </button>
    </div>
  );
}
