import React, { Component } from 'react';
import './App.css';

class Info extends Component {
  render() {
    return (
	<div>
		<p className='info box'>
		Hi, Welcome to the decentralised marketplace running on the Ethereum network. This is a <b>non-live instance deployed in the Sepolia Test Network</b>. Any purchase/action taken here will not be reflected in the Ethereum main network. If you are new to Ethereum, you can learn more about test/main networks <a href='https://ethereum.org/en/developers/docs/networks/'>here</a>.

		You can purchase products listed by others, list a product that your would like to sell and view your purchases. Make sure that you are using the correct address at the top right corner.
		</p>
	</div>
    );
  }
}

export default Info;
