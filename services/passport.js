const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

//Serialize  function is used to create a cookie and add it to the browser
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//Deserialize will take the cookie and turn into a user model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then( user => {
            done(null, user);
        });
});

//callbackUrl is for when user provides the access to the google account data it will route this url
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL:'/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) =>{
            User.findOne({ googleId: profile.id})
                .then((existingUser) => {
                    if(existingUser){
                        //we already have a record
                        done(null, existingUser);
                    }else {
                        //we will create a record
                        console.log("User already exist");
                        new User({
                            googleId: profile.id
                        }).save()
                            .then(user => done(null,user));
                    }
                })
        })
);
