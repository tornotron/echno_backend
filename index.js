import "dotenv/config";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import express, { json } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

const numCPUs = availableParallelism();

const app = express();
const port = process.env.PORT;
app.use(json());
app.use("/api/inventory", inventoryRoutes);
app.use("/api/employee", employeeRoutes);
app.use(errorHandler);

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  app.listen(port, () => {
    console.log(`Server is running at port: ${port} with pid: ${process.pid}`);
  });
}
