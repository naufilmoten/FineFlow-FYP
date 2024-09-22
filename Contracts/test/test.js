const Violation = artifacts.require("violation");

contract("violation", (accounts) => {
    let violationInstance;

    beforeEach(async () => {
        violationInstance = await Violation.new();
    });

    it("should generate multiple challans and verify their details", async () => {
        const violator1 = accounts[1];
        const violator2 = accounts[2];
        const violationDetails1 = "Speeding";  // Predefined violation
        const violationDetails2 = "Parking";  // Predefined violation

        // Generate challans
        await violationInstance.generateChallan(violator1, violationDetails1);
        await violationInstance.generateChallan(violator2, violationDetails2);

        // Fetch and verify challan 1
        let challan = await violationInstance.getChallan(1);
        assert.equal(challan.id.toNumber(), 1, "Challan ID should be 1");
        assert.equal(challan.violator, violator1, "Incorrect violator address for ID 1");
        assert.equal(challan.violationDetails, violationDetails1, "Incorrect violation details for ID 1");
        assert.equal(challan.fineAmount.toString(), "500", "Fine amount should be 500 for Speeding");
        assert.equal(challan.isTerminated, false, "Challan should not be terminated for ID 1");

        console.log("Challan 1 Details:");
        console.log(`Challan 1 - ID: ${challan.id}, Violator: ${challan.violator}, Violation Details: ${challan.violationDetails}, Fine Amount: ${challan.fineAmount}, Is Terminated: ${challan.isTerminated}`);

        // Fetch and verify challan 2
        challan = await violationInstance.getChallan(2);
        assert.equal(challan.id.toNumber(), 2, "Challan ID should be 2");
        assert.equal(challan.violator, violator2, "Incorrect violator address for ID 2");
        assert.equal(challan.violationDetails, violationDetails2, "Incorrect violation details for ID 2");
        assert.equal(challan.fineAmount.toString(), "200", "Fine amount should be 200 for Parking");
        assert.equal(challan.isTerminated, false, "Challan should not be terminated for ID 2");

        console.log("Challan 2 Details:");
        console.log(`Challan 2 - ID: ${challan.id}, Violator: ${challan.violator}, Violation Details: ${challan.violationDetails}, Fine Amount: ${challan.fineAmount}, Is Terminated: ${challan.isTerminated}`);
    });

    it("should update multiple challans and verify updates", async () => {
        const violator = accounts[1];
        const initialDetails = "Speeding";  // Predefined violation
        const updatedDetails1 = "Reckless Driving";  // Predefined violation not in the contract yet
        const updatedDetails2 = "Parking";  // Predefined violation

        // Generate challans
        await violationInstance.generateChallan(violator, initialDetails);
        await violationInstance.generateChallan(violator, initialDetails);

        // Update challan 1 with new violation and fine
        await violationInstance.updateChallan(1, updatedDetails2);

        // Update challan 2 with new violation and fine
        await violationInstance.updateChallan(2, updatedDetails2);

        // Fetch and verify updated challan 1
        let challan = await violationInstance.getChallan(1);
        assert.equal(challan.violationDetails, updatedDetails2, "Violation details should be updated for ID 1");
        assert.equal(challan.fineAmount.toString(), "200", "Fine amount should be 200 for Parking");

        // Fetch and verify updated challan 2
        challan = await violationInstance.getChallan(2);
        assert.equal(challan.violationDetails, updatedDetails2, "Violation details should be updated for ID 2");
        assert.equal(challan.fineAmount.toString(), "200", "Fine amount should be 200 for Parking");

        console.log("Updated Challans Details:");
        console.log(`Challan 1 - ID: ${challan.id}, Violator: ${challan.violator}, Violation Details: ${challan.violationDetails}, Fine Amount: ${challan.fineAmount}, Is Terminated: ${challan.isTerminated}`);
        console.log(`Challan 2 - ID: ${challan.id}, Violator: ${challan.violator}, Violation Details: ${challan.violationDetails}, Fine Amount: ${challan.fineAmount}, Is Terminated: ${challan.isTerminated}`);
    });

    it("should terminate a challan and ensure it cannot be updated", async () => {
        const violator = accounts[1];
        const violationDetails = "Speeding";  // Predefined violation

        // Generate challan
        await violationInstance.generateChallan(violator, violationDetails);

        // Terminate the challan
        await violationInstance.terminateChallan(1);

        // Verify termination
        let challan = await violationInstance.getChallan(1);
        assert.equal(challan.isTerminated, true, "Challan should be terminated");

        // Attempt to update the terminated challan
        try {
            await violationInstance.updateChallan(1, "Parking");
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("Challan is terminated and cannot be updated"), "Error message should indicate that the challan is terminated");
        }

        console.log("Terminated Challan Details:");
        console.log(`ID: ${challan.id}`);
        console.log(`Violator: ${challan.violator}`);
        console.log(`Violation Details: ${challan.violationDetails}`);
        console.log(`Fine Amount: ${challan.fineAmount}`);
        console.log(`Is Terminated: ${challan.isTerminated}`);
    });

    it("should handle non-existent challans correctly", async () => {
        try {
            await violationInstance.getChallan(999); // Non-existent challan ID
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("Challan does not exist"), "Error message should indicate that the challan does not exist");
        }

        try {
            await violationInstance.updateChallan(999, "Parking"); // Non-existent challan ID
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("Challan does not exist"), "Error message should indicate that the challan does not exist");
        }

        try {
            await violationInstance.terminateChallan(999); // Non-existent challan ID
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("Challan does not exist"), "Error message should indicate that the challan does not exist");
        }
    });
});

const FinePayment = artifacts.require("FinePayment");

contract("FinePayment", (accounts) => {
  const violator = accounts[1];

  it("should create a new payment", async () => {
    const instance = await FinePayment.deployed();
    
    // Call createPayment function
    await instance.createPayment(violator, 1, 200, { from: accounts[0] });

    // Fetch the payment details
    const payment = await instance.getPaymentDetails(1);

    // Assert the details of the created payment
    assert.equal(payment[0].toNumber(), 1, "Payment ID should be 1");
    assert.equal(payment[1], violator, "Violator address should match");
    assert.equal(payment[2].toNumber(), 1, "Challan ID should be 1");
    assert.equal(payment[3].toNumber(), 200, "Fine amount should be 200");
    assert.equal(payment[4], false, "Payment should not be made yet");
  });

  it("should make a payment", async () => {
    const instance = await FinePayment.deployed();

    // Call makePayment function
    await instance.makePayment(1, { from: violator, value: 200 });

    // Fetch the payment details again
    const payment = await instance.getPaymentDetails(1);

    // Assert that the payment is marked as paid
    assert.equal(payment[4], true, "Payment should be marked as paid");
    assert(payment[5].toNumber() > 0, "Payment timestamp should be set");
  });

  it("should not allow payment with incorrect amount", async () => {
    const instance = await FinePayment.deployed();

    // Create a new payment to ensure it's unpaid
    await instance.createPayment(violator, 2, 200, { from: accounts[0] });

    try {
        // Attempt to make a payment with an incorrect amount (should fail)
        await instance.makePayment(2, { from: violator, value: 100 }); // Fine amount is 200, so this should fail
        assert.fail("Payment should have failed due to incorrect amount");
    } catch (error) {
        // Check that the error message contains 'Incorrect payment amount'
        assert(error.message.includes("Incorrect payment amount"), `Expected 'Incorrect payment amount' but got ${error.message}`);
    }
});
});
