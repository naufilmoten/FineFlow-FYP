const FinePayment = artifacts.require("FinePayment");
const ViolationStorage = artifacts.require("violation");
const ViolationCounter = artifacts.require("ViolationCounter");

module.exports = async function (deployer) {
  await deployer.deploy(FinePayment);
  
  // Deploy the ViolationCounter first, if not already deployed
  await deployer.deploy(ViolationCounter);
  const violationCounterInstance = await ViolationCounter.deployed();

  // Now deploy the violation contract with the address of ViolationCounter
  await deployer.deploy(ViolationStorage, violationCounterInstance.address);
};
