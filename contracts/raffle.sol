// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";


contract Raffle {
    address[] users;
    
    // Ensures no duplicates to be added to the users array.
    function checkIfUserExists(address user) private view returns (bool){
        uint i = 0;
        if( users.length >= 1){
            while (i < users.length){
                if(user != users[i])
                    i+=1;
                else
                    return true;
            }
            return false;
        }
        else 
            return false;
    }
    // Adds user to raffle if they dont already exist.
    function joinRaffle(address user) public {
        if (!checkIfUserExists(user))
            users.push(user);
        else
            console.log("User cannot join raffle twice.");
    }

    // Gets all users in raffle.
    function getUsersInRaffle() public view returns (address[] memory){
        return users;
    }

}
