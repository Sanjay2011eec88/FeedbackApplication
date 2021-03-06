const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const authRoutes = require('./routes/authRoutes');

require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

//We can multiple application in single project by using the express
const app = express();

app.use(
    cookieSession({
        maxAge:30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

//We can set the port by using env varibales or it will be 5000
const PORT  = process.env.PORT || 5000;
app.listen(PORT);