import React, { Component } from 'react';
import './App.css';
import Info from './Info.js'
import Sell from './Sell.js'
import Buy from './Buy.js'
import Purchased from './Purchased';

class Main extends Component {
  render() {
    return (
    <div id="content">
        <Info/>

        
        <Buy 
        userAccount={this.props.userAccount}
        products = {this.props.products}
        createProduct = {this.props.createProduct}
        purchaseProduct = {this.props.purchaseProduct}/>

        <Sell
        createProduct = {this.props.createProduct}/>
        <Purchased 
        userAccount={this.props.userAccount}
        products = {this.props.products}
        createProduct = {this.props.createProduct}
        purchaseProduct = {this.props.purchaseProduct}
        ownedProducts = {this.props.ownedProducts}/>

    </div>
    );
  }
}

export default Main;
