// deploy/00_deploy_your_contract.js
const ethers = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const amount = ethers.utils.parseEther(".01");
  await deploy("LoanRingContract", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: ["Long Ring Contract", amount, "ETH"],
    log: true,
  });

  /*
    // Getting a previously deployed contract
    const LoanRingContract = await ethers.getContract("LoanRingContract", deployer);
    await LoanRingContract.setPurpose("Hello");
    
    //const LoanRingContract = await ethers.getContractAt('LoanRingContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */
};
module.exports.tags = ["LoanRingContract"];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
