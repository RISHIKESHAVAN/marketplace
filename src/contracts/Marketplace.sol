pragma solidity ^0.5.0;

contract Marketplace {

    // state variable
    // Whenever a public variable is declared, a function is automatically
    // created with the same name of the variable, that returns the value
    // of the variable when called [ in this case, it is 'name()' ].
    string public name;

    // constructors are run only once - when the smart contract is deployed
    constructor() public {
        name = "ETH Marketplace";  
    }

}