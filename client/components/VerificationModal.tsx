import { useState, useRef } from 'react';
import { X, Upload, CheckCircle, Shield, Camera } from 'lucide-react';

interface VerificationModalProps {
  onClose: () => void;
  onVerified: () => void;
}

export default function VerificationModal({ onClose, onVerified }: VerificationModalProps) {
  const [step, setStep] = useState<'upload' | 'processing' | 'success'>('upload');
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setStep('processing');
      // Simulate OCR processing
      setTimeout(() => setStep('success'), 2500);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-[480px] rounded-t-3xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-700" />
            <h2 className="font-bold text-gray-900 text-lg">Verify Identity</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {step === 'upload' && (
          <>
            <p className="text-sm text-gray-500 mb-5">
              Upload your Ghana Card to verify your identity. Your data is encrypted and never stored.
            </p>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                dragging ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'
              }`}
            >
              <Upload className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <p className="font-semibold text-gray-700 text-sm">Drag & drop your Ghana Card</p>
              <p className="text-xs text-gray-400 mt-1">or tap to browse</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
            <button className="mt-3 w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-50">
              <Camera className="w-4 h-4" />
              Take a photo instead
            </button>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            {preview && <img src={preview} alt="Card" className="w-48 h-28 object-cover rounded-xl mx-auto mb-5 opacity-60" />}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="font-semibold text-gray-800">Verifying your identity...</p>
            <p className="text-xs text-gray-400 mt-1">Scanning Ghana Card details</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Verified!</h3>
            <p className="text-sm text-gray-500 mb-6">Your identity has been confirmed. You can now vote on policies.</p>
            <button
              onClick={onVerified}
              className="w-full py-3.5 ghana-gradient text-white font-bold rounded-2xl"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
