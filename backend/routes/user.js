const express = require('express');

const router = express.Router();

router.get('/signin', (req, res) => {
    res.send("signin")
});

router.post('/signup', (req, res) => {
    res.send("singup")
});

module.exports = router;