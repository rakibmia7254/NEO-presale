// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenPresale is Ownable {
    IERC20 public token;
    uint256 public rate; // Tokens per ETH
    uint256 public hardCap = 200 ether;
    uint256 public totalRaised;
    uint256 public totalBuyers;
    mapping(address => uint256) public contributions;
    mapping(address => bool) public claimed;

    event TokensPurchased(address indexed buyer, uint256 amount);

    constructor(
        IERC20 _token
    ) Ownable(msg.sender) {
        require(address(_token) != address(0), "Invalid token address");

        token = _token;
        rate = 1000;
    }

    modifier onlyWhileOpen() {
        require(totalRaised < hardCap, "Hard cap reached");
        _;
    }

    function buyTokens() external payable onlyWhileOpen {
        require(msg.value > 0, "Send ETH to buy tokens");
        uint256 amount = msg.value * rate;
        require(totalRaised + msg.value <= hardCap, "Exceeds hard cap");

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;
        totalBuyers++;

        token.transfer(msg.sender, amount);

        emit TokensPurchased(msg.sender, amount);
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawUnsoldTokens() external onlyOwner {
        uint256 unsold = token.balanceOf(address(this)) - (totalRaised * rate);
        require(unsold > 0, "No unsold tokens");
        token.transfer(owner(), unsold);
    }
}