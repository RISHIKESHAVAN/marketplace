pragma solidity ^0.5.0;

contract Marketplace {
    // This smart contract will handle all the logic to buy and sell on the marketplace.
    // This will also read from and write to the blockchain.

    // state variable
    string public name;

    // constructors are run only once - when the smart contract is deployed
    constructor() public {
        name = "ETH Marketplace";  
    }

}