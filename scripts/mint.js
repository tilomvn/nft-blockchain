require('dotenv').config();
const axios = require('axios');
const InputDataDecoder = require('ethereum-input-data-decoder');
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');

const API_URL = process.env.API_URL; //Alchemy App API

function getArgs () {
  const args = {};
  process.argv
      .slice(2, process.argv.length)
      .forEach(arg => {
          // long arg
          if (arg.slice(0,2) === '--') {
              const longArg = arg.split('=');
              const longArgFlag = longArg[0].slice(2,longArg[0].length);
              const longArgValue = longArg.length > 1 ? longArg[1] : true;
              args[longArgFlag] = longArgValue;
          }
          // flags
          else if (arg[0] === '-') {
              const flags = arg.slice(1,arg.length).split('');
              flags.forEach(flag => { args[flag] = true; });
          }
      });
  console.log("Input agrs:");
  console.log(args);
  return args;
}

async function mintNFT() {
  const args = getArgs();
  
  const alchemyWeb3 = createAlchemyWeb3(API_URL);
  const contract = require("../artifacts/contracts/" + args.contract + ".sol/" + args.contract + ".json" );
  const contractAddress = args.contractAddress;
  const receiver = args.receiver;
  const receiverKey = args.receiverKey;
  const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);
  const tokenURI = args.tokenUri;
  const nftFee = args.nftFee;
  const gas = args.gas;

  // get the nonce - nonce is needed for security reasons. It keeps track of the number of
  // transactions sent from our address and prevents replay attacks.
  const nonce = await alchemyWeb3.eth.getTransactionCount(receiver, 'latest');
  const tx = {
    from: receiver, // our MetaMask public key
    to: contractAddress, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: gas, // fee estimate to complete the transaction
    value: nftFee, // amount to be transfered to contract address
    data: nftContract.methods
      .mintNFTContract(tokenURI)
      .encodeABI(), // call the mintNFTContract function from our NFT.sol file and pass the account that should receive the minted NFT.
  };

  const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    tx,
    receiverKey
  );
  signPromise
    .then(signedTx => {
      const signPromiseEvent = alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of our transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of our transaction!");
            axios({
              method: "post",
              url: API_URL,
              data: {
                jsonrpc: "2.0",
                method: "eth_getTransactionByHash",
                params: [hash],
                id: 0
              }
            })
            .then((response) => {
              console.log("Transaction Result:\n", response.data.result);

              console.log("Transaction Metadata:");
              const decoder = new InputDataDecoder(contract.abi);
              console.log(decoder.decodeData(response.data.result.input));
            })
            .catch((error) => { 
              console.log("Get Transaction Info Failed: \n", error);
            });
          } else {
            console.log("Something went wrong when submitting our transaction:\n", err);
          }
        }
      );
      signPromiseEvent.then((tranReceipt) => {
        console.log("Transaction Receipt:\n", tranReceipt);
      }).catch((err) => {
        console.log("Failed Transaction Receipt:\n", err.receipt);
        axios({
          method: "post",
          url: API_URL,
          data: {
            jsonrpc: "2.0",
            method: "trace_call",
            params: [
                {
                  from: err.receipt.from,
                  to: err.receipt.to
                },
                ["trace"], "latest"
            ],
            id: 1
          }
        })
        .then((response) => {
          console.log(response);
          process.exit(1);
        })
        .catch((error) => { 
          console.log("Get Failed Transaction Info Failed:\n", error.response.data);
          process.exit(1);
        });
      });
    })
    .catch((err) => {
      console.log("Promise failed:\n", err);
      process.exit(1);
    });
}

mintNFT();
