require('dotenv').config();
const axios = require('axios');
const InputDataDecoder = require('ethereum-input-data-decoder');

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

async function readTransaction() {
  const args = getArgs();
  // const contract = require("../artifacts/contracts/" + args.contract + ".sol/" + args.contract + ".json" );
  axios({
    method: "post",
    url: API_URL,
    data: {
      jsonrpc: "2.0",
      method: "eth_getTransactionByHash",
      params: [args.hash],
      id: 0
    }
  })
  .then((response) => {
    console.log("Transaction Result:\n", response.data.result);

    // console.log("Transaction Metadata:");
    // const decoder = new InputDataDecoder(contract.abi);
    // console.log(decoder.decodeData(response.data.result.input));
  })
  .catch((error) => { 
    console.log("Get Transaction Info Failed:\n", error);
  });
}

readTransaction();
