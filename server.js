const express = require("express");
const errorHandler = require("./middleware/Error handler");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnecition");
const { route } = require("./Routes/contactRoute");
const router = require("./Routes/contactRoute");
const  dotenv=require("dotenv").config();
connectDb();
const app =express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/contacts", require("./Routes/contactRoute"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
