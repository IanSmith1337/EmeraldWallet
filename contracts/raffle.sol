// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";

// Used to join a raffle for a geo-coin NFT.
contract Raffle is Ownable, PullPayment {
    mapping (address => User) private _users;
    uint256 private _cost = 0.01 ether;
    address[] public registeredUsers;
    address[] public awardedUsers;
    address[] private weighted;
    
    struct User {
        address ID;
        uint tickets;
    }

    error UnevenPayment(uint tickets, uint raffleCost);
    error InvalidAddress(address addr);
    error duplicateWinner(address addr);

    constructor () {}

    // Ensures user exists for current sender.
    function checkIfUserExists() private view returns (bool){
        if (_users[msg.sender].ID != address(0))
            return true;
        else
            return false;
    }

    function checkIfUserIsRegistered() private view returns (bool) {
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            if(msg.sender == registeredUsers[i]) 
                return true;
        }
        return false;
    }

    // Creates user.
    function addUser() public {
        require(!checkIfUserExists(), "Error: Cannot add duplicate user to contract.");
        _users[msg.sender] = User(msg.sender, 0);
        console.log("Added User");
    }

    // Allow user to buy into raffle
    function buyTickets(uint t) public payable {
        require(checkIfUserExists(), "Error: User doesn't exist yet.");
        require((_users[msg.sender].tickets += t) > _users[msg.sender].tickets, "Error: Ticket overflow.");
        if (msg.value % _cost > 0)
            revert UnevenPayment({
                tickets: t,
                raffleCost: _cost
            });
        else
            if(checkIfUserIsRegistered())
                _users[msg.sender].tickets += t;
            else
                registeredUsers.push(msg.sender);
                _users[msg.sender].tickets = t;
    }

    // Calculator func for weighted array
    // registeredUsers = {0x1, 0x2, 0x3, 0x4}
    // tickets = 1, 2, 3, 4
    // weighted = {0x1, 0x2, 0x2, 0x3, 0x3, 0x3, 0x4, 0x4, 0x4, 0x4}
    function calcWeightedArrayFromRaffle() public onlyOwner {
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            for (uint256 j = 0; j < _users[registeredUsers[i]].tickets; j++) {
                weighted.push(registeredUsers[i]);
            }
        }
    }

    // Gets weighted users from the raffle.
    function getWeightedFromRaffle() public view onlyOwner returns (address[] memory){
        return weighted;
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
        console.log(awardedUsers[0]);
    }

    /// @dev Overridden in order to make it an onlyOwner function
    function withdrawPayments(address payable payee) public override onlyOwner virtual {
        super.withdrawPayments(payee);
    }

    function reset() public onlyOwner {
        for (uint256 i = 0; i < registeredUsers.length; i++) {
            _users[registeredUsers[i]].tickets = 0;
        }
        delete registeredUsers;
        delete awardedUsers;
        delete weighted;
    }
}