const express = require('express');

//We can multiple application in single project by using the express
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

/*
* To run in heroku we need to set couple of things:
* 1.Set port to env variable if it their otherwise use the predefined port.
* 2.Specify node environment i.e. we need to specify the node version we are going to use
* This can be done by adding following in the package.json file
* "engine":{
* "node":"8.1.1",
* "npm":"5.0.3"
* }*
* 3.Specify a start script
* /

//We can set the port by using env varibales or it will be 5000
const PORT  = process.env.PORT || 5000;
app.listen(PORT);