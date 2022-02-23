import React, { Component } from 'react';
import Web3 from 'web3';
// import logo from '../logo.png';
import './App.css';

class App extends Component {

  async componentWillMount() {
    console.log('Inside componentWillUnmount');
    // This is a lifecycle component - part of React
    // This is run everytime the component gets created
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  
  async loadWeb3() {
    console.log('Inside loadWeb3')
    if (window.ethereum) {
      window.web3 = window.ethereum
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
    console.log('Inside loadBlockchainData')
    const ethereum = window.ethereum

    // get the accounts
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts)
  }
  
  render() {
    return (
      <div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>ETH Marketplace</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
