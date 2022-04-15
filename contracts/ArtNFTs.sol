// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// implements the ERC721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtNFTs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public baseURI;
    bool public isPublicToWhiteListed = true;
    address[] public whitelisted;

    constructor(
      string memory _name,
      string memory _symbol,
      string memory _baseURI
    ) public ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mintNFTContract(address receiver, string memory tokenURI) public payable returns (uint256) {
        if (isPublicToWhiteListed) {
            require(isInWhiteListed(receiver), "Not In WhiteListed For PreSale");
        }
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(receiver, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    function isInWhiteListed(address _user) private view returns (bool) {
        for(uint256 i = 0; i < whitelisted.length; i++) {
            if (whitelisted[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function setPublicToWhiteListed(bool _state) public {
        isPublicToWhiteListed = _state;
    }

    function setWhiteListed(address[] calldata _users) public {
        delete whitelisted;
        whitelisted = _users;
    }
}