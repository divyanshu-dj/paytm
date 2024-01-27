require("dotenv").config();

const cors = require("cors");

const express = require("express");
const rootRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json);

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword

// /api/v1/account/transferMoney
// /api/v1/account/balance
