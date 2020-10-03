const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    console.log(`token ${token}`);
    if (!token) res.status(400).send('Access Denied');
    else {
        try {
            const validate = jwt.verify(token, process.env.PAYLOAD_STRING)
            console.log(validate)
            req.user = validate
            next();
        } catch (err) {
            console.log(err);
            res.status(401).send('Invalid token');
        }
    }
}