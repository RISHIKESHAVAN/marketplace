require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: { // network configs of the local block chain
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/', // location of the smart contracts
  contracts_build_directory: './src/artifacts/', // location of compiled smart contracts - ABI: Abstract Binary Interface
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
