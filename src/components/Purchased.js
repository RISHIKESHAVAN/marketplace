import React, { Component } from 'react';
import './App.css';

class Purchased extends Component {
  render() {
    return (
	<div className='purchased'>
		<h2>Purchased Products</h2>
		<table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          {this.props.ownedProducts.map((product, key) => {
            return (
				<tr key={key}>
				<th scope="row">{product.id.toString()}</th>
				<td>{product.name.toString()}</td>
				<td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
			  </tr>
            )
          })}
        </tbody>
      </table>
	</div>
    );
  }
}

export default Purchased;
