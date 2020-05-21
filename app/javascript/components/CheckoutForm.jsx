import React from 'react';
import { Field, Fields, reduxForm } from 'redux-form';
import { SemanticToastContainer } from 'react-semantic-toasts';
import "react-datepicker/dist/react-datepicker.css";
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

  renderFields = (fields) => {
    return (
      <div className="fields">
        <div className={`input-row field ${fields.month.meta.touched && fields.month.meta.error ? 'error' : ''}`}>
          <label>Month</label>
          <input {...fields.month.input} type="text" placeholder='MM' />
          {this.renderError(fields.month.meta)}
        </div>
        <div className={`input-row field ${fields.year.meta.touched && fields.year.meta.error ? 'error' : ''}`}>
          <label>Year</label>
          <input {...fields.year.input} type="text" placeholder='YYYY' />
          {this.renderError(fields.year.meta)}
        </div>
      </div>
    )
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
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
          <Fields names={[ 'month', 'year' ]} component={this.renderFields}/>

          <br />
          <div className="ui segment">
            <button disabled={this.props.checkoutLoading} className={`ui button primary ${this.props.checkoutLoading ? 'loading' : ''}`}>Checkout</button>
          </div>
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

  if (!formValues.month) {
    errors.month = "Invalid month";
  }

  if (formValues.month > 13 || formValues.month < 1 || (formValues.month && formValues.month.length < 2)) {
    errors.month = "Invalid month"
  }

  if (!formValues.year) {
    errors.year = "Invalid year";
  }

  if (formValues.year > 2025 || formValues.year < 2020) {
    errors.year = "Invalid year"
  }

  var pattern = new RegExp(/[\d]{16}/g);
  if (!pattern.test(formValues.card)) {
    errors.card = 'Invalid credit card';
  }

  return errors;
}

export default reduxForm({
  form: 'checkoutForm',
  validate
})(CheckoutForm);
