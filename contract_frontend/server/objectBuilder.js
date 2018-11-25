module.exports = class ObjectBuilder {
    
    static mapOffers(res) {
        let objectArray = [];
        for (let i = 0; i < res.length -1; i++) {
            objectArray.push(new OfferBlock(res[0][i], res[1][i], res[2][i], res[3][i]));
        }
        return objectArray;
    }

    static getDummyData() {
        let dummyData = [];
        dummyData.push(["1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", "ash125HUIsdf98yasdh", "asidhg9832HIASfas98AS"]);
        dummyData.push(["64.222176&27.727850", "60.466087&22.025087", "65.021545&25.469885"]);
        dummyData.push([15, 25, 17]);
        dummyData.push([21.7, 4.45, 2.4]);
        return dummyData;
    }
}

class OfferBlock {
    constructor(recipient, coordinates, offerPerUnit, measurement) {
        this.recipient = recipient;
        this.coordinates = coordinates;
        this.offerPerUnit = offerPerUnit;
        this.measurement = measurement;
    }
}