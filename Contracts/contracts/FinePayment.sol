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

    // Mappings to store payments and track challans' status
    mapping(uint => Payment) public payments;
    mapping(uint => bool) public challanStatus; // Mapping to track if a challan is paid/terminated
    
    uint public paymentCounter; // Counter for payments

    // Event to emit when a new payment is processed
    event PaymentProcessed(uint paymentId, address violator, uint challanId, uint fineAmount, uint timestamp);

    // Function to handle payment for an existing challan
    function payChallan(uint _challanId) public payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        require(!challanStatus[_challanId], "Challan already paid");

        // Increment the payment counter and store payment details
        paymentCounter++;
        payments[paymentCounter] = Payment(paymentCounter, msg.sender, _challanId, msg.value, true, block.timestamp);

        // Mark the challan as terminated (paid)
        challanStatus[_challanId] = true;

        // Emit the payment processed event
        emit PaymentProcessed(paymentCounter, msg.sender, _challanId, msg.value, block.timestamp);
    }

    // Function to check if a challan is paid
    function isChallanPaid(uint _challanId) public view returns (bool) {
        return challanStatus[_challanId];
    }
}
