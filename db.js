import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(uri);
    //   const conn = await mongoose.connect(`mongodb://localhost:27017/test`);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }