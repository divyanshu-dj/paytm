const express = require('express');
const mongoose = require('mongoose');  
const { authMiddleware } = require('../middleware/authMiddleware');
const { User, Account } = require('../db');
const router = express.Router();

router.get('/balance', authMiddleware, async(req, res) => {
    const account = await Account.findOne({
        userID: req.userId
    });

    res.json({
        balance: account.balance
    });
});

router.post('/transfer', authMiddleware, async(req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();
    const {to, amount} = req.body;

    const user = await User.findOne({
        userId: req.userId
    }).session(session);

    if( !user || user.balance < amount ) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const transferTo = await User.findOne({
        userId: to
    }).session(session);

    if( !transferTo ) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Account not found"
        });
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session);

    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer successful"
    })


});

module.exports = router