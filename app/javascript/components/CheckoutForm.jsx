import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

class CheckoutForm extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, placeholder, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' placeholder={placeholder} />
        {this.renderError(meta)}
      </div>
    )
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <SemanticToastContainer />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field
            name="card"
            component={this.renderInput}
            label="Enter credit card number"
            placeholder="16-digit number"
          />
          <Field
            name="cvc"
            component={this.renderInput}
            label="Enter cvc"
            placeholder="3-digit number"
          />
          <button disabled={this.props.checkoutLoading} className={`ui button primary ${this.props.checkoutLoading ? 'loading' : ''}`}>Checkout</button>
        </form>
      </div>
    )
  }
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.card) {
    errors.card = "You must enter a card number";
  }

  if (!formValues.cvc) {
    errors.cvc = "You must enter a cvc";
  }

  return errors;
}

export default reduxForm({
  form: 'checkoutForm',
  validate
})(CheckoutForm);