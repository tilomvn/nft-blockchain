const axios = require('axios');
const https = require('https');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

axios.defaults.httpsAgent = httpsAgent;

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

  axios({
    method: "get",
    url: "https://46.137.226.27:5001/api/healthcheck",
    data: {}
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => { 
    console.log(error);
  });
}

mintNFT();
