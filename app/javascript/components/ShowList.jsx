import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../packs/src/actions';

class ShowList extends React.Component {
  componentDidMount() {
    this.props.fetchItems()
  };

  renderItems() {
    if (this.props.items.items) {
      return this.props.items.items.map(item => {
        return (
          <tr key={item.id}>
            <td data-label={item.id}>
              {item.id}
            </td>
            <td data-label={item.name}>
              {item.name}
            </td>
            <td data-label={item.price}>
              {item.price}
            </td>
          </tr>
        );
      })
    }
  };

  render() {
    return (
      <tbody>
        <tr>
          <th>ID</th>
          <th>Restaurant</th>
          <th>Amount</th>
        </tr>
        {this.renderItems()}
      </tbody>
    );
  };

}

const mapStateToProps = (state) => {
  console.log(state.items.totalAmount);
  return {
    items: state.items,
    totalAmount: state.items.totalAmount
  }
};

export default connect(mapStateToProps, { fetchItems } )(ShowList);