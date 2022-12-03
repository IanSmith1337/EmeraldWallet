// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";

abstract contract GCW3Admin is Ownable {
    mapping(address => Admin) private _admins;
    
    struct Admin {
        address ID;
    }

    modifier isAdmin() {
        require(_admins[msg.sender].ID != address(0) || owner() == msg.sender, "You are not an admin or owner.");
        _;
    }

    modifier isValidAddress(address addr) {
        require(addr != address(0), "Invalid Address.");
        _;
    }

    function checkIfAdmin(address addr) private view onlyOwner isValidAddress(addr) returns (bool) {
        if(_admins[addr].ID != address(0) || owner() == addr) {
            return true;
        } else {
            return false;
        }
    }

    function Op(address addr) internal onlyOwner isValidAddress(addr) {
        require(!checkIfAdmin(addr), "Error: Address is already an adminstrator.");
        _admins[addr] = Admin(addr);
    }

    function DeOp(address addr) internal onlyOwner isValidAddress(addr) {
        require(checkIfAdmin(addr), "Error: Address is not an adminstrator.");
        delete _admins[addr].ID;
        delete _admins[addr];
    }
}