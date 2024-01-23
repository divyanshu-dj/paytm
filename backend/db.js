const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = new mongoose.model("User", userSchema);

module.exports = User;