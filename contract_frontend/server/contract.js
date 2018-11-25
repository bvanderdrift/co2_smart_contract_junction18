var Web3 = require("web3");
var ObjectBuilder = require("./objectBuilder");

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var myAddress = "0xd052c11cd760a6d85d5068478e69cb6d727952a2";

let contractAddress = '0x0712ad6459ff4fe8707030eeb8304506876119cd';

let contractABI = [{
  "inputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "constant": false,
  "inputs": [],
  "name": "depositFunds",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
},
{
  "constant": true,
  "inputs": [],
  "name": "getTop10Offers",
  "outputs": [
    {
      "name": "",
      "type": "bytes32[10]"
    },
    {
      "name": "",
      "type": "address[10]"
    },
    {
      "name": "",
      "type": "uint256[10]"
    },
    {
      "name": "",
      "type": "uint256[10]"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "coordinates",
      "type": "bytes32"
    },
    {
      "name": "offerAmount",
      "type": "uint256"
    },
    {
      "name": "measurement",
      "type": "uint256"
    }
  ],
  "name": "makeOffer",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "coordinates",
      "type": "bytes32[]"
    },
    {
      "name": "measurements",
      "type": "uint256[]"
    }
  ],
  "name": "submitData",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];

var contract = new web3.eth.Contract(contractABI, contractAddress);

let getOffers = async () => {
  const offerData = await contract.methods.getTop10Offers();
  return ObjectBuilder.mapOffers(offerData);
};

let submitOffer = async req => {
  let contractData = {
    coordinates: "60.190474&24.8187844",
    offerPerUnit: 12,
    measurement: 3 //Only whole numbers
  };
  await contract.methods.makeOffer(
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
