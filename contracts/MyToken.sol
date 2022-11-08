// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract MyToken is ERC20, Ownable, ERC20Burnable {
    address public teamAddress = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;

    address public liquidityPoolAddress;
    address[] private blacklist;
    event TransferFnCalled();

    constructor() ERC20("MyToken", "MTK") {
        mint(msg.sender, 1000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }


    function transfer(address _to, uint256 _amount) public override returns (bool) {
        require(teamAddress != address(0) && teamAddress != address(0), "Invalid addresses for the token Fees");
        address owner = _msgSender();
        require(isBlacklisted(owner) == false && isBlacklisted(_to) == false, "Blacklisted address");
        
        uint256 fees = SafeMath.div(SafeMath.sub(SafeMath.mul(_amount, 100), SafeMath.mul(_amount, 95)), 100);
        uint256 amountWithoutFees = SafeMath.sub(_amount, fees);
        uint256 teamFees = SafeMath.div(SafeMath.sub(SafeMath.mul(fees, 100), SafeMath.mul(fees, 60)), 100);
        uint256 burnFees = SafeMath.div(SafeMath.sub(SafeMath.mul(fees, 100), SafeMath.mul(fees, 80)), 100);

        _transfer(owner, teamAddress, teamFees);
        _transfer(owner, liquidityPoolAddress, teamFees);
        _burn(msg.sender, burnFees);

        _transfer(owner, _to, amountWithoutFees);
        emit TransferFnCalled();
        return true;
    }


    function setLiquidityPoolAddress(address _ad) public onlyOwner {
        require(_ad != address(0), "invalid address");
        liquidityPoolAddress = _ad;
    }

    function setTeamAddress(address _ad) public onlyOwner {
        require(_ad != address(0), "invalid address");
        teamAddress = _ad;
    }

    function addBlacklist(address _ad) public onlyOwner {
        blacklist.push(_ad);
    }

    function removeBlacklist(address _ad) public onlyOwner {
        address[] memory tmpBlacklist = blacklist;
        blacklist = new address[](0); // Reset the blacklist

        for (uint i = 0; i < tmpBlacklist.length; i++){
            if(tmpBlacklist[i] != _ad){
                blacklist.push(tmpBlacklist[i]);
            } 
        }
    }

    function isBlacklisted(address _ad) public view returns(bool){
        for (uint i = 0; i < blacklist.length; i++){
            if(blacklist[i] == _ad){
                return true;
            } 
        }
        return false;
    }
}

