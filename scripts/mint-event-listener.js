const { Network, Alchemy } = require('alchemy-sdk');
require('dotenv').config();

const API_URL = process.env.API_URL; //Alchemy App API

const settings = {
  apiKey: API_URL, // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// This is the "transfer event" topic we want to watch.
const mintTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const zeroTopic = "0x0000000000000000000000000000000000000000000000000000000000000000";

// Transfer topic
const transferTopic = "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925";
const zeroTransferTopic = "0x00000000000000000000000080d422366b4c9216e72c054036d59edef47e124e";

// This is the NFT contract we want to watch.
const nftContractAddress = "0xFB63aD8F48a8dc2c8824D14B2ff47328A4c65A5a";

// Create the log options object.
const mintEvents = {
    address: nftContractAddress,
    topics: [mintTopic, zeroTopic, transferTopic, zeroTransferTopic]
};

// TODO: Add whatever logic you want to run upon mint events.
const actionWithTxn = (txn) => console.log(txn);

// Open the websocket and listen for events!
console.log("Listening to events...");
alchemy.ws.on(mintEvents, actionWithTxn);
