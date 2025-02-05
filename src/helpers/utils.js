import { ethers, formatEther } from "ethers";

const PRESALE_CONTRACT_ADDRESS = "0x2337A1494b87619b7Bd0b2944d310FaAB8f90C2B"; // Replace with your contract address
const PRESALE_ABI = [
  "function totalBuyers() public view returns (uint256)",
  "function hardCap() public view returns (uint256)",
  "function totalRaised() public view returns (uint256)",
];

const TOKEN_CONTRACT_ADDRESS = "0x1498B7c8A84324475437CedaE9229759C8543E8d"; // Replace with your token contract address
const TOKEN_ABI = [
  "function balanceOf(address) public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
];
export const getPresaleData = async (provider) => {
  if (!window.ethereum) {
    console.error("MetaMask not detected!");
    return null;
  }

  try {
    const contract = new ethers.Contract(
      PRESALE_CONTRACT_ADDRESS,
      PRESALE_ABI,
      provider
    );


    const tokenContract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_ABI,
        provider
    );

    const presaleBalance = await tokenContract.balanceOf(
        PRESALE_CONTRACT_ADDRESS
    );
    const totalSupply = await tokenContract.totalSupply();

    const tokensSold = (formatEther(totalSupply) - (formatEther(presaleBalance)))
      

    const totalBuyers = await contract.totalBuyers.call();
    const hardCap = await contract.hardCap.call();
    const totalRaised = await contract.totalRaised.call();


    return {
      totalBuyers: totalBuyers.toString(),
      hardCap: formatEther(hardCap),
      totalRaised: formatEther(totalRaised),
      tokensSold
    };
  } catch (error) {
    console.error("Error fetching presale data:", error);
    return null;
  }
};
