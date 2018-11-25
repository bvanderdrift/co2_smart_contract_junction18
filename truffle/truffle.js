module.exports = {
  rpc: {
    host: "localhost",
    port: 8545
  },
  networks: {
    development: {
      host: "localhost", //our network is running on localhost
      port: 8545, // port where your blockchain is running
      network_id: "*",
      from: "0xd052c11cd760a6d85d5068478e69cb6d727952a2",
      gas: 2000000
    }
  }
};
