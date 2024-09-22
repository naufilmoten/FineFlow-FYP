const FinePayment = artifacts.require("FinePayment");
const ViolationStorage = artifacts.require("violation");

module.exports = function (deployer) {
  deployer.deploy(FinePayment);
  deployer.deploy(ViolationStorage);
};
