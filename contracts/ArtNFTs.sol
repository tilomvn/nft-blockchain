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

    uint256 public nftPerAddressLimit = 2;
    string public baseURI;
    bool public isPublicToWhiteListed = true;
    address[] public whitelisted = [address(0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3)];

    constructor(
      string memory _name,
      string memory _symbol,
      string memory _baseURI
    ) public ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mintNFTContract(string memory tokenURI) public payable returns (uint256) {
        //msg.sender : address of receiver who receives NFT and address of sender who sends nft fee to contract address
        if (isPublicToWhiteListed) {
            require(isInWhiteListed(msg.sender), "Not In PreSale WhiteListed");
        }
        uint256 receiverTokenCount = balanceOf(msg.sender);
        require(receiverTokenCount < nftPerAddressLimit, "Receiver reached limit 2 ArtNFTs");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
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

    function setPublicToWhiteListed(bool _state) public onlyOwner {
        isPublicToWhiteListed = _state;
    }

    function setWhiteListed(address[] calldata _users) public onlyOwner {
        delete whitelisted;
        whitelisted = _users;
    }
}