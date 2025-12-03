import mongoose from "mongoose";
const connectDB = async () => {
    mongoose.connection.on('connected',() => console.log('database successfull'));
    await mongoose.connect(process.env.MONGODB_URI + 'project')
}

export default connectDB