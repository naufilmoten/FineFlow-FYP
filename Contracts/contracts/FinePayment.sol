// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FinePayment {
    // Struct to store payment details
    struct Payment {
        uint id;
        address violator;
        uint challanId;
        string fineAmount;
        bool isPaid;
        uint paymentTimestamp;
    }

    // Array to store all payments
    Payment[] public payments; // Store payments in an array

    mapping(uint => bool) public challanStatus; // Mapping to track if a challan is paid/terminated

    uint public paymentCounter; // Counter for payments

    // Event to emit when a new payment is processed
    event PaymentProcessed(
        uint paymentId,
        address violator,
        uint challanId,
        string fineAmount,
        uint timestamp
    );

    // Function to handle payment for an existing challan
    function payChallan(uint _challanId) public payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        require(!challanStatus[_challanId], "Challan already paid");

        // Increment the payment counter and store payment details
        paymentCounter++;
        payments.push(
            Payment(
                paymentCounter,
                msg.sender,
                _challanId,
                uintToString(msg.value),
                true,
                block.timestamp
            )
        );

        // Mark the challan as terminated (paid)
        challanStatus[_challanId] = true;

        // Emit the payment processed event
        emit PaymentProcessed(
            paymentCounter,
            msg.sender,
            _challanId,
            uintToString(msg.value),
            block.timestamp
        );
    }

    // Function to check if a challan is paid
    function isChallanPaid(uint _challanId) public view returns (bool) {
        return challanStatus[_challanId];
    }

    // Helper function to convert uint to string
    function uintToString(uint v) internal pure returns (string memory) {
        if (v == 0) {
            return "0";
        }
        uint j = v;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (v != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(v - (v / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            v /= 10;
        }
        return string(bstr);
    }
}
