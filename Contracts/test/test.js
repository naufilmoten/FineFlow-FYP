const Violation = artifacts.require("violation");

contract("violation", (accounts) => {
    let violationInstance;

    beforeEach(async () => {
        violationInstance = await Violation.new();
    });

    it("should generate multiple challans and verify their details", async () => {
        const violator1 = accounts[1];
        const violator2 = accounts[2];
        const warden1 = accounts[0]; // Warden issuing challan 1
        const warden2 = accounts[3]; // Warden issuing challan 2
        const violationDetails1 = "Speeding";
        const violationDetails2 = "Parking";
        const violatorCnic1 = "12345-6789012-3";
        const violatorCnic2 = "98765-4321098-7";
        const violatorName1 = "John Doe";
        const violatorName2 = "Jane Smith";
        const location1 = "Main Street";
        const location2 = "Market Area";
        const date1 = Math.floor(Date.now() / 1000);
        const date2 = date1 + 60;

        // Warden1 issues a challan
        await violationInstance.generateChallan(violator1, violatorCnic1, violatorName1, violationDetails1, location1, date1, { from: warden1 });
        
        // Warden2 issues a challan
        await violationInstance.generateChallan(violator2, violatorCnic2, violatorName2, violationDetails2, location2, date2, { from: warden2 });

        // Fetch and verify challan 1
        let challan = await violationInstance.getChallan(1);
        assert.equal(challan.id.toNumber(), 1, "Challan ID should be 1");
        assert.equal(challan.violator, violator1, "Incorrect violator address for ID 1");
        assert.equal(challan.warden, warden1, "Incorrect warden address for ID 1");
        assert.equal(challan.violatorCnic, violatorCnic1, "Incorrect violator CNIC for ID 1");
        assert.equal(challan.violatorName, violatorName1, "Incorrect violator name for ID 1");
        assert.equal(challan.violationDetails, violationDetails1, "Incorrect violation details for ID 1");
        assert.equal(challan.location, location1, "Incorrect location for ID 1");
        assert.equal(challan.date.toNumber(), date1, "Incorrect date for ID 1");
        assert.equal(challan.fineAmount.toString(), "500", "Fine amount should be 500 for Speeding");
        assert.equal(challan.isTerminated, false, "Challan should not be terminated for ID 1");

        console.log("Challan 1 Details:", challan);

        // Fetch and verify challan 2
        challan = await violationInstance.getChallan(2);
        assert.equal(challan.id.toNumber(), 2, "Challan ID should be 2");
        assert.equal(challan.violator, violator2, "Incorrect violator address for ID 2");
        assert.equal(challan.warden, warden2, "Incorrect warden address for ID 2");
        assert.equal(challan.violatorCnic, violatorCnic2, "Incorrect violator CNIC for ID 2");
        assert.equal(challan.violatorName, violatorName2, "Incorrect violator name for ID 2");
        assert.equal(challan.violationDetails, violationDetails2, "Incorrect violation details for ID 2");
        assert.equal(challan.location, location2, "Incorrect location for ID 2");
        assert.equal(challan.date.toNumber(), date2, "Incorrect date for ID 2");
        assert.equal(challan.fineAmount.toString(), "200", "Fine amount should be 200 for Parking");
        assert.equal(challan.isTerminated, false, "Challan should not be terminated for ID 2");

        console.log("Challan 2 Details:", challan);
    });

    it("should update multiple challans and verify updates", async () => {
        const violator = accounts[1];
        const warden = accounts[0]; // Warden issuing the challans
        const initialDetails = "Speeding";
        const updatedDetails1 = "Parking";
        const violatorCnic = "12345-6789012-3";
        const violatorName = "John Doe";
        const location = "Main Street";
        const date = Math.floor(Date.now() / 1000);

        // Warden issues two challans
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, initialDetails, location, date, { from: warden });
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, initialDetails, location, date, { from: warden });

        // Update challan 1 with new violation and fine
        await violationInstance.updateChallan(1, updatedDetails1, { from: warden });

        // Update challan 2 with new violation and fine
        await violationInstance.updateChallan(2, updatedDetails1, { from: warden });

        // Fetch and verify updated challan 1
        let challan = await violationInstance.getChallan(1);
        assert.equal(challan.violationDetails, updatedDetails1, "Violation details should be updated for ID 1");
        assert.equal(challan.fineAmount.toString(), "200", "Fine amount should be 200 for Parking");

        // Fetch and verify updated challan 2
        challan = await violationInstance.getChallan(2);
        assert.equal(challan.violationDetails, updatedDetails1, "Violation details should be updated for ID 2");
        assert.equal(challan.fineAmount.toString(), "200", "Fine amount should be 200 for Parking");

        console.log("Updated Challans Details:", challan);
    });

    it("should terminate a challan and ensure it cannot be updated", async () => {
        const violator = accounts[1];
        const warden = accounts[0]; // Warden issuing the challan
        const violationDetails = "Speeding";
        const violatorCnic = "12345-6789012-3";
        const violatorName = "John Doe";
        const location = "Main Street";
        const date = Math.floor(Date.now() / 1000);

        // Warden issues a challan
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, violationDetails, location, date, { from: warden });

        // Terminate the challan
        await violationInstance.terminateChallan(1, { from: warden });

        // Verify termination
        let challan = await violationInstance.getChallan(1);
        assert.equal(challan.isTerminated, true, "Challan should be terminated");

        // Attempt to update the terminated challan
        try {
            await violationInstance.updateChallan(1, "Parking", { from: warden });
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("Challan is terminated and cannot be updated"), "Error message should indicate that the challan is terminated");
        }

        console.log("Terminated Challan Details:", challan);
    });

    it("should handle non-existent challans correctly", async () => {
        try {
            await violationInstance.getChallan(999); // Non-existent challan ID
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
