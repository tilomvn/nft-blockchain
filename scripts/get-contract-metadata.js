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
    const metadata = await web3.alchemy.getTokenMetadata("0xe909c0f9c9b00fc72689ea31bffeaa831bc2e7aa");
    console.log("TOKEN METADATA->");
    console.log(metadata);
}

getMetadata();
