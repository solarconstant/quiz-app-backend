const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})
.then(() => console.log('DB connected successfully.'))   
.catch(err => console.log('DB connection failed: ', err));

app.use(morgan("dev"));
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () =>
{
    console.log(`Server is up and running at port ${port}`);
})