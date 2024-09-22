// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract violation {
    // Struct to store the details of a challan
    struct Challan {
        uint256 id;
        address violator;
        string violationDetails;
        uint256 fineAmount;
        bool isTerminated;
    }

    // Array to store all challans
    Challan[] public challans;
    // Counter for challan IDs
    uint public challanCounter;

    // Pre-defined violation details and their corresponding fines
    mapping(string => uint256) public violationFines;

    // Event to emit when a new challan is generated
    event ChallanGenerated(
        uint id,
        address violator,
        string violationDetails,
        uint fineAmount
    );
    // Event to emit when a challan is updated
    event ChallanUpdated(uint id, string violationDetails, uint fineAmount);
    // Event to emit when a challan is terminated
    event ChallanTerminated(uint id);

    // Constructor to initialize violation details with fines
    constructor() {
        violationFines["Speeding"] = 500;
        violationFines["Parking"] = 200;
        violationFines["No Seatbelt"] = 100;
        // Add more predefined violations and fines as needed
    }

    // Function to generate a new challan
    function generateChallan(
        address _violator,
        string memory _violationDetails
    ) public {
        // Ensure the violation type exists in the pre-defined list
        require(violationFines[_violationDetails] > 0, "Invalid violation type");

        challanCounter++;
        uint fineAmount = violationFines[_violationDetails];  // Fetch fine based on violation type

        Challan memory newChallan = Challan({
            id: challanCounter,
            violator: _violator,
            violationDetails: _violationDetails,
            fineAmount: fineAmount,
            isTerminated: false
        });
        challans.push(newChallan);  // Add the new challan to the array

        emit ChallanGenerated(
            challanCounter,
            _violator,
            _violationDetails,
            fineAmount
        );
    }

    // Function to get a challan's details
    function getChallan(
        uint _id
    )
        external
        view
        returns (
            uint id,
            address violator,
            string memory violationDetails,
            uint fineAmount,
            bool isTerminated
        )
    {
        // Ensure the challan exists
        require(_id > 0 && _id <= challanCounter, "Challan does not exist");

        // Fetch the challan from the array
        Challan memory challan = challans[_id - 1];

        // Return the challan details
        return (
            challan.id,
            challan.violator,
            challan.violationDetails,
            challan.fineAmount,
            challan.isTerminated
        );
    }

    // Function to update a challan's details
    function updateChallan(
        uint _id,
        string memory _violationDetails
    ) public {
        // Ensure the challan exists
        require(_id > 0 && _id <= challanCounter, "Challan does not exist");

        // Fetch the challan from the array
        Challan storage challan = challans[_id - 1];

        // Ensure the challan is not terminated
        require(!challan.isTerminated, "Challan is terminated and cannot be updated");

        // Ensure the new violation type exists in the pre-defined list
        require(violationFines[_violationDetails] > 0, "Invalid violation type");

        // Update the challan details
        challan.violationDetails = _violationDetails;
        challan.fineAmount = violationFines[_violationDetails];

        emit ChallanUpdated(_id, _violationDetails, challan.fineAmount);
    }

    // Function to terminate a challan
    function terminateChallan(uint _id) public {
        // Ensure the challan exists
        require(_id > 0 && _id <= challanCounter, "Challan does not exist");

        // Fetch the challan from the array
        Challan storage challan = challans[_id - 1];

        // Terminate the challan
        challan.isTerminated = true;

        emit ChallanTerminated(_id);
    }
}
