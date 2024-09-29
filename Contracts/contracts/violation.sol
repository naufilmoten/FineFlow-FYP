// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract violation {
    // Struct to store the details of a challan
    struct Challan {
        uint256 id;
        address violator;
        string violatorCnic;     // CNIC of the violator
        string violatorName;     // Name of the violator
        address warden;          // Address of the warden issuing the challan
        string wardenUserName;   // Username of the warden issuing the challan
        string violationDetails; // Details of the violation
        string location;         // Location where violation occurred
        uint256 date;            // Timestamp of the violation
        uint256 fineAmount;      // Fine amount for the violation
        bool isTerminated;       // Status if challan is terminated
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
        string violatorCnic,
        string violatorName,
        address warden,
        string wardenUserName,
        string violationDetails,
        string location,
        uint256 date,
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
        violationFines["Traffic Signal Violation"] = 800;
        violationFines["Wrong Way"] = 300;
        violationFines["Tinted Windows"] = 400;
        // Add more predefined violations and fines as needed
    }

    // Function to generate a new challan
    function generateChallan(
        address _violator,
        string memory _violatorCnic,
        string memory _violatorName,
        string memory _violationDetails,
        string memory _location,
        uint256 _date
    ) public {
        // Ensure the violation type exists in the pre-defined list
        require(violationFines[_violationDetails] > 0, "Invalid violation type");

        challanCounter++;
        uint fineAmount = violationFines[_violationDetails];  // Fetch fine based on violation type

        Challan memory newChallan = Challan({
            id: challanCounter,
            violator: _violator,
            violatorCnic: _violatorCnic,
            violatorName: _violatorName,
            warden: msg.sender,  // The warden issuing the challan is the sender of the transaction
            wardenUserName: "",  // We leave the username empty for now; it can be handled separately
            violationDetails: _violationDetails,
            location: _location,
            date: _date,
            fineAmount: fineAmount,
            isTerminated: false
        });
        challans.push(newChallan);  // Add the new challan to the array

        emit ChallanGenerated(
            challanCounter,
            _violator,
            _violatorCnic,
            _violatorName,
            msg.sender,  // The warden issuing the challan
            "",  // Empty username for now
            _violationDetails,
            _location,
            _date,
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
            string memory violatorCnic,
            string memory violatorName,
            address warden,
            string memory wardenUserName,
            string memory violationDetails,
            string memory location,
            uint256 date,
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
            challan.violatorCnic,
            challan.violatorName,
            challan.warden,
            challan.wardenUserName,
            challan.violationDetails,
            challan.location,
            challan.date,
            challan.fineAmount,
            challan.isTerminated
        );
    }

    // Function to get all challans by a specific citizen (violator)
    function getChallansByCitizen(address _citizen) public view returns (Challan[] memory) {
        uint count = 0;
        
        // Count the number of challans associated with the citizen
        for (uint i = 0; i < challans.length; i++) {
            if (challans[i].violator == _citizen) {
                count++;
            }
        }

        Challan[] memory result = new Challan[](count);
        uint index = 0;

        // Retrieve the challans associated with the citizen
        for (uint i = 0; i < challans.length; i++) {
            if (challans[i].violator == _citizen) {
                result[index] = challans[i];
                index++;
            }
        }
        
        return result;
    }

    // Function to get all challans issued by a specific warden
    function getChallansByWarden(address _warden) public view returns (Challan[] memory) {
        uint count = 0;

        // Count the number of challans issued by the warden
        for (uint i = 0; i < challans.length; i++) {
            if (challans[i].warden == _warden) {
                count++;
            }
        }

        Challan[] memory result = new Challan[](count);
        uint index = 0;

        // Retrieve the challans issued by the warden
        for (uint i = 0; i < challans.length; i++) {
            if (challans[i].warden == _warden) {
                result[index] = challans[i];
                index++;
            }
        }
        
        return result;
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

        // Ensure only the original warden can update the challan
        require(challan.warden == msg.sender, "Only the warden who issued the challan can update it");

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

        // Ensure only the original warden can terminate the challan
        require(challan.warden == msg.sender, "Only the warden who issued the challan can terminate it");

        // Terminate the challan
        challan.isTerminated = true;

        emit ChallanTerminated(_id);
    }
}
