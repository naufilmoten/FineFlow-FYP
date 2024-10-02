// PaymentForm.js
import React, { useState } from 'react';
import { usePaymentInputs, PAYMENT_INPUTS } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import './styles.css'; // Ensure this file exists in the same directory

const PaymentForm = ({ onClose, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const {
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    wrapperProps,
    meta,
  } = usePaymentInputs();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with your payment processing logic here

    // For demonstration, we'll just show an alert and trigger success
    alert('Payment Successful!');
    onPaymentSuccess(); // Notify parent component about the successful payment
    onClose(); // Close the payment form
  };

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="App-payment">
          <h1>Enter Your Payment Details</h1>
          <h4>Please input your information below</h4>
          <div {...wrapperProps} className="card-image">
            <img {...getCardImageProps({ images })} alt="" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <small>Name on Card:</small>
              <input
                type="text"
                name="cardName"
                className="form-control"
                placeholder="Name"
                pattern="[a-zA-Z\s-]+"
                required
                value={formData.cardName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <small>Card Number:</small>
              <input
                {...getCardNumberProps({
                  name: 'cardNumber',
                  value: formData.cardNumber,
                  onChange: handleChange,
                })}
                className="form-control"
                placeholder="Card Number"
                required
              />
              {meta.cardNumber.error && (
                <span className="error">{meta.cardNumber.error}</span>
              )}
            </div>
            <div className="form-group">
              <small>Expiration Date:</small>
              <input
                {...getExpiryDateProps({
                  name: 'expiry',
                  value: formData.expiry,
                  onChange: handleChange,
                })}
                className="form-control"
                placeholder="MM/YY"
                required
              />
              {meta.expiryDate.error && (
                <span className="error">{meta.expiryDate.error}</span>
              )}
            </div>
            <div className="form-group">
              <small>CVC:</small>
              <input
                {...getCVCProps({
                  name: 'cvc',
                  value: formData.cvc,
                  onChange: handleChange,
                })}
                className="form-control"
                placeholder="CVC"
                required
              />
              {meta.cvc.error && <span className="error">{meta.cvc.error}</span>}
            </div>
            <div className="form-actions">
              <button type="submit">submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
