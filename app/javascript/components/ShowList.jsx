import React from 'react';
import { connect } from 'react-redux';

class ShowList extends React.Component {
  renderItems() {
    if (this.props.items.length == 0 ) {
      return (
        <tr className="ui segment">
          <td colSpan='3' rowSpan='5' className="ui active dimmer">
            <div className="ui text loader">Loading...</div>
          </td>
        </tr>
      );
    };

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
  return {
    items: state.items
  }
};

export default connect(mapStateToProps, { } )(ShowList);