require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express(); 

app.use(cors());
app.use(express.json());

const rootRouter = require("./routes/index");

app.use("/api/v1", rootRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword

// /api/v1/account/transferMoney
// /api/v1/account/balance
