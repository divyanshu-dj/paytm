const express = require('express');
const User = require('../db');

const router = express.Router();

router.get('/bulk', async(req, res) => {
    try {
        const filter = res.query.filter || "";
    
        const usersFound = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })
    
        if(usersFound.length === 0) {
            return res.status(411).json({
                message: "Searched user is not present"
            })
        }
    
        res.status(200).json({
            user: usersFound.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });

    } catch {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})

module.exports = router;
