import mongoose from 'mongoose';
 const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅MongoDB connected: ${conn.connection.host}');
  } catch (err) {
    console.log('❌MongoDB connection failed');
    console.log(err);
  }
};

export default connectDB