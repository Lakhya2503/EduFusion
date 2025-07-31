import mongoose from 'mongoose'

export const connectDB = async function () {
    try {
        const promise = await mongoose.connect(
          `${process.env.MONGODB_URI}/${process.env.APP_NAME}`
        );
        console.log(`Database connected: ${process.env.MONGODB_URI}/${process.env.APP_NAME}`);
        return promise
    } catch (error) {
        console.log("Database connection error:", error);
        process.exit(1)
    }
}