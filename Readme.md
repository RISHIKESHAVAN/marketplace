# Marketplace

A marketplace application based on blockchain where users can buy/sell products. The marketplace can be accessed [here](https://rishikeshavan.github.io/marketplace/).

# Files

### Folder structure

- [_migrations/_](migrations/) - Contains the migration scripts.
- [_src/components/_](src/components/) - Contains the [React](https://reactjs.org/) files to render the front end.
- [_src/contracts/_](src/contracts/) - Contains the smart contracts of the applications which are essentially the back end.

### Contracts

- [_Migrations.sol_](src/contracts/Migrations.sol) - A smart contract that helps in migrating other smart contracts.
- [_Marketplace.sol_](src/contracts/Marketplace.sol) - Handles all the logic to buy and sell on the marketplace. This will also read from and write to the blockchain.

### Migration Files

At their simplest, migrations are simply a set of managed deployment scripts and they are located inside the [migrations](migrations/) directory. The migrations are run using the `truffle migrate` command.

The files **must** be numbered so that truffle knows the order in which the files should be run. Migration files should contain the details of the contracts that you want to migrate to the blockchain. Failing to configure them will result in an error when calling the `< contract name >.deployed()` function in truffle.

### Config Files

- [_truffle-config.js_](truffle-config.js) - Contains the network configuration of the local blockchain (Ganache) and locations of smart contracts

# Commands

- `truffle compile` - Checks the contracts for any errors and compiles them.
- `truffle migrate` - Deploys the contracts to the blockchain. Ensure that the Ganache blockchain is running and the migration files are present inside [_migrations/_](migrations/).
- `truffle test` - Runs all the tests.

# Deployment Details

The contract has been deployed in the Sepolia Test Network and the deployment of the contract can be verified on https://sepolia.etherscan.io/.

- [Deployment Transaction](https://sepolia.etherscan.io/tx/0x760475979d88a1cae08af8928260bea392f0efabf93641edc13724340656edd1)
- [Contract Address](https://sepolia.etherscan.io/address/0x3532c405abf2c3226342cf9e31f72f092b7d43fd)
