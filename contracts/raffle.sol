// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";

// Used to join a raffle for a geo-coin NFT.
contract Raffle is Ownable, PullPayment {
    mapping (address => User) private _users;
    address payable private withdrawAddress;
    uint256 private _cost = 0.25 ether;
    address[] public registeredUsers;
    address[] public awardedUsers;
    
    struct User {
        address ID;
        bool isRegisteredForRaffle;
    }

    error InsufficientPayment(uint raffleCost);
    error InvalidAddress(address addr);
    error duplicateWinner(address addr);

    constructor () {
        withdrawAddress = payable(owner());
    }

    // Ensures user exists for current sender.
    function checkIfUserExists() private view returns (bool){
        if (_users[msg.sender].ID != address(0))
            return true;
        else
            return false;
    }

    function checkIfUserIsRegistered() private view returns (bool){
        return _users[msg.sender].isRegisteredForRaffle;
    }

    // Creates user and buys into the raffle.
    function addUserAndBuyRaffleTicket() public payable {
        require(!checkIfUserExists(), "Error: Cannot add duplicate user to contract.");
        _users[msg.sender] = User(msg.sender, false);
        if (msg.value != _cost)
            revert InsufficientPayment({
                raffleCost: _cost
            });
        else
            registeredUsers.push(msg.sender);
            _users[msg.sender].isRegisteredForRaffle = true;
    }

    // Gets all users in raffle.
    function getUsersInRaffle() public view onlyOwner returns (address[] memory){
        return registeredUsers;
    }

    // Gets all winners from the raffle.
    function getWinnersFromRaffle() public view onlyOwner returns (address[] memory){
        return awardedUsers;
    }

    // Adds winner from the raffle to awardedUsers.
    function setWinnersFromRaffle(address user) public onlyOwner {
        for (uint256 u = 0; u < awardedUsers.length; u++) {
            if(user == awardedUsers[u]) 
                revert duplicateWinner({
                    addr: user
                });
        }
        awardedUsers.push(user);
    }

    /// @dev Overridden in order to make it an onlyOwner function
    function withdrawPayments(address payable payee) public override onlyOwner virtual {
        super.withdrawPayments(payee);
    }
}