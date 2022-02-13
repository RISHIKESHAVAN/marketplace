# Marketplace

A marketplace application based on blockchain where people can buy stuff that are posted by sellers.

## Folder structure

- [*truffle-config.js*](truffle-config.js) - Contains the network configuration of the local blockchain (Ganache) and locations of smart contracts
- [*src/components/*](src/components/) - Contains the *react* files to render the front end
- [*src/contracts/*](src/contracts/) - Contains the smart contracts of the applications which are essentially the back end.

## Contracts

[*Migrations.sol*](src/contracts/Migrations.sol) - A smart contract that helps in migrating other smart contracts.
[*Marketplace.sol*](src/contracts/Marketplace.sol) - Handles all the logic to buy and sell on the marketplace. This will also read from and write to the blockchain.

## Migration Files

At their simplest, migrations are simply a set of managed deployment scripts and they are located inside the [migrations](migrations/) directory. The migrations are run using the `truffle migrate` command.

The files **must** be numbered so that truffle knows the order in which the files should be run. Migration files should contain the details of the contracts that you want to migrate to the blockchain. Failing to configure them will result in an error when calling the `< contract name >.deployed()` function in truffle.