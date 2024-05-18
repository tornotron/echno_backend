const express = require("express")
const errorhandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()
const app = express()

const port = process.env.PORT || 5000

app.use(express.json())
app.use("/api/inventory", require("./routes/inventoryRoutes"))
app.use(errorhandler)

app.listen(port, () => {
    console.log(`Server is running at: ${port}`)
})