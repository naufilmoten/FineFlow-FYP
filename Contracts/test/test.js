const Violation = artifacts.require("violation");

contract("violation", (accounts) => {
    let violationInstance;
    const violator = accounts[1]; // Address of the violator
    const warden = accounts[0]; // Address of the warden
    const violatorCnic = "12345-6789012-3";
    const violatorName = "John Doe";
    const location = "Main Street";
    const date = Math.floor(Date.now() / 1000); // Current timestamp

    beforeEach(async () => {
        violationInstance = await Violation.new();
    });

    it("should generate multiple challans and verify their details", async () => {
        // Generate first challan
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding", location, date);
        
        // Generate second challan
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking", location, date);

        // Retrieve the details of the first challan
        const challan1 = await violationInstance.getChallan(1);
        assert.equal(challan1.violator, violator, "The violator address is incorrect for challan 1");
        assert.equal(challan1.violationDetails, "Speeding", "The violation details are incorrect for challan 1");
        assert.equal(challan1.fineAmount.toString(), "500", "The fine amount is incorrect for challan 1");

        // Retrieve the details of the second challan
        const challan2 = await violationInstance.getChallan(2);
        assert.equal(challan2.violator, violator, "The violator address is incorrect for challan 2");
        assert.equal(challan2.violationDetails, "Parking", "The violation details are incorrect for challan 2");
        assert.equal(challan2.fineAmount.toString(), "200", "The fine amount is incorrect for challan 2");
    });

    it("should update multiple challans and verify updates", async () => {
        // Create challans first
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding", location, date);
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking", location, date);

        // Update the first challan
        await violationInstance.updateChallan(1, "Traffic Signal Violation");
        const updatedChallan1 = await violationInstance.getChallan(1);
        assert.equal(updatedChallan1.violationDetails, "Traffic Signal Violation", "The violation details should be updated for challan 1");
        assert.equal(updatedChallan1.fineAmount.toString(), "800", "The fine amount should be updated for challan 1");

        // Update the second challan
        await violationInstance.updateChallan(2, "No Seatbelt");
        const updatedChallan2 = await violationInstance.getChallan(2);
        assert.equal(updatedChallan2.violationDetails, "No Seatbelt", "The violation details should be updated for challan 2");
        assert.equal(updatedChallan2.fineAmount.toString(), "100", "The fine amount should be updated for challan 2");
    });

    it("should terminate a challan and ensure it cannot be updated", async () => {
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding", location, date);
        await violationInstance.terminateChallan(1);

        try {
            await violationInstance.updateChallan(1, "Parking");
            assert.fail("The challan should be terminated and cannot be updated");
        } catch (error) {
            assert(error.message.includes("Challan is terminated and cannot be updated"), "Expected error not received");
        }
    });

    it("should handle non-existent challans correctly", async () => {
        try {
            await violationInstance.getChallan(999); // Non-existent ID
            assert.fail("The call should have thrown an error for non-existent challan");
        } catch (error) {
            assert(error.message.includes("Challan does not exist"), "Expected error not received");
        }
    });

    it("should get challans by violator", async () => {
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding", location, date);
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking", location, date);
        
        const challans = await violationInstance.getChallansByCitizen(violator);
        assert.equal(challans.length, 2, "There should be 2 challans for the violator");
    });

    it("should get challans by warden", async () => {
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding", location, date);
        
        const challans = await violationInstance.getChallansByWarden(warden);
        assert.equal(challans.length, 1, "There should be 1 challan issued by the warden");
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
