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
* Creat a deployment script deploy.js(see source in project) in your scripts directory
* Deploy contracts: npx hardhat run scripts/deploy.js --network ropsten
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
* node scripts/mint.js --contract=PubFeeArtNFTs --contractAddress=0x5436d22456BD08c4416ED2966bEa424572f9Ab42 --receiver=0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3 --tokenUri=https://ipfs.io/ipfs/QmYgHzTcUBEpTu2aHMXA9vFLPUR951Q9KCKuiW97baFS4x --nftFee=100000000
* For nftFee, set 0 if the contract does not support payable
