
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors()); 
app.use(bodyParser.json()); 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB connection success!");
});

const employeeRouter = require("./routes/employees.js");
app.use("/employee",employeeRouter);

const leaveRouter = require("./routes/leaves.js");
app.use("/leave",leaveRouter);


const attendanceRouter = require("./routes/attendances.js");
app.use("/attendance",attendanceRouter);



app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
