import React, { Component } from 'react';
import Web3 from 'web3';
// import logo from '../logo.png';
import './App.css';
import Marketplace from '../artifacts/Marketplace.json'
import Navbar from './Navbar.js'
import Main from './Main.js'

class App extends Component {

  async componentWillMount() {
    // This is a lifecycle component - part of React
    // This is run everytime the component gets created
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const ethereum = window.ethereum
    const web3 = window.web3

    // get the accounts
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    this.setState({account : accounts[0]})

    // get the contract data
    const abi = Marketplace.abi
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if (networkData) {
      const marketplace = web3.eth.Contract(abi, networkData.address)
      this.setState({marketplace}) // shorthand for this.setState({marketplace : marketplace})
      const productCount = await marketplace.methods.productCount().call()
      console.log("productCount = ",productCount.toString())
      // Load the products
      for(var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products : [...this.state.products, product]
        })
      }
      
      this.setState({loading : false})
      // console.log(this.state.products)
    } else {
      window.alert("Marketplace contract not deployed to detected network!!")
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account : '',
      productCount : 0,
      products : [],
      loading : true
    };

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  createProduct(name, price) {
    this.setState({loading : true})
    this.state.marketplace.methods.createProduct(name, price).send({from : this.state.account})
    .once('receipt', (receipt) => { 
      this.setState({loading : false})
    })
  }

  purchaseProduct(id, price) {
    this.setState({loading : true})
    this.state.marketplace.methods.purchaseProduct(id).send({from : this.state.account, value : price})
    .once('receipt', (receipt) => { 
      this.setState({loading : false})
    })
  }
  
  render() {
    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading 
                ? <div id='loader' className='text-center'><p className='text-center'>Loading...</p></div>
                : <Main 
                  userAccount={this.state.account}
                  products = {this.state.products}
                  createProduct = {this.createProduct}
                  purchaseProduct = {this.purchaseProduct}/>
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
