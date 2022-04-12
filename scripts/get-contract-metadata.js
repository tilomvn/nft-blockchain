require('dotenv').config();
// alchemy-token-api/alchemy-web3-script.js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Replace with your Alchemy api key:
const apiKey = process.env.API_KEY;

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${apiKey}`,
);

async function getMetadata() {
    const metadata = await web3.alchemy.getTokenMetadata("0xA8Bb653775B1Fb910E18d6a64c0C2d91aFe72B4B");
    console.log("TOKEN METADATA->");
    console.log(metadata);
}

getMetadata();
