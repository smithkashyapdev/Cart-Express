import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("MongoDB connected");
    } catch (e) {
        console.log("MongoDB connection error");
        process.exit(1);
    }
}

export default connectDB