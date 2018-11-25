var ReduceCoContract = artifacts.require("./ReduceCoContract.sol");

contract("ReduceCoContract", () => {
  it("should return empty array on create", () => {
    return ReduceCoContract.deployed()
      .then(instance => {
        return instance.getBlocks();
      })
      .then(result => {
        const addresses = result[0];
        const coordinates = result[1];
        const lastMeasurements = result[2];
        const lastMeasurementTimestamps = result[3];

        expect(addresses).to.have.lengthOf(0);
        expect(coordinates).to.have.lengthOf(0);
      });
  });

  it("should return 5 blocks with zero address when 55 value is deposited", async () => {
    await ReduceCoContract.deployed()
      .then(instance => instance.depositFunds({ value: 55, gas: 3000000 }))
      .then(result => expect(result).to.exist);

    return ReduceCoContract.deployed()
      .then(instance => instance.getBlocks())
      .then(result => {
        const addresses = result[0];
        const coordinates = result[1];
        const lastMeasurements = result[2];
        const lastMeasurementTimestamps = result[3];

        addresses.forEach(address =>
          expect(address).to.equal("0x0000000000000000000000000000000000000000")
        );

        coordinates.forEach(coordinate =>
          expect(coordinate).to.equal(
            "0x0000000000000000000000000000000000000000000000000000000000000000"
          )
        );

        lastMeasurements.forEach(bigNumber =>
          expect(bigNumber.toNumber()).to.equal(0)
        );

        lastMeasurementTimestamps.forEach(bigNumber =>
          expect(bigNumber.toNumber()).to.equal(0)
        );
      });
  });

  it("should match up new block array to match with full fund", async () => {
    await ReduceCoContract.deployed()
      .then(instance => instance.depositFunds({ value: 55, gas: 3000000 }))
      .then(result => expect(result).to.exist);

    // This should sum up to 100 and result in 10 blocks
    await ReduceCoContract.deployed()
      .then(instance => instance.depositFunds({ value: 45, gas: 3000000 }))
      .then(result => expect(result).to.exist);

    return ReduceCoContract.deployed()
      .then(instance => instance.getBlocks())
      .then(result => expect(result[0]).to.have.lengthOf(10));
  });
});
