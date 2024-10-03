// utils.js

export const formatCreditCardNumber = (value) => {
    if (!value) return value;
    const clearValue = value.replace(/\D+/g, '');
    const nextValue = clearValue.slice(0, 16);
    const formattedValue = nextValue.replace(/(\d{4})/g, '$1 ').trim();
    return formattedValue;
  };
  
  export const formatExpirationDate = (value) => {
    if (!value) return value;
    const clearValue = value.replace(/\D+/g, '');
    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
    return clearValue;
  };
  
  export const formatCVC = (value) => {
    return value.replace(/\D+/g, '').slice(0, 4);
  };
  