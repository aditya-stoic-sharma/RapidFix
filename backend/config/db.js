import { mongoose } from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`, "error in db connecton");
        process.exit(1);
    }
};

export default connectDB;
