var ReduceCoContract = artifacts.require("./ReduceCoContract.sol");

contract("ReduceCoContract", () => {
  it("should return empty top10 on create", () => {
    return ReduceCoContract.deployed()
      .then(instance => {
        return instance.getTop10Offers();
      })
      .then(result => {
        const coordinates = result[0];
        const addresses = result[1];
        const offerAmounts = result[2];
        const measurement = result[3];

        expect(addresses).to.have.lengthOf(10);
        expect(coordinates).to.have.lengthOf(10);
        expect(offerAmounts).to.have.lengthOf(10);
        expect(measurement).to.have.lengthOf(10);
      });
  });

  it("should create new offer upon new offer call", async () => {
    return ReduceCoContract.deployed()
      .then(async instance => {
        const result = await instance.makeOffer("abc", 10, 10, {
          gas: 3000000
        });
        return {
          instance,
          result
        };
      })
      .then(obj => {
        return obj.instance.getTop10Offers();
      })
      .then(result => {
        const firstCoordinates = result[0][0];
        const firstAddresse = result[1][0];
        const firstOfferAmount = result[2][0];
        const firstMeasurement = result[3][0];

        // expect(firstCoordinates).to.equal("abc");
        expect(firstAddresse).to.equal(
          "0xd052c11cd760a6d85d5068478e69cb6d727952a2"
        );
        expect(firstOfferAmount.toNumber()).to.equal(10);
        expect(firstMeasurement.toNumber()).to.equal(10);
      });
  });
});
