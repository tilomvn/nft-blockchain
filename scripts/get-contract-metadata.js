require('dotenv').config();

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

const apiKey = process.env.API_KEY;

const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${apiKey}`,
);

async function getMetadata(contractAddress) {
    const metadata = await web3.alchemy.getTokenMetadata(contractAddress);
    console.log("TOKEN METADATA->");
    console.log(metadata);
}

getMetadata("0xe909c0f9c9b00fc72689ea31bffeaa831bc2e7aa");
