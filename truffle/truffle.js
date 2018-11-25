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
      from: "0x24353559dceeed4b2b8b3139530704f9849d5ada",
      gas: 2000000
    }
  }
};
