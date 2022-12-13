async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  //const RADX = await ethers.getContractFactory("ArtNFTs");
  const RADX = await ethers.getContractFactory("DEFIs");

  // Start deployment, returning a promise that resolves to a contract object
  const radx = await RADX.deploy("Defi", "AA");
  await radx.deployed();

  console.log("Contract deployed to address:", radx.address);
 }

 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
