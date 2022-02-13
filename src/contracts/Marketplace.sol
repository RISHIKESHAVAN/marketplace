pragma solidity ^0.5.0;

contract Marketplace {

    /** state variable
    Whenever a public variable is declared, a function is automatically
    created with the same name of the variable, that returns the value
    of the variable when called [ in this case, it is 'name()' ].
    */
    string public name;

    // constructors are run only once - when the smart contract is deployed
    constructor() public {
        name = "ETH Marketplace";  
    }

    /**
    Structs are similar to objects. They have their own set of properties defined inside them.
    
    Each Product on the marketplace will have an id, name, price, current owner and a variable 
    to show if it has been purchased.
     */
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    /**
    Mappings are similar to dicts.

    We will maintain a mapping of all the products to their ids.
    */
    mapping(uint => Product) public products;

    /**
    There is no provision in solidity to find the len/size of the products mapping. 
    So if we want to know the total number of products in the marketplace then we 
    need to maintain a separate counter variable for it. 
    */
    uint public productCount = 0;

}