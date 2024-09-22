// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FinePayment {
    // Struct to store payment details
    struct Payment {
        uint id;
        address violator;
        uint challanId;
        uint fineAmount;
        bool isPaid;
        uint paymentTimestamp;
    }

    // Mapping to store payments with a unique ID
    mapping(uint => Payment) public payments;
    // Counter for payment IDs
    uint public paymentCounter;

    // Event to emit when a new payment is created
    event PaymentCreated(uint id, address violator, uint challanId, uint fineAmount);
    // Event to emit when a payment is made
    event PaymentMade(uint id, uint timestamp);

    // Function to create a payment for a challan
    function createPayment(address _violator, uint _challanId, uint _fineAmount) public {
        paymentCounter++;
        payments[paymentCounter] = Payment(paymentCounter, _violator, _challanId, _fineAmount, false, 0);
        emit PaymentCreated(paymentCounter, _violator, _challanId, _fineAmount);
    }

    function makePayment(uint _paymentId) public payable {
    Payment storage payment = payments[_paymentId];
    require(payment.id != 0, "Payment does not exist");
    require(!payment.isPaid, "Payment already made");
    require(msg.value == payment.fineAmount, "Incorrect payment amount"); // This is the check that should throw an error
    payment.isPaid = true;
    payment.paymentTimestamp = block.timestamp;

    emit PaymentMade(_paymentId, block.timestamp);
}

    // Function to get payment details by ID
    function getPaymentDetails(uint _paymentId) public view returns (uint, address, uint, uint, bool, uint) {
        Payment memory payment = payments[_paymentId];
        require(payment.id != 0, "Payment does not exist");

        return (payment.id, payment.violator, payment.challanId, payment.fineAmount, payment.isPaid, payment.paymentTimestamp);
    }
}
