import React from "react";
import { connect } from 'react-redux';
import { listItems } from '../packs/src/actions';
import ProceedCheckout from './ProceedCheckout';
import ShowList from './ShowList';
import TotalAmount from './TotalAmount';
import Footer from './Footer';

class List extends React.Component {

  componentDidMount() {
    this.setState({ buttonLoading: false });
    this.props.listItems();
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
                <ProceedCheckout />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    items: state.items
  }
};

export default connect(mapStateToProps, { listItems })(List);