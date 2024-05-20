import express, { json } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import 'dotenv/config'
import admin from "firebase-admin"
import serviceAccount from './.firebaseKey/serviceAccountKey.json' assert { type: 'json' };
import inventoryRoutes from './routes/inventoryRoutes.js';
import fetchUserIds from './db/users.js';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
let userIds = await fetchUserIds()
console.log(userIds)

const app = express()
const port = process.env.PORT
app.use(json())
app.use("/api/inventory", inventoryRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})