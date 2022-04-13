async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const PUBFEERADX = await ethers.getContractFactory("PubFeeArtNFTs");

    // Start deployment, returning a promise that resolves to a contract object
    const pubfeeradx = await PUBFEERADX.deploy();
    console.log("Contract deployed to address:", pubfeeradx.address); //-> 0x5436d22456BD08c4416ED2966bEa424572f9Ab42
 }

 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
  