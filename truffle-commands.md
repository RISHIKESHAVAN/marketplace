This page contains the different truffle commands that can be used to interact with the project. 

- `truffle compile` - Compiles the project. Run this in the root directory of the project.
- `truffle migrate` - Runs the migrations

To be run inside the `truffle console`:

- `web3.eth.getAccounts()` - Returns the accounts created in Ganache
- `web3.eth.getBlockNumber()` - Returns the current block number
- `Marketplace.deployed()` - Fetches the deployed contract. The returned object can be stored in a variable like `mrktplce = Marketplace.deployed()`.
- `mrktplce.address` - Gives the address of the contract on the blockchain
- `mrktplce.name()` - Returns the value that was set to the `string public name` variable inside the constructor of the contract. `name()` was the function that was automatically created when the public variable was declared.