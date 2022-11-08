// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "contracts/MyToken.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";

contract Pool is Ownable{
    MyToken public ERC20Token;
    ERC20 public ERC20Token2;
    address public poolAddress;
  
    address public ERC20TokenAddress = 0xfB43c939B27D0Cb543Fe81B11F4a885a21b68215;
    address public ERC20Token2Address = 0x281b37432e1Ce20AadEbD0fD786369D9F0Ce44D1;
    address public constant routerAddress = 0xD99D1c33F9fC3444f8101754aBC46c52416550D1;
    address public constant factoryAddress = 0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73;
    IUniswapV2Router02 private pancakeRouter = IUniswapV2Router02(routerAddress);
    IUniswapV2Factory private factory = IUniswapV2Factory(pancakeRouter.factory());


    constructor() {
        ERC20Token = MyToken(ERC20TokenAddress);
        ERC20Token2 = ERC20(ERC20Token2Address);
        ERC20Token.approve(routerAddress, 10000);
        ERC20Token2.approve(routerAddress, 10000);
    }
    
    function createPair() public onlyOwner {
        if (factory.getPair(ERC20TokenAddress, ERC20Token2Address) == address(0)){
            poolAddress = factory.createPair(ERC20TokenAddress, ERC20Token2Address);
        }
    }

    function changeTokenAddress(address _address) public onlyOwner{
        require(_address != address(0), "invalid address");
        ERC20TokenAddress = _address;
        if (factory.getPair(ERC20TokenAddress, ERC20Token2Address) == address(0)){
            poolAddress = factory.createPair(ERC20TokenAddress, ERC20Token2Address);
        }
    }

    function changeToken2Address(address _address) public onlyOwner{
        require(_address != address(0), "invalid address");
        ERC20Token2Address = _address;
        if (factory.getPair(ERC20TokenAddress, ERC20Token2Address) == address(0)){
            poolAddress = factory.createPair(ERC20TokenAddress, _address);
        }
    }

}