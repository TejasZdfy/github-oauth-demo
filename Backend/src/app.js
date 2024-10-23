import express, { json } from "express";
import { connect } from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());
app.use("/auth", authRoutes);

connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("MongoDB connection error:", err));

app.use((req, res, next) => {
	res.status(404).json({ success: false, message: "Route not found!" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
