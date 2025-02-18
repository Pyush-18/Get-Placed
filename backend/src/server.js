import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import { app } from "./app.js";
import { connectDB } from "./db/index.js";



connectDB()
.then(() => {
  app.listen(process.env.PORT, function () {
    console.log(`Sever is running on the port ${process.env.PORT}`);
  });
})
.catch(() => {
    console.log("Server crashed !!!")
})
