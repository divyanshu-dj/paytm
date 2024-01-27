const express = require('express');
const router = express.Router();

const zod = require('zod');
const { User, Account} = require('../db');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/authMiddleware');

// SIGNUP
const UserSignupSchema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6,{message: "Given password is too small"})
})

router.post('/signup', async(req, res) => {

    const {success} = UserSignupSchema.safeParse(req.body);
    if( !success ) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    // creating account for the user with random balance
    await Account.create({
        userId: newUser._id,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({
        userId: newUser._id
    }, process.env.JWT_SECRET);

    res.status(200).json({
        message: "User created successfully",
        token: token
    })
});


// SIGNIN
const UserSigninSchema = zod.object({
    username: zod.string().email({ message: "Invalid email address" }),
    password: zod.string()

})
router.post('/signin', authMiddleware, async(req, res) => {
    const {success} = UserSigninSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message: "Enter valid username and password"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        res.status(200).json({
            token: token
        });
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
});



// UPDATE
const UserUpdateSchema = zod.object({
    password: zod.string().min(6,{message: "Given password is too small"}).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})
router.put('/update', authMiddleware, async(req, res) => {
    const {success} = UserUpdateSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({message: "Error while updating information"})
    }

    await User.updateOne(
        {_id: req.userId},
        {$set: req.body}
    );

    res.status(200).json({
        message: "Updated successfully"
    })
})


// SCEARCH FOR OTHER USERS
router.get('/bulk', async(req, res) => {
    try {
        const filter = req.query.filter || "";
    
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

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
})


module.exports = router;