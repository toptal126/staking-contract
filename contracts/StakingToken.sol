// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StakingToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StakingToken", "ST") {
        _mint(msg.sender, initialSupply);
    }
}
