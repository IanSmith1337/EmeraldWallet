// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GeoNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    /// @dev Base token URI used as a prefix by tokenURI().
    string public baseTokenURI;

    constructor() ERC721("GeocoinNFT", "GNFT") {
        baseTokenURI = "https://raw.githubusercontent.com/IanSmith1337/GeocoinWeb3/meta/meta/";
    }

    function mintTo(address recipient)
        public
        returns (uint256)
    {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    /// @dev Returns an URI for a given token ID
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Sets the base token URI prefix.
    function setBaseTokenURI(string memory _baseTokenURI) public {
        baseTokenURI = _baseTokenURI;
    }

    function contractURI() public pure returns (string memory) {
        return "https://raw.githubusercontent.com/IanSmith1337/GeocoinWeb3/meta/meta/contract.json";
    }
}