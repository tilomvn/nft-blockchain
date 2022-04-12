async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());
    const PUBRADX = await ethers.getContractFactory("PubArtNFTs");

    // Start deployment, returning a promise that resolves to a contract object
    const pubradx = await PUBRADX.deploy();
    console.log("Contract deployed to address:", pubradx.address); //-> 0xA30B6709f0b89846888dBe0F4a92b0c50AD707c7
 }

 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });
  