import React from 'react';
import history from '../packs/src/history';

class ProceedCheckout extends React.Component {
  checkoutClicked() {
    history.push('/checkout')
  };

  render() {
    return (
      <div>
        <button className="ui right floated blue button" onClick={this.checkoutClicked}>
          Proceed To Checkout
        </button>
      </div>
    )
  }
};

export default ProceedCheckout;