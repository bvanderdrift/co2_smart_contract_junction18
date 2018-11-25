var Web3 = require("web3");
var ObjectBuilder = require("./objectBuilder");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var myAddress = ""; //TBD

let contractAddress = ""; //TBD

let contractABI = []; //TODO:

var contract = new web3.eth.Contract(contractABI, contractAddress);

let getOffers = async () => {
  const offerData = await contract.methods.getTop10Offers();
  return ObjectBuilder.mapOffers(offerData);
};

let submitOffer = async req => {
  let contractData = {
    recipient: "", //TBD
    coordinates: "60.190474&24.8187844",
    offerPerUnit: 12,
    measurement: 3 //Only whole numbers
  };
  await contract.methods.submitOffer(
    contractData.recipient,
    contractData.coordinates,
    contractData.offerPerUnit,
    contractData.measurement
  );
};

let addToFund = async req => {
  contract.methods.addToFund.sendTransaction();
};

module.exports = {
  getOffers,
  submitOffer,
  addToFund
};
