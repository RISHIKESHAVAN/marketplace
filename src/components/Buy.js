import React, { Component } from 'react';
import './App.css';

class Buy extends Component {
  render() {
    return (
		<div className='buy'>
		<h2>Available Products in the Marketplace</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          {this.props.products.map((product, key) => {
            return (
            <tr key={key}>
              <th scope="row">{product.id.toString()}</th>
              <td>{product.name.toString()}</td>
              <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
              <td>{product.owner.toString()}</td>
              <td>
                {this.props.userAccount.toString() !== product.owner.toString().toLowerCase() && !product.purchased
                ? <button 
                  name = {product.id}
                  value = {product.price}
                  onClick={(event) => {
                      this.props.purchaseProduct(event.target.name, event.target.value)
                      console.log(this.props.userAccount)
                  }}>
                  Buy
                  </button>
                : null
                }
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
		</div>
    );
  }
}

export default Buy;
