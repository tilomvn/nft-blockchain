# NFTs Smart Contract - Blockchain Technology
## 1. Docs: https://blog.logrocket.com/how-to-create-nfts-with-javascript/
## 2. Installation
* 2.1 Node Js
* Create an Alchemy account at https://www.alchemy.com/
* Create an Ethereum account at https://metamask.io/, available as a Chrome https://metamask.io/download.html
* Get ETH Amount from MetaMask Chrome Extension
## 3. Setting Up NFT Token
* Create root project folder:
```JAVASCRIPT
mkdir ArtNFTs && cd ArtNFTs
```
* Init node project: 
```JAVASCRIPT
npm init -y
```
* Install HardHat:
```JAVASCRIPT
npm install -D hardhat
```
* Initiate HardHat:
```JAVASCRIPT
npx hardhat
```
* Select Create an empty hardhat.config.js
* Create contracts and scripts folder:
```JAVASCRIPT
mkdir contracts && mkdir scripts
```
* Install the OpenZeppelin contracts library:
```JAVASCRIPT
npm i @openzeppelin/contracts@4.0.0
```
* In your contracts directory, create an ArtNFTs.sol(see code in project)
* Install dotenv to store MetaMask Private Key: 
```JAVASCRIPT
npm i dotenv
```
* Create a .env(see source in project) file in the root of your project
* Install Ether.js library that simplifies interacting with the Ethereum blockchain:
```JAVASCRIPT
npm i -D @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```
* Edit hardhat.config.js(see source in project)
* Compile contracts:
```JAVASCRIPT
npx hardhat compile
```
* Create a deployment script deploy.js(see source in project) in your scripts directory
* Deploy contracts:
```
npx hardhat run --network ropsten scripts/deploy.js 
```
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
* Install axios to fetch metadata when minting:
```JAVASCRIPT
npm i axios
```
* Install Alchemy Web3:
```JAVASCRIPT
npm install @alch/alchemy-web3
```
* Create scripts to mint NFTs: in scripts folder, create a file called mint-nft.js(see source in project)
* Mint:
```JAVASCRIPT
node scripts/mint-nft.js
```
* Can see transaction on https://dashboard.alchemyapi.io/mempool
## 5. Customize Mint Cmd Sample
```JAVASCRIPT
node scripts/mint.js --contract=ArtNFTs --contractAddress=0xc385C6E31e7C4340aD5364a9ECbA63C4117c4e9c --receiver=0x80D422366B4c9216e72C054036d59eDEf47E124E --receiverKey=02343c7018f9a5446763e635efc6df7be6f8f6f7972441f9d76d7b0df30b8989 --tokenUri=https://ipfs.io/ipfs/QmYgHzTcUBEpTu2aHMXA9vFLPUR951Q9KCKuiW97baFS4x --nftFee=100000000 --gas=1000000
```
```JAVASCRIPT
node scripts/mint.js --contract=ArtNFTs --contractAddress=0xc385C6E31e7C4340aD5364a9ECbA63C4117c4e9c --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --receiverKey=2f3bfcc7d0b936159c373d642d947926363030e6c500285c593bb01bd002191c --tokenUri=https://ipfs.io/ipfs/QmYgHzTcUBEpTu2aHMXA9vFLPUR951Q9KCKuiW97baFS4x --nftFee=100000000 --gas=1000000
```
```JAVASCRIPT
node scripts/transfer.js --contract=ArtNFTs --contractAddress=0xc385C6E31e7C4340aD5364a9ECbA63C4117c4e9c --sender=0x80D422366B4c9216e72C054036d59eDEf47E124E --senderKey=02343c7018f9a5446763e635efc6df7be6f8f6f7972441f9d76d7b0df30b8989 --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --nftFee=100000000 --gas=1000000
```
```JAVASCRIPT
node scripts/transfer.js --contract=ArtNFTs --contractAddress=0xc385C6E31e7C4340aD5364a9ECbA63C4117c4e9c --sender=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --senderKey=2f3bfcc7d0b936159c373d642d947926363030e6c500285c593bb01bd002191c --receiver=0x80D422366B4c9216e72C054036d59eDEf47E124E --nftFee=100000000 --gas=1000000
```
```JAVASCRIPT
node scripts/transfer.js --contract=ArtNFTs --contractAddress=0xc385C6E31e7C4340aD5364a9ECbA63C4117c4e9c --sender=0x80D422366B4c9216e72C054036d59eDEf47E124E --senderKey=02343c7018f9a5446763e635efc6df7be6f8f6f7972441f9d76d7b0df30b8989 --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --nftFee=100000000 --gas=1000000
```
```JAVASCRIPT
node scripts/read-transaction.js --contract=ArtNFTs --hash=0xad7c3df12eff5776edc9d7f7da4645f848da07ef179f86f0ac55a5d3e5f12bc3
```
* For nftFee, set 0 if the contract does not support payable
* Run Chrome without CORS: "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp

## 6. How to listen to NFT Mints
* Install Alchemy Admin SDK
```JAVASCRIPT
npm install alchemy-sdk
```
* Define your event log topic filters by following this article https://docs.alchemy.com/docs/how-to-listen-to-nft-mints
* Run event listener script
```JAVASCRIPT
node scripts/mint-event-listener.js
```

* nftaddress: 0xc385C6E31e7C4340aD5364a9ECbA63C4117c4e9c
