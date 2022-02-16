pragma solidity >=0.5.0;

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

    /**
    Events are created in order to emit logs that can later be monitored 
    */
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased
    );

    /**
    Params:
    _name - name of the product
    _price - price of the product. Contracts always deal in Wei. 1ETH = 10^18Wei 
    */
    function createProduct(
        string memory _name, 
        uint _price
         ) public {
        // Make sure params are correct
        require(bytes(_name).length > 0);
        require(_price > 0);
        // Increment the product count
        productCount++;
        // Create a Product
        products[productCount] = Product(productCount,_name, _price, msg.sender,false);
        // Trigger an event
        emit ProductCreated(productCount,_name, _price, msg.sender,false);
    }
}