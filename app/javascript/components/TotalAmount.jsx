import React from 'react';

const TotalAmount = ({amount}) => {
  return (
    <div className="ui message">
    <div>
      <h3>Please pay:</h3>
      <span>PHP {amount}</span>
    </div>
  </div>
  );
}

export default TotalAmount;