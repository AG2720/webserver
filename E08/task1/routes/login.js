//login.js in routes
const express = require('express')
const passport = require('passport')
const router = express.Router()

router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(500).json({ message: 'An error occurred' });
        if (!user) return res.status(401).json({ message: 'Unauthorized', info });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ message: 'Login failed' });
            return res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ message: 'logout successful' })
        //res.redirect('/login')
    })
})

//router.route('/').post(login)

module.exports = router
 