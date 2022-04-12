require('dotenv').config();
const API_URL = process.env.API_URL;
const axios = require('axios');
const InputDataDecoder = require('ethereum-input-data-decoder');

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/PubArtNFTs.sol/PubArtNFTs.json");

const contractAddress = "0xA30B6709f0b89846888dBe0F4a92b0c50AD707c7";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);

const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY_CHROME;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY_CHROME;

async function mintNFT(tokenURI) {
    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
  const nonce = await alchemyWeb3.eth.getTransactionCount(METAMASK_PUBLIC_KEY, 'latest');
  const tx = {
    from: METAMASK_PUBLIC_KEY, // our MetaMask public key
    to: contractAddress, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: 1000000, // fee estimate to complete the transaction
    data: nftContract.methods
      .createPubNFT("0x4D1B5CB23975f0bA70b9D42135e11789075f1aD3", tokenURI)
      .encodeABI(), // call the createPubNFT function from our PubArtNFTs.sol file and pass the account that should receive the minted NFT.
  };

  const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    tx,
    METAMASK_PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of our transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of our transaction!");
            axios({
              method: 'post',
              url: API_URL,
              data: {
                jsonrpc: "2.0",
                method: "eth_getTransactionByHash",
                params: [hash],
                id: 0
              }
            }).then((response) => {
              console.log("Transaction Result:");
              console.log(response.data.result);

              console.log("Transaction Metadata:");
              const decoder = new InputDataDecoder(contract.abi);
              console.log(decoder.decodeData(response.data.result.input));
            })
              .catch((error) => console.log(error));
          } else {
            console.log("Something went wrong when submitting our transaction:", err);
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT("https://ipfs.io/ipfs/QmYgHzTcUBEpTu2aHMXA9vFLPUR951Q9KCKuiW97baFS4x");
