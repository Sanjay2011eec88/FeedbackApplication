const passport = require('passport');
//Scopes gives access to the list in the scope from the google after user gives permission
module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile', 'email']
        })
    );

//This the second request where we receive code and that code to get the profile data usig passport using google
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};
