const express   = require("express");
const app       = express();
var cors = require('cors');
const bodyParser = require('body-parser');


const port = 8080;

require("./app/routes") (app, {});


// use it before all route definitions
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./frontend"))
app.use(cors({origin: 'http://localhost'}));

app.listen(port, () => {
    console.log("Running environment on port " + port);
});
