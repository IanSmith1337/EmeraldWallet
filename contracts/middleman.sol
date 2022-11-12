// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Middleman {
    address private _owner;
    mapping (string => Location) _currentLocations;

    struct Location {
        string cacheID;
    }

    struct Coin {
        Location loc;
        address currentOwner;
        bytes32 ID;
        bool isDropped;
    }

    constructor () {
        _owner = msg.sender;
    }

    modifier ownerOnly {
        require(_owner == msg.sender, "Error: You're not the owner of this contract.");
        _;
    }

    // Uses GCID provided to create a new location if it doesn't exist,
    // and then adds the coin.
    function dropCoin(string memory GCID, Coin memory c) public {
    }
}