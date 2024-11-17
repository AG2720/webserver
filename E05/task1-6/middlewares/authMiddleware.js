//authMiddleware.js

const checkUserQuery = (req, res, next) => {
    if (!req.query.user) {
        return res.status(401).send('Unauthorised'); 
    }
    next();
}

module.exports = checkUserQuery;
