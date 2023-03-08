import React, { Component } from 'react';
import './App.css';

class Sell extends Component {
  render() {
    return (
		<div className='selling'>
			<h2>Sell Your Product</h2>
			<form onSubmit={(event) => {
				event.preventDefault()
				const name = this.productName.value
				const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
				this.props.createProduct(name, price)
			}}>
				<div className="form-group">
				<input
					id="productName"
					type="text"
					ref={(input) => { this.productName = input }}
					className="form-control"
					placeholder="Product name"
					required />
				</div>
				<div className="form-group">
				<input
					id="productPrice"
					type="text"
					ref={(input) => { this.productPrice = input }}
					className="form-control"
					placeholder="Product price in Ether"
					required />
				</div>
				<button type="submit" className="btn btn-primary">Add Product</button>
			</form>
		  </div>
    );
  }
}

export default Sell;
