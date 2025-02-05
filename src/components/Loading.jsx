import React from 'react';
import { Loader2, X, CheckCircle, XCircle } from 'lucide-react';


const LoadingModal = ({ isOpen, onClose, message, status, txHash }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-sm w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center gap-4 pt-4">
          {status === 'loading' && <Loader2 className="animate-spin w-10 h-10 text-cyan-500" />}
          {status === 'success' && <CheckCircle className="w-10 h-10 text-green-500" />}
          {status === 'error' && <XCircle className="w-10 h-10 text-red-500" />}
          <p className="text-slate-200 text-center">{message}</p>
          {status === 'success' && txHash && <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer" className="text-cyan-500 underline">View on Etherscan</a>}
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;