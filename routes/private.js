const router = require('express').Router();
const verifyToken = require('../verifyToken');

router.get('/private', verifyToken, (req, res) => {
    res.send('This is private window');
});

module.exports = router;