import React, { useState } from 'react';
import { Settings, AlertCircle } from 'lucide-react';

const AdminPanel = () => {
  const [tokenPrice, setTokenPrice] = useState('');
  const [isPresaleActive, setIsPresaleActive] = useState(true);

  const handlePriceChange = async () => {
    // Update token price logic
    console.log('Updating token price...');
  };

  const handlePresaleToggle = async () => {
    // Toggle presale status logic
    setIsPresaleActive(!isPresaleActive);
    console.log('Toggling presale status...');
  };

  const handleWithdraw = async () => {
    // Withdraw funds logic
    console.log('Withdrawing funds...');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-cyan-500">Admin Panel</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Token Price (ETH)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={tokenPrice}
              onChange={(e) => setTokenPrice(e.target.value)}
              placeholder="0.001"
              className="input-field"
            />
            <button
              onClick={handlePriceChange}
              className="neon-button"
            >
              Update
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-300">Presale Status</span>
          <button
            onClick={handlePresaleToggle}
            className={`neon-button ${isPresaleActive ? 'bg-red-500 border-red-500 text-white' : ''}`}
          >
            {isPresaleActive ? 'Pause Presale' : 'Start Presale'}
          </button>
        </div>

        <div>
          <button
            onClick={handleWithdraw}
            className="neon-button w-full"
          >
            Withdraw Funds
          </button>
          <p className="mt-2 text-sm text-slate-400 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Only available after presale ends
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;