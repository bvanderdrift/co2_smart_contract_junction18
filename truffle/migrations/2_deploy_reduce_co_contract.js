var ReduceCoContract = artifacts.require("./ReduceCoContract.sol");

module.exports = function(deployer) {
  deployer.deploy(ReduceCoContract);
};
