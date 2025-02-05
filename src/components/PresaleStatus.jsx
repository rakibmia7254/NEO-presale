import React, { useEffect, useState } from "react";
import { Timer, Users } from "lucide-react";
import { getPresaleData } from "../helpers/utils";

const PresaleStatus = (provider) => {
  // These would be fetched from the smart contract
  const totalSupply = 10000000000000;
  const [soldTokens, setSoldToken] = useState(0);
  const [buyers, setBuyers] = useState(0);
  const [HardCap, setHardCap] = useState(0)
  const progress = (soldTokens / totalSupply) * 100;



  useEffect(() => {
    const fetchData = async () => {
      const presaleData = await getPresaleData(provider);
      setSoldToken(presaleData.tokensSold)
      setBuyers(presaleData.totalBuyers)
      setHardCap(presaleData.hardCap)
      
    };

    fetchData();
  }, []);

  return (
    <div className="glass-panel space-y-6">
      <h2 className="text-xl font-semibold text-cyan-500">Presale Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Timer className="text-cyan-500" />
            <span className="text-sm text-slate-300">Time Remaining</span>
          </div>
          <p className="text-2xl font-bold">Until Hit HardCap</p>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="text-purple-500" />
            <span className="text-sm text-slate-300">Participants</span>
          </div>
          <p className="text-2xl font-bold">{buyers}</p>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-slate-300">Hard Cap</span>
          </div>
          <p className="text-2xl font-bold">{HardCap} ETH</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>{soldTokens.toLocaleString()} TOKENS</span>
          <span>{totalSupply.toLocaleString()} TOKENS</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-right text-sm text-slate-400">
          {progress.toFixed(2)}% Sold
        </p>
      </div>
    </div>
  );
};

export default PresaleStatus;
