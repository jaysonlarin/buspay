import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../packs/src/actions';
import { processPayment } from '../packs/src/actions/index';
import ShowList from './ShowList';
import CheckoutForm from './CheckoutForm';
import TotalAmount from './TotalAmount';
import Footer from './Footer';
import history from '../packs/src/history'

const basicCards = [
  { number: '4343434343434345', brand: 'Visa' },
  { number: '4571736000000075', brand: 'Visa (debit)' },
  { number: '5555444444444457', brand: 'Mastercard' },
  { number: '2221000000000918', brand: 'Mastercard (2-series)' },
  { number: '5455590000000009', brand: 'Mastercard (debit)' },
  { number: '5339080000000003', brand: 'Mastercard (prepaid)' }
]

const secure3DNumbers = [
  { number: '4120000000000007', description: '3DS authentication must be completed for the payment to be marked as paid' },
  { number: '4230000000000004', description: '3DS authentication must be completed but will be declined with generic_decline sub code before authentication. A payment with a failed status will still be created' },
  { number: '5234000000000106', description: '3DS authentication must be completed but will be declined with generic_decline sub code after successful authentication. A payment with a failed status will still be created' },
  { number: '5123000000000001', description: '3DS authentication is supported but not required. The payment will be marked as paid' },
  { number: '2222000000000008', description: '3DS authentication is not supported. The payment will be marked as paid without authentication' },
]

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchItems();
    if (this.props.items.length === 0) {
      history.push("/");
    }
  };

  onSubmit = (formValues) => {
    this.props.processPayment(formValues);
  };

  render() {
    return (
      <div>
        <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
          <div className="ui container">
            <div className="ui grid">
              <div className="twelve wide column">
                <h2>List:</h2>
                <table className="ui celled table">
                  <ShowList />
                </table>
                <TotalAmount amount={this.props.items.totalAmount} />
              </div>
              <div className="four wide column vw-50 vh-50 primary-color d-flex align-items-center justify-content-center">
                <CheckoutForm
                  onSubmit={this.onSubmit}
                  checkoutLoading={this.props.checkoutLoading}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: state.items,
    checkoutLoading: state.loader.checkoutLoading
  }
};

export default connect(mapStateToProps, { fetchItems, processPayment })(Checkout);