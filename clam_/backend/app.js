const express = require("express")
const cors = require("cors")
const app=express()
app.use(express.json())
app.use(cors())
const coursesList = require("./Routes/prefernceRoutes");

const clamRoutes = require("./Routes/clamroute")

//app.use("/api/v1/",coursesList);
app.use("/api/v1/", clamRoutes)



module.exports = app




