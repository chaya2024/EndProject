require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path");
const cron = require('node-cron');
const mongoose = require("mongoose")

const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")

connectDB()

const PORT = process.env.PORT || 6666
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

//routers
app.use("/book", require("./routes/BooksRouter"))
app.use("/donor", require("./routes/DonorRouter"))
app.use("/message", require("./routes/MessageRouter"))
app.use("/bookNeeded", require("./routes/BookNeededRouter"))
app.use("/auth", require("./routes/AuthRouter"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log(process.env.NODE_ENV)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port
    ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})