const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Header - 
        // Authorization: Bearer <actual token>
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(403).json({});
    }
};