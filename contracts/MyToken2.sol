// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MyToken2 is ERC20, Ownable {
    address public teamAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address public liquidityPool;
    

    constructor() ERC20("MyToken2", "MTK2") {
        mint(msg.sender, 1000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }



}

