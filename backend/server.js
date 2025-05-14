import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRout.js";
import technicianRoutes from './routes/technicianRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


connectDB();


import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/technician", technicianRoutes);
// Server Port
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));