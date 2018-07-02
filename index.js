const express = require('express');

//We can multiple application in single project by using the express
const app = express();

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});



//We can set the port by using env varibales or it will be 5000
const PORT  = process.env.PORT || 5000;
app.listen(PORT);