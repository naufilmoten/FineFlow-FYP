// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ViolationCounter {
    // Mapping to store count of each violation type
    mapping(string => uint256) public violationCounts;

    // Event emitted when a violation count is updated
    event ViolationCountUpdated(string violationType, uint256 newCount);

    // Function to increment the count of a specific violation type
    function incrementViolationCount(string memory violationType) public {
        // Increase the count for the violation type
        violationCounts[violationType] += 1;

        // Emit an event to notify about the update
        emit ViolationCountUpdated(violationType, violationCounts[violationType]);
    }

    // Function to get the count of a specific violation type
    function getViolationCount(string memory violationType) public view returns (uint256) {
        return violationCounts[violationType];
    }
}
