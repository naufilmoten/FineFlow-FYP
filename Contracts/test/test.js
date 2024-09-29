const Violation = artifacts.require("violation");

contract("violation", (accounts) => {
    let violationInstance;
    const violator = accounts[1]; // Address of the violator
    const warden = accounts[0]; // Address of the warden
    const admin = accounts[0];   // Address of the admin (same as warden for this test)
    const violatorCnic = "12345-6789012-3";
    const violatorName = "John Doe";
    const location = "Main Street";
    const date = Math.floor(Date.now() / 1000); // Current timestamp
    const registrationNumber = "ABC-1234"; // Sample registration number

    beforeEach(async () => {
        violationInstance = await Violation.new();
    });

    it("should generate multiple challans and verify their details", async () => {
        // Generate first challan
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        
        // Generate second challan
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking (LTV)", location, date, registrationNumber);

        // Retrieve the details of the first challan
        const challan1 = await violationInstance.getChallan(1);
        assert.equal(challan1.violator, violator, "The violator address is incorrect for challan 1");
        assert.equal(challan1.violationDetails, "Speeding (LTV)", "The violation details are incorrect for challan 1");
        assert.equal(challan1.fineAmount.toString(), "500", "The fine amount is incorrect for challan 1");
        assert.equal(challan1.registrationNumber, registrationNumber, "The registration number is incorrect for challan 1");

        // Retrieve the details of the second challan
        const challan2 = await violationInstance.getChallan(2);
        assert.equal(challan2.violator, violator, "The violator address is incorrect for challan 2");
        assert.equal(challan2.violationDetails, "Parking (LTV)", "The violation details are incorrect for challan 2");
        assert.equal(challan2.fineAmount.toString(), "200", "The fine amount is incorrect for challan 2");
        assert.equal(challan2.registrationNumber, registrationNumber, "The registration number is incorrect for challan 2");
    });

    it("should update multiple challans and verify updates", async () => {
        // Create challans first
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking (LTV)", location, date, registrationNumber);

        // Update the first challan
        await violationInstance.updateChallan(1, "Traffic Signal Violation (LTV)");
        const updatedChallan1 = await violationInstance.getChallan(1);
        assert.equal(updatedChallan1.violationDetails, "Traffic Signal Violation (LTV)", "The violation details should be updated for challan 1");
        assert.equal(updatedChallan1.fineAmount.toString(), "800", "The fine amount should be updated for challan 1");

        // Update the second challan
        await violationInstance.updateChallan(2, "No Seatbelt (LTV)");
        const updatedChallan2 = await violationInstance.getChallan(2);
        assert.equal(updatedChallan2.violationDetails, "No Seatbelt (LTV)", "The violation details should be updated for challan 2");
        assert.equal(updatedChallan2.fineAmount.toString(), "100", "The fine amount should be updated for challan 2");
    });

    it("should terminate a challan and ensure it cannot be updated", async () => {
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        await violationInstance.terminateChallan(1);

        try {
            await violationInstance.updateChallan(1, "Parking (LTV)");
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
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking (LTV)", location, date, registrationNumber);
        
        const challans = await violationInstance.getChallansByCitizen(violator);
        assert.equal(challans.length, 2, "There should be 2 challans for the violator");
    });

    it("should get challans by warden", async () => {
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        
        const challans = await violationInstance.getChallansByWarden(warden);
        assert.equal(challans.length, 1, "There should be 1 challan issued by the warden");
        console.log("Challan Generated....", challans);
    });

    it("should allow admin to retrieve all challans", async () => {
        // Generate some challans
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Parking (LTV)", location, date, registrationNumber);
        
        // Admin retrieves all challans
        const allChallans = await violationInstance.getAllChallans({ from: admin });
        assert.equal(allChallans.length, 2, "Admin should see 2 challans in total");
        assert.equal(allChallans[0].violationDetails, "Speeding (LTV)", "First challan details should match");
        assert.equal(allChallans[1].violationDetails, "Parking (LTV)", "Second challan details should match");
    });

    it("should prevent non-admin from retrieving all challans", async () => {
        // Generate some challans
        await violationInstance.generateChallan(violator, violatorCnic, violatorName, "Speeding (LTV)", location, date, registrationNumber);
        
        try {
            // Non-admin tries to retrieve all challans
            await violationInstance.getAllChallans({ from: violator });
            assert.fail("Non-admin should not be able to retrieve all challans");
        } catch (error) {
            assert(error.message.includes("Only admin can access all challans"), "Expected error not received");
        }
    });
});


const FinePayment = artifacts.require("FinePayment");

contract("FinePayment", (accounts) => {
  const violator = accounts[1];

  it("should create and pay for a payment in one transaction", async () => {
    const instance = await FinePayment.deployed();

    // Call createAndPay and capture the emitted event
    const tx = await instance.createAndPay(violator, 1, { from: accounts[0], value: 200 });
    
    // Extract paymentId from the emitted event
    const event = tx.logs[0].args;
    const paymentId = event.id.toNumber();

    // Fetch the payment details
    const payment = await instance.getPaymentDetails(paymentId);

    // Assert the details of the created and paid payment
    assert.equal(payment[0].toNumber(), paymentId, "Payment ID should match");
    assert.equal(payment[1], violator, "Violator address should match");
    assert.equal(payment[2].toNumber(), 1, "Challan ID should be 1");
    assert.equal(payment[3].toNumber(), 200, "Fine amount should be 200");
    assert.equal(payment[4], true, "Payment should be marked as paid");
    assert(payment[5].toNumber() > 0, "Payment timestamp should be set");
  });
});

