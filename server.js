const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./config/connectDB");
const path = require("path");

// Calling Datsbase
connectDb();

const app = express();

console.log("server");

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/users", require("./routes/userRoute"));

app.use("/api/v1/transactions", require("./routes/transactionRoute"));

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// Port
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
