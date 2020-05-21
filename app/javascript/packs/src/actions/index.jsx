import {
  LIST_ITEMS,
  PAYMENT_TRANSACTION,
  PAYMENT_FAILED,
  CHECKOUT_LOADER
} from './types';
import Api from '../../../components/Api';
import PayMongoApi from '../../../components/Paymongo';
import { toast } from 'react-semantic-toasts';
import history from '../../src/history';
import axios from 'axios';

export const listItems = () => async dispatch => {
  const response = await Api.get('/api/v1/items.json')

  dispatch({ type: LIST_ITEMS, payload: response })
};

export const fetchItems = () => async(dispatch, getState) => {
  console.log(getState().items);
};

export const processPayment = (formValues) => (dispatch, getState) => {
  dispatch({ type: CHECKOUT_LOADER, payload: { checkoutLoading: true } });
  const amount = getState().items.totalAmount * 100;
  console.log(amount);
  const creditCard = formValues.card;
  const cvc = formValues.cvc;

  const data = JSON.stringify({
    'data': {
      'attributes': {
        'details': {
          'card_number': creditCard,
          'exp_month': 2,
          'exp_year': 24,
          'cvc': cvc
        },
        'type': 'card'
      }
    }
  });

  const paymentIntentData = JSON.stringify({
      'data': {
        'attributes': {
          'payment_method_allowed': ['card'],
          'payment_method_options': {
            'card': {
              'request_three_d_secure': 'automatic'
            }
          },
          'currency': 'PHP',
          'amount': amount
        }
      }
    });

  const requestOne = PayMongoApi.post('/payment_methods', data) ;
  const requestTwo = PayMongoApi.post('/payment_intents', paymentIntentData);

  axios.all(
    [requestOne, requestTwo]
  ).then(
    axios.spread((methodResponse, intentResponse) => {
      return[methodResponse, intentResponse];
    })
  ).then((responses) => {
    const methodResponse = responses[0];
    const intentResponse = responses[1];

    const clientKeyUrl = intentResponse.data.data.id;
    const paymentTransactionData = {
      'data': {
        'attributes': {
          'client_key': intentResponse.data.data.attributes.client_key,
          'payment_method': methodResponse.data.data.id
        }
      }
    };
    return PayMongoApi.post(`/payment_intents/${clientKeyUrl}/attach`, paymentTransactionData)
  }).then((responseTransaction) => {
    const status = responseTransaction.data.data.attributes.status

    toast({
      icon: 'envelope',
      title: 'Transaction Status',
      description: status,
      animation: 'bounce',
      time: 5000
    });

    dispatch({ type: PAYMENT_TRANSACTION, payload: responseTransaction.data })
    setTimeout(() => {
      dispatch({ type: CHECKOUT_LOADER, payload: { checkoutLoading: false } });
      history.push("/");
    }, 5000)
  }).catch(errors => {
    dispatch({ type: PAYMENT_FAILED, payload: errors.response.data.errors })
    dispatch({ type: CHECKOUT_LOADER, payload: { checkoutLoading: false } });
    toast({
      type: 'error',
      icon: 'envelope',
      title: 'Error',
      description: errors.response.data.errors[0].detail,
      animation: 'bounce',
      time: 5000
    });
  });

};