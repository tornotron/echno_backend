import "dotenv/config";
// import cluster from "node:cluster";
// import { availableParallelism } from "node:os";
import express, { json } from "express";
// import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import registerRoutes from "./routes/registerRoute.js";
import { dbsetup } from "./db/database.js";

// const numCPUs = availableParallelism();

await dbsetup();
const app = express();
const port = process.env.PORT;
// app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/inventory", inventoryRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/register", registerRoutes);
app.use(errorHandler);

// if (cluster.isPrimary) {
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// } else {
app.listen(port, () => {
  console.log(`Server is running at port: ${port} with pid: ${process.pid}`);
});
// }
