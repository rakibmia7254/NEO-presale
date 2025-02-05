import React, { useState } from "react";
import { Coins } from "lucide-react";
import { ethers, formatEther } from "ethers";
import ConnectWallet from "./components/ConnectWallet";
import TokenPurchase from "./components/TokenPurchase";
import PresaleStatus from "./components/PresaleStatus";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState();
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [balance, setBalance] = useState(0);

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const {chainId} = await provider.getNetwork();
        const chainIdInt = parseInt(chainId.toString());
        if (chainIdInt !== 11155111) {
          await switchToSepolia();
        }
        setSigner(signer);
        setAddress(address);
        setIsConnected(true);
        setProvider(provider);
        fetchBalance(provider, address);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  const fetchBalance = async (provider, address) => {
    try {
      const balance = await provider.getBalance(address);
      const balanceInEth = formatEther(balance);
      setBalance(balanceInEth);
      console.log("Balance:", balanceInEth);
    } catch (error) {
      console.error("Failed to fetch balance", error);
    }
  };


  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
    } catch (error) {
      console.error("Failed to switch network", error);
      alert("Please switch to Sepolia manually in MetaMask");
    }
  };


  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Coins className="w-8 h-8 text-cyan-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              NEOToken Presale
            </h1>
          </div>

          <nav className="flex space-x-4 mb-8">
            <ConnectWallet
              onConnect={handleConnect}
              isConnected={isConnected}
              address={address}
            />
          </nav>
        </header>

        <main className="grid gap-8">
          <div className="glass-panel">
            <TokenPurchase isConnected={isConnected} balance={balance} signer={signer}/>
          </div>
          {isConnected && <PresaleStatus provider={provider}/>}
        </main>

        <footer className="mt-16 text-center text-slate-500">
          <p>© 2024 NEOToken Presale Dapp</p>
        </footer>
        </div>
    </div>
  );
}

export default App;