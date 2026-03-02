const jwt = require('jsonwebtoken')
const {JWT_SECRET} =  require('../constants')


function auth (req, res, next) {
    const token = req.cookies.token
    let isAuthenticated = false;

    try {
        const verifyResult = jwt.verify(token, JWT_SECRET)
        isAuthenticated = true;

        req.user = {
            email: verifyResult.email,
        }

        next()

    } catch (e) {
        res.redirect('/login')
        isAuthenticated = false;
    }

    res.locals.isAuthenticated = isAuthenticated;
}

module.exports = auth;