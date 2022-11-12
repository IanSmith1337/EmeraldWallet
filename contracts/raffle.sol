// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

// Used to join a raffle for a geo-coin NFT.
contract Raffle {
    mapping (address => User) private _users;
    uint256 private _cost = 0.25;
    address[] public registeredUsers;
    address[] public awardedUsers;
    address private _owner;
    
    struct User {
        address ID;
        bool isRegisteredForRaffle;
        uint256 balance;
    }

    error InsufficientPayment(uint raffleCost);

    constructor () {
        _owner = msg.sender;
    }

    // Ensures user exists for current sender.
    function checkIfUserExists() private view returns (bool){
        if (_users[msg.sender].ID != address(0))
            return true;
        else
            return false;
    }

    // Creating new user for current sender with funds provided and adding them to the mapping.
    function addUser() public payable {
        require(!checkIfUserExists(), "Error: Cannot add duplicate user to contract.");
        _users[msg.sender] = new User(msg.sender, false, 0);
        require((_users[msg.sender].balance + msg.value) > _users[msg.sender].balance);
        _users[msg.sender].balance += msg.value;
    }

    // Allows current user to buy into the raffle if they haven't joined yet.
    function buyRaffleTicket() public {
        require(checkIfUserExists() && _users[msg.sender].isRegisteredForRaffle == false, "Error: User cannot join raffle twice.");
        if (_users[msg.sender].balance < _cost) 
            revert InsufficientPayment({
                raffleCost: _cost
            });
        else
            require((_users[msg.sender].balance - _cost) < _users[msg.sender].balance);
            payable(_owner).transfer(_cost);
            _users[msg.sender].balance -= _cost;
            registeredUsers.push(msg.sender);
            _users[msg.sender].isRegisteredForRaffle = true;
    }

    // Gets all users in raffle.
    function getUsersInRaffle() public view returns (address[] memory){
        return registeredUsers;
    }

    // Gets all winners from the raffle.
    function getWinnersFromRaffle() public view returns (address[] memory){
        return awardedUsers;
    }
}