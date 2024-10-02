// PaymentForm.js
import React, { useState } from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/lib/styles.css'; // Adjusted import path
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './utils'; // Ensure utils.js is in the same directory
import './styles.css'; // Ensure styles.css is in the same directory

const PaymentForm = ({ onClose, onPaymentSuccess }) => {
  const [form, setForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setForm({ ...form, issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setForm({
      ...form,
      focused: target.name
    });
  };

  const handleInputChange = ({ target }) => {
    let value = target.value;
    if (target.name === 'number') {
      value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      value = formatCVC(target.value);
    }

    setForm({
      ...form,
      [target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you can integrate with your payment processing logic
    alert('You have finished payment!');
    onPaymentSuccess(); // Notify parent component about the successful payment
    onClose(); // Close the payment form
  };

  const { name, number, expiry, cvc, focused, issuer } = form;

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className='App-payment'>
          <h1>Enter your payment details</h1>
          <h4>Please input your information below</h4>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
          />
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <small>Name on card:</small>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Name'
                pattern='[a-z A-Z-]+'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className='form-group'>
              <small>Card Number:</small>
              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                maxLength='19'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className='form-group'>
              <small>Expiration Date:</small>
              <input
                type='tel'
                name='expiry'
                className='form-control'
                placeholder='Valid Thru'
                pattern='\d\d/\d\d'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className='form-group'>
              <small>CVC:</small>
              <input
                type='tel'
                name='cvc'
                className='form-control'
                placeholder='CVC'
                pattern='\d{3}'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <input type='hidden' name='issuer' value={issuer} />
            <div className='form-actions'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
