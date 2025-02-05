import React, { useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { ethers } from "ethers";
import abi from '../helpers/abi.json';
import LoadingModal from "./Loading";

const TokenPurchase = ({ isConnected, balance, signer }) => {
  const [amount, setAmount] = useState("");
  const [receiving, setReceiving] = useState("0");


  const [model, setModel] = useState({
    isOpen: false,
    message: "",
    status: "",
    txHash: "",
  });

  const closeModal = () => {
    setModel({
      isOpen: false,
      message: "",
    });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setReceiving(String(Number(value) * 1000)); // Example rate: 1 ETH = 1000 tokens
  };

  const handleBuy = async () => {
    if (!signer) {
      alert("Please connect your wallet first");
      return;
    }
    const contract = new ethers.Contract(
      "0x2337A1494b87619b7Bd0b2944d310FaAB8f90C2B",
      abi,
      signer
    );

    setModel({
      isOpen: true,
      message: "Transaction in progress",
      status: "loading",
    })

    try {
      const tx = await contract.buyTokens({ value: ethers.parseEther(amount) });
      await tx.wait()
      console.log("Transaction:", tx);
      setModel({
        isOpen: true,
        message: "Transaction successful",
        status: "success",
        txHash: tx.hash
      })
    } catch (error) {
      console.error("Failed to buy tokens", error);
      if (error.code === "INSUFFICIENT_FUNDS") {
        setModel({
          isOpen: true,
          message: "Insufficient balance",
          status: "error",
        })
      } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        setModel({
          isOpen: true,
          message: "Transaction failed",
          status: "error",
        })
      } else if (error.code === "ACTION_REJECTED") {
        setModel({
          isOpen: true,
          message: "Transaction cancelled",
          status: "error",
        })
      } else {
        setModel({
          isOpen: true,
          message: "Transaction failed",
          status: "error",
        })
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-cyan-500">Purchase Tokens</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={handleInputChange}
            placeholder="0.0"
            className="input-field"
          />

          {isConnected && (
            <div className="text-sm text-slate-400">Balance: {balance} ETH</div>
          )}
        </div>

        <div className="flex justify-center">
          <ArrowRight className="text-cyan-500 w-6 h-6" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            You will receive
          </label>
          <input
            type="text"
            value={`${receiving} TOKENS`}
            disabled
            className="input-field"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleBuy}
          className="neon-button w-full"
          disabled={!isConnected || !amount}
        >
          Purchase Tokens
        </button>

        <LoadingModal 
        isOpen={model.isOpen}
        onClose={closeModal}
        message={model.message}
        status={model.status}
        txHash={model.txHash}
        />

        <div className="text-sm text-slate-400 flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          Minimum purchase: 0.001 ETH
        </div>
      </div>
    </div>
  );
};

export default TokenPurchase;
