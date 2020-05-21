import axios from 'axios';

const PayMongoApi = axios.create({
  baseURL: 'https://api.paymongo.com/v1',
  headers: {
    'Authorization': 'Basic c2tfdGVzdF9Sb1RhWHA0cE02N2kxVjNKQWM3VzdMNkc=',
    'Content-Type': 'application/json'
  }
});

export default PayMongoApi;