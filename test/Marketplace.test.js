const { assert } = require("chai")

require("chai").use(require('chai-as-promised')).should()

// imports the contract into the test file
const Marketplace = artifacts.require("./Marketplace.sol")

// deployer, seller, buyer are the addresses from ganache
contract('Marketplace', ([deployer, seller, buyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = await marketplace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has the correct name', async () => {
            const name = await marketplace.name()
            assert.equal(name, 'ETH Marketplace')
        })
    })

    describe('products', async () => {
        let result, productCount

        before(async () => {
            // we want to tell solidity that it is the `seller` who is calling the function
            // so we send it as the "metadata" to the function call
            // metdata are mentioned in {} after the normal args to the function
            result = await marketplace.createProduct('iPhone X',web3.utils.toWei('1','Ether'), {from: seller})
            productCount = await marketplace.productCount()
        })

        it('creates product', async () => {
            // SUCCESS CASES
            assert.equal(productCount, 1)
            // This prints the logs of the `ProductCreated` event
            // We can parse the data in the logs to make assertions
            // console.log(result.logs)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(),'ID is correct')
            assert.equal(event.name, 'iPhone X','Name is correct')
            assert.equal(event.price,web3.utils.toWei('1','Ether'),'Price is correct')
            // since during the creation of the product, we sent the metadata that the 
            // the function call was from the "seller" address, we compare the owner of
            // the product to the seller address
            assert.equal(event.owner, seller,'Owner is correct')
            assert.equal(event.purchased, false,'Purchased flag is correct')

            // FAILURES
            // Product name must be provided
            await marketplace.createProduct('',web3.utils.toWei('1','Ether'), {from: seller}).should.be.rejected;
            // Price must be greates than 0
            await marketplace.createProduct('iPhone X',0, {from: seller}).should.be.rejected;
        })

        it('lists product', async () => {
            // SUCCESS CASES
            const product = await marketplace.products(productCount)
            assert.equal(product.id.toNumber(), productCount.toNumber(),'ID is correct')
            assert.equal(product.name, 'iPhone X','Name is correct')
            assert.equal(product.price,web3.utils.toWei('1','Ether'),'Price is correct')
            assert.equal(product.owner, seller,'Owner is correct')
            assert.equal(product.purchased, false,'Purchased flag is correct')
        })

        it('sells product', async () => {
            // Track the seller balance before purchase
            let oldSellerBalance
            oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)
            
            // SUCCESS CASES
            result = await marketplace.purchaseProduct(productCount, {from: buyer, value:web3.utils.toWei('1','Ether')})
            // console.log(result.logs[0].args)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(),'ID is correct')
            assert.equal(event.name, 'iPhone X','Name is correct')
            assert.equal(event.price,web3.utils.toWei('1','Ether'),'Price is correct')
            assert.equal(event.owner, buyer,'Buyer is correct')
            assert.equal(event.purchased, true,'Purchased flag is correct')

            // Check seller balance after purchase
            let newSellerBalance
            newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)

            let price
            price = web3.utils.toWei('1','Ether')
            price = new web3.utils.BN(price)

            const expectedBalance = oldSellerBalance.add(price)
            assert.equal(newSellerBalance.toString(), expectedBalance.toString())

            // FAILURE: 
            await marketplace.purchaseProduct(productCount+1, {from: buyer, value:web3.utils.toWei('1','Ether')}).should.be.rejected;
            await marketplace.purchaseProduct(productCount, {from: buyer, value:web3.utils.toWei('1','Ether')}).should.be.rejected;
            await marketplace.purchaseProduct(productCount, {from: buyer, value:web3.utils.toWei('0.5','Ether')}).should.be.rejected;
            await marketplace.purchaseProduct(productCount, {from: seller, value:web3.utils.toWei('1','Ether')}).should.be.rejected;

        })
    })

})