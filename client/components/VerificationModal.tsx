import { useState, useRef } from 'react';
import { X, Upload, CheckCircle, Shield, Camera, AlertCircle, XCircle, Calendar, User } from 'lucide-react';

interface VerificationModalProps {
  onClose: () => void;
  onVerified: () => void;
}

type Step = 'upload' | 'processing' | 'valid' | 'invalid_card' | 'underage';

interface CardData {
  name: string;
  dob: string;
  age: number;
}

export default function VerificationModal({ onClose, onVerified }: VerificationModalProps) {
  const [step, setStep] = useState<Step>('upload');
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [processingMsg, setProcessingMsg] = useState('Scanning document...');
  const fileRef = useRef<HTMLInputElement>(null);

  const analyzeCard = async (imageBase64: string) => {
    setStep('processing');
    const steps = [
      { msg: 'Scanning document...', delay: 0 },
      { msg: 'Detecting Ghana Card...', delay: 800 },
      { msg: 'Extracting date of birth...', delay: 1600 },
      { msg: 'Verifying age...', delay: 2400 },
    ];
    steps.forEach(({ msg, delay }) => setTimeout(() => setProcessingMsg(msg), delay));
    try {
      const response = await fetch('/api/verify-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 }),
      });
      const data = await response.json();
      if (!data.isGhanaCard) { setStep('invalid_card'); return; }
      const dob = new Date(data.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      setCardData({
        name: data.name || 'Verified Citizen',
        dob: dob.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        age,
      });
      if (age >= 18) setStep('valid');
      else setStep('underage');
    } catch {
      setStep('invalid_card');
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1];
      setPreview(e.target?.result as string);
      analyzeCard(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const reset = () => { setStep('upload'); setPreview(null); setCardData(null); };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-[480px] rounded-t-3xl animate-slide-up">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 ghana-gradient rounded-xl flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-sm">Ghana Card Verification</h2>
              <p className="text-[10px] text-gray-400">Age verification · 18+ required to vote</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="px-5 py-5">
          {step === 'upload' && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-2xl p-3 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed">
                  <span className="font-bold">Privacy protected:</span> We only extract your date of birth to verify you are 18+. Your card details are never stored.
                </p>
              </div>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragging ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'}`}
              >
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-7 h-7 text-green-600" />
                </div>
                <p className="font-bold text-gray-700 text-sm mb-1">Upload your Ghana Card</p>
                <p className="text-xs text-gray-400">Drag and drop or tap to browse</p>
                <p className="text-[10px] text-gray-300 mt-2">JPG, PNG supported</p>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
              </div>
              <button onClick={() => fileRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-100 rounded-2xl text-sm font-semibold text-gray-500 hover:bg-gray-50">
                <Camera className="w-4 h-4" /> Take a photo
              </button>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-6">
              {preview && (
                <div className="relative w-48 mx-auto mb-5">
                  <img src={preview} alt="Card" className="w-full h-28 object-cover rounded-2xl opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                </div>
              )}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin" />
              </div>
              <p className="font-bold text-gray-800 text-sm">{processingMsg}</p>
              <p className="text-xs text-gray-400 mt-1">Powered by Claude AI</p>
              <div className="flex justify-center gap-3 mt-4">
                {['Scanning', 'Detecting', 'Verifying'].map((label, i) => (
                  <div key={label} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 300}ms` }} />
                    <span className="text-[10px] text-gray-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 'valid' && cardData && (
            <div className="text-center py-4 space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Valid Ghana Card</h3>
                <p className="text-sm text-green-600 font-semibold mt-0.5">You are eligible to vote</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-4 text-left space-y-3 border border-green-100">
                {[
                  { icon: User, label: 'Name', value: cardData.name, color: 'text-green-700' },
                  { icon: Calendar, label: 'Date of Birth', value: cardData.dob, color: 'text-green-700' },
                  { icon: CheckCircle, label: 'Age Verified', value: `${cardData.age} years old · Eligible`, color: 'text-green-700' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">{label}</p>
                      <p className="text-sm font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400">Your card details have not been stored. Only your age was verified.</p>
              <button onClick={onVerified} className="w-full py-4 ghana-gradient text-white font-bold rounded-2xl shadow-lg shadow-green-800/20 active:scale-[0.98] transition-transform">
                Continue to Vote
              </button>
            </div>
          )}

          {step === 'invalid_card' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Invalid Ghana Card</h3>
                <p className="text-sm text-red-500 font-semibold mt-0.5">Document not recognized</p>
              </div>
              <div className="bg-red-50 rounded-2xl p-4 border border-red-100 text-left">
                <p className="text-xs text-red-700 font-bold mb-2">This could be because:</p>
                <ul className="space-y-1.5">
                  {['The image is not a Ghana Card', 'The photo is blurry or unclear', 'The card is damaged or expired', 'Only part of the card is visible'].map((reason, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-red-600">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={reset} className="w-full py-4 bg-gray-800 text-white font-bold rounded-2xl active:scale-[0.98] transition-transform">
                Try Again
              </button>
            </div>
          )}

          {step === 'underage' && cardData && (
            <div className="text-center py-4 space-y-4">
              <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">You are not 18+</h3>
                <p className="text-sm text-amber-600 font-semibold mt-0.5">Not eligible to vote</p>
              </div>
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-left space-y-3">
                {[
                  { icon: User, label: 'Name', value: cardData.name },
                  { icon: Calendar, label: 'Date of Birth', value: cardData.dob },
                  { icon: XCircle, label: 'Age', value: `${cardData.age} years old · Must be 18+` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-medium">{label}</p>
                      <p className="text-sm font-bold text-gray-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">You must be at least 18 years old to vote on policies and participate in civic decisions.</p>
              <button onClick={onClose} className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl">Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
