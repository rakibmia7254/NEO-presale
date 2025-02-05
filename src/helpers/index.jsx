import { ethers, formatEther } from "ethers";


// Function to handle wallet connection
export const handleConnect = async ({
  setSigner,
  setAddress,
  setIsConnected,
  setProvider,
  setBalance,
}) => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const { chainId } = await provider.getNetwork();
      const chainIdInt = parseInt(chainId.toString());
      if (chainIdInt !== 11155111) {
        await switchToSepolia();
      }
      setSigner(signer);
      setAddress(address);
      setIsConnected(true);
      setProvider(provider);
      fetchBalance(provider, address, setBalance);
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  } else {
    alert("Please install MetaMask");
  }
};

// Function to fetch balance
const fetchBalance = async (provider, address, setBalance) => {
  try {
    const balance = await provider.getBalance(address);
    const balanceInEth = formatEther(balance);
    setBalance(balanceInEth);
    console.log("Balance:", balanceInEth);
  } catch (error) {
    console.error("Failed to fetch balance", error);
  }
};

// Function to switch to Sepolia
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