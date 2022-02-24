// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves = 0;

    event newWave(address indexed from, string message, uint256 timestamp);

    /* A struct is a custom datatype where we can customize what we want to hold inside it */
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    /* Array of Wave that will hold all the waves anyone sends to us */
    Wave[] waves;

    constructor() {}

    function wave(string memory _message) public {
        totalWaves += 1;

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit newWave(msg.sender, _message, block.timestamp);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}
