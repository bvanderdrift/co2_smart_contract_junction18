const contract      = require("../contract");

module.exports = function(app) {
    
    // -------------
    app.get("/contract", async (req, res) => {
        const result = await contract.getCount();
        res.send(result);
    });

    app.get("/inc", (req, res) => {
        contract.addCount();
        res.send("");
    });
    // -------------

    

    /**
     * GET requests
     */
    
    app.get("/getOffers", async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
        res.send(await contract.getOffers());
    });

    app.get("/depositFunds", (req, res) => {
        res.send("Hello");
    });

    /**
     * POST requests
     */

    app.post("/depositFunds", (req, res) => {
        res.send("Hello");
    });

    app.post("/claimBlocks", (req, res) => {
        res.send("Hello");
    });

    app.post("/submitOffer", async (req, res) => {
        await contract.submitOffer(req);
        res.send();
    });
    
    /**
     * /depositFunds
     * /getBlocks
     * /claimBlocks
     * /submitData
     * 
     * 
     * LandOwener
     * Coordinates
     * LastMeasurementDate
     * 
     */
};