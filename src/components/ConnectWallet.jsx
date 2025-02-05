import React from 'react';
import { Wallet } from 'lucide-react';

const ConnectWallet = ({ onConnect, isConnected, address }) => {
  
  return (
    <button
      onClick={onConnect}
      className="neon-button"
    >
      <Wallet className="w-4 h-4 inline mr-2" />
      {isConnected ? `${address.substring(0, 6)}...${address.substring(38)}` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWallet;