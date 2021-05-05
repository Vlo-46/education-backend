const jwt = require('jsonwebtoken')
const keys = require('../utils/keys')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, keys.jwtSecret, (err, auth) => {
            if (err) {
                return res.send({msg: 'error'});
            }
            res.send(auth)
            req.auth = auth;
            next();
        });
    } else {
        res.send({msg: 'error'})
    }
}