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
        name = "Rishi's Marketplace";
    }

    /**
    Structs are similar to objects. They have their own set of properties defined inside them.
    
    Each Product on the marketplace will have an id, name, price, current owner and a variable 
    to show if it has been purchased.
     */
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
    }

    /**
    Mappings are similar to dicts.

    We will maintain a mapping of all the products to their ids.
    */
    mapping(uint256 => Product) public products;

    /**
    There is no provision in solidity to find the len/size of the products mapping. 
    So if we want to know the total number of products in the marketplace then we 
    need to maintain a separate counter variable for it. 
    */
    uint256 public productCount = 0;

    /**
    Events are created in order to emit logs that can later be monitored 
    */
    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    /**
    Function used to create a new product.

    Params:
    _name - name of the product
    _price - price of the product. Contracts always deal in Wei. 1ETH = 10^18Wei 
    */
    function createProduct(string memory _name, uint256 _price) public {
        // Make sure params are correct
        require(bytes(_name).length > 0);
        require(_price > 0);
        // Increment the product count
        productCount++;
        // Create a Product
        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            false
        );
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }

    /**
    Function used to purchase a product.
    Params:
    _id - Id of the product
     */
    function purchaseProduct(uint256 _id) public payable {
        // Fetch the product
        Product memory _product = products[_id];

        // Validate the request:
        // If the _id does not exist in the mapping then a default struct
        // with id = 0 will be returned. Since we won't have any product with
        // id as 0, we have the check.
        require(_product.id != 0, "Product ID does not exist");
        require(!_product.purchased, "Product already purchased");
        require(
            msg.value >= _product.price,
            "Insufficient funds sent to make the purchase"
        );
        require(msg.sender != _product.owner, "Seller cannot be buyer");

        // Get current owner
        address payable _seller = _product.owner;
        // Transfer ownership
        _product.owner = msg.sender;
        // Flag product as purchased
        _product.purchased = true;
        // Update the directory with the product
        products[_id] = _product;
        // Pay the seller
        _seller.transfer(msg.value);

        emit ProductPurchased(
            _product.id,
            _product.name,
            _product.price,
            msg.sender,
            _product.purchased
        );
    }
}
