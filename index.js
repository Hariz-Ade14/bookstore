import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/connectDB.js";
import router from "./routes/auth.routes.js";
import bookRouter from "./routes/book.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:8081", credentials: true }));
app.use("/api/auth",router);
app.use("/api/books",bookRouter);

app.listen(PORT, () => {
	connectDB();
	console.log("Server is running on port: ", PORT);
});
