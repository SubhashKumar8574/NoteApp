import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            dbName: "NoteApp",
        });
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};

export default connectToMongoDB;
