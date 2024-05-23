import 'dotenv/config'
import express, { json } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import inventoryRoutes from './routes/inventoryRoutes.js';
import {fetchUserIds} from './db/database.js';

const app = express()
const port = process.env.PORT
app.use(json())
app.use("/api/inventory", inventoryRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})
// let userIds = await fetchUserIds()
// console.log(userIds)