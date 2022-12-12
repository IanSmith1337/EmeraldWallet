// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./GCW3Admin.sol";


contract GCW3MinterWave0V2 is ERC721, Ownable, GCW3Admin {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    uint256 public constant TOTAL_SUPPLY = 5;

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    constructor() ERC721("CacheMe", "CM3") {
        baseTokenURI = "https://raw.githubusercontent.com/IanSmith1337/GeocoinWeb3/meta/meta/";
    }

    function mintTo(address recipient) public isAdmin returns (uint256) {
        uint256 tokenId = currentTokenId.current();
        require(tokenId < TOTAL_SUPPLY, "Max supply reached");
        
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    // returns supply
    function getSupply() public pure returns (uint) {
        return TOTAL_SUPPLY;
    }

    /// @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    // Set contract-level details
    function contractURI() public pure returns (string memory) {
        return "https://raw.githubusercontent.com/IanSmith1337/GeocoinWeb3/meta/meta/contract.json";
    }

    function OpAddress(address a) public onlyOwner {
        super.Op(a);
    }

    function DeOpAddress(address a) public onlyOwner {
        super.DeOp(a);
    }
}