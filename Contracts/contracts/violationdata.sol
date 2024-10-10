// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ViolationCounter {
    // Mapping to store count of each violation type
    mapping(string => uint256) public violationCounts;

    // Mapping to store hourly violation counts (0-23)
    uint256[24] public hourlyViolationCounts;

    // Event emitted when a violation count is updated
    event ViolationCountUpdated(string violationType, uint256 newCount);
    event HourlyViolationCountUpdated(uint256 hour, string violationType, uint256 newCount);

    // Function to increment the count of a specific violation type
    function incrementViolationCount(string memory violationType) public {
        // Increase the count for the violation type
        violationCounts[violationType] += 1;

        // Emit an event to notify about the update
        emit ViolationCountUpdated(violationType, violationCounts[violationType]);

        // Increment hourly violation count
        incrementHourlyViolationCount(violationType);
    }

    // Internal function to increment the hourly violation count
    function incrementHourlyViolationCount(string memory violationType) internal {
        // Get the current hour (0-23)
        uint256 hour = (block.timestamp / 3600) % 24;

        // Increase the hourly count for this violation type
        hourlyViolationCounts[hour] += 1;

        // Emit an event to notify about the hourly update
        emit HourlyViolationCountUpdated(hour, violationType, hourlyViolationCounts[hour]);
    }

    // Function to get the count of a specific violation type
    function getViolationCount(string memory violationType) public view returns (uint256) {
        return violationCounts[violationType];
    }

    // Function to get the hourly violation counts
    function getHourlyViolationCounts() public view returns (uint256[24] memory) {
        return hourlyViolationCounts;
    }
}
