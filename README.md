# NFTs Smart Contract - Blockchain Technology
## 1. Docs: https://blog.logrocket.com/how-to-create-nfts-with-javascript/
## 2. Installation
* 2.1 Node Js
* Create an Alchemy account at https://www.alchemy.com/
* Create an Ethereum account at https://metamask.io/, available as a Chrome https://metamask.io/download.html
* Get ETH Amount from MetaMask Chrome Extension
## 3. Setting Up NFT Token
* Create root project folder: mkdir ArtNFTs && cd ArtNFTs
* Init node project: npm init -y
* Install HardHat: npm install -D hardhat
* Initiate HardHat: npx hardhat
* Select Create an empty hardhat.config.js
* Create contracts and scripts folder: mkdir contracts && mkdir scripts
* Install the OpenZeppelin contracts library: npm i @openzeppelin/contracts@4.0.0
* In your contracts directory, create an ArtNFTs.sol(see code in project)
* Install dotenv to store MetaMask Private Key: npm i dotenv
* Create a .env(see source in project) file in the root of your project
* Install Ether.js library that simplifies interacting with the Ethereum blockchain: npm i -D @nomiclabs/hardhat-ethers "ethers@^5.0.0"
* Edit hardhat.config.js(see source in project)
* Compile contracts: npx hardhat compile
* Create a deployment script deploy.js(see source in project) in your scripts directory
* Deploy contracts: npx hardhat run --network ropsten scripts/deploy.js 
## 4. Mint NFTs
* Create place to store metadata: https://pinata.cloud/
* Upload some metadata file and json file of metadata with sample format
```JSON
    {
        "description" : "An image of the Osun River captured on the suspended bridge at the Osogbo Sacred Grove.",
        "image" : "https://ipfs.io/ipfs/Qmf1r8igsCAFTFjrQrK7jk6uD6YKVYo5dGu7cvm9TmPhJV",
        "photographer" : "Adebola Adeniran"
    }
```
* Install axios to fetch metadata when minting: npm i axios
* Install Alchemy Web3: npm install @alch/alchemy-web3
* Create scripts to mint NFTs: in scripts folder, create a file called mint-nft.js(see source in project)
* Mint: node scripts/mint-nft.js
* Can see transaction on https://dashboard.alchemyapi.io/mempool
## 5. Customize Mint Cmd Sample
* node scripts/mint.js --contract=ArtNFTs --contractAddress=0xC6D8A5a5Da36B59b690fE56e99Cf9D01618407AB --receiver=0x80D422366B4c9216e72C054036d59eDEf47E124E --receiverKey=02343c7018f9a5446763e635efc6df7be6f8f6f7972441f9d76d7b0df30b8989 --tokenUri=https://ipfs.io/ipfs/QmYgHzTcUBEpTu2aHMXA9vFLPUR951Q9KCKuiW97baFS4x --nftFee=100000000 --gas=1000000
* node scripts/mint.js --contract=ArtNFTs --contractAddress=0xC6D8A5a5Da36B59b690fE56e99Cf9D01618407AB --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --receiverKey=2f3bfcc7d0b936159c373d642d947926363030e6c500285c593bb01bd002191c --tokenUri=https://ipfs.io/ipfs/QmYgHzTcUBEpTu2aHMXA9vFLPUR951Q9KCKuiW97baFS4x --nftFee=100000000 --gas=1000000
* node scripts/transfer.js --contract=ArtNFTs --contractAddress=0xC6D8A5a5Da36B59b690fE56e99Cf9D01618407AB --sender=0x80D422366B4c9216e72C054036d59eDEf47E124E --senderKey=02343c7018f9a5446763e635efc6df7be6f8f6f7972441f9d76d7b0df30b8989 --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --nftFee=100000000 --gas=1000000
* node scripts/transfer.js --contract=ArtNFTs --contractAddress=0xC6D8A5a5Da36B59b690fE56e99Cf9D01618407AB --sender=0x80D422366B4c9216e72C054036d59eDEf47E124E --senderKey=02343c7018f9a5446763e635efc6df7be6f8f6f7972441f9d76d7b0df30b8989 --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --nftFee=100000000 --gas=1000000
* For nftFee, set 0 if the contract does not support payable
* Run Chrome without CORS: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

* nftaddress: 0xa7890dC815bfb784F48e871cfF9840BF08947548, 0x5baB5296b20d5600B7A31566eA9dD484825EFb85, 0x2690564D073737Cb3d26A24203241C38641c88fD, 0xC6D8A5a5Da36B59b690fE56e99Cf9D01618407AB