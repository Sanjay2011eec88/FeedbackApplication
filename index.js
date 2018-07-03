const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

//We can multiple application in single project by using the express
const app = express();

//callbackUrl is for when user provides the access to the google account data it will route this url
passport.use(
    new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL:'/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) =>{
        console.log(accessToken)
    })
);


//Scopes gives access to the list in the scope from the google after user gives permission
app.get(
    '/auth/google',
    passport.authenticate('google',{
        scope: ['profile', 'email']
    })
);

//this the second request where we receive code and that code to get the profile data usig passport using google
app.get('/auth/google/callback', passport.authenticate('google'));

//We can set the port by using env varibales or it will be 5000
const PORT  = process.env.PORT || 5000;
app.listen(PORT);