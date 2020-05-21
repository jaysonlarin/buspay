import React from "react";
import { connect } from 'react-redux';
import { listItems } from '../packs/src/actions';
import ProceedCheckout from './ProceedCheckout';
import ShowList from './ShowList';
import Header from './Header';
import TotalAmount from './TotalAmount';
import Footer from './Footer';
import { Grid, Segment } from 'semantic-ui-react';

class List extends React.Component {

  componentDidMount() {
    this.props.listItems();
  };

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
                  <ProceedCheckout />
                </Grid.Column>
            </Grid>
            <Footer />
          </div>
          <div className="two wide column"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
};

export default connect(mapStateToProps, { listItems })(List);