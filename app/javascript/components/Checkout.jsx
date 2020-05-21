import React from 'react';
import { connect } from 'react-redux';
import { processPayment } from '../packs/src/actions/index';
import ShowList from './ShowList';
import CheckoutForm from './CheckoutForm';
import TotalAmount from './TotalAmount';
import Header from './Header';
import Footer from './Footer';
import history from '../packs/src/history';
import { Grid, Segment, Button, Modal, Icon, Card } from 'semantic-ui-react';

const positiveCards = [
  { header: '4343434343434345', description: 'Visa' },
  { header: '4571736000000075', description: 'Visa (debit)' },
  { header: '5555444444444457', description: 'Mastercard' },
  { header: '2221000000000918', description: 'Mastercard (2-series)' },
  { header: '5455590000000009', description: 'Mastercard (debit)' },
  { header: '5339080000000003', description: 'Mastercard (prepaid)' },
]

const negativeCards = [
  { header: '4200000000000018', description: 'The card used has already expired.' },
  { header: '4300000000000017', description: 'The inputted CVC/CVN is incorrect for the the card number passed.' },
  { header: '4400000000000016', description: 'The payment failed to be processed due to unknown reasons.' },
  { header: '4500000000000015', description: 'The payment was blocked by the processor as they suspect it to be fraudulent.' },
  { header: '5100000000000198', description: 'The card does not have sufficient funds to complete the transaction.' },
  { header: '5200000000000197', description: 'The transaction was blocked by the processor as they suspect it to be fraudulent.' },
  { header: '5300000000000196', description: 'The card used is reported lost.' },
  { header: '5400000000000195', description: 'The card used is reported stolen.' },
  { header: '5500000000000194', description: 'The processing of the card failed due to unknown reason.' },
  { header: '4600000000000014', description: "The transaction is blocked by PayMongo's fraud detection engine." },
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
    if (this.props.items.length === 0) {
      history.push("/");
    }
  };

  onSubmit = (formValues) => {
    this.props.processPayment(formValues);
  };

  testNumbers = () => {
    return (
      <div>
        <Modal trigger={<Icon circular name="plus circle" />} centered={true}>
          <Modal.Header>Select a Positive Scenario</Modal.Header>
          <Modal.Content image>
          <Grid divided columns='equal'>
          <Grid.Column>
            <Card.Group items={positiveCards} />
          </Grid.Column>
        </Grid>
          </Modal.Content>
        </Modal>
        <Modal trigger={<Icon name="minus circle" />} centered={true}>
          <Modal.Header>Select a Negative Scenario</Modal.Header>
          <Modal.Content image>
          <Grid divided columns='equal'>
          <Grid.Column>
            <Card.Group items={negativeCards} />
          </Grid.Column>
        </Grid>
          </Modal.Content>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div className='center-container'>
        <div className='center-position ui relaxed grid middle aligned'>
          <div className="two wide column"></div>
          <div className="twelve wide column flex-me">
            <Header />
            <Grid columns='equal'>
                <Grid.Column width={8}>
                  <Segment>
                    <h2>List:</h2>
                    <table className="ui celled table">
                      <ShowList />
                    </table>
                    <TotalAmount amount={this.props.items.totalAmount} />
                  </Segment>
                </Grid.Column>
                <Grid.Column>

                  <CheckoutForm
                    onSubmit={this.onSubmit}
                    checkoutLoading={this.props.checkoutLoading}
                  />
                  {this.testNumbers()}
                </Grid.Column>
            </Grid>
            <Footer />
            </div>
          <div className="two wide column"></div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    checkoutLoading: state.loader.checkoutLoading
  }
};

export default connect(mapStateToProps, { processPayment })(Checkout);