import mongoose from "mongoose"; // Import mongoose for MongoDB interaction
import dotenv from "dotenv"; // Import dotenv for environment variable management

dotenv.config(); // Load environment variables from .env file

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);  // Connect to MongoDB using the URI from environment variables
        console.log("Connected to MongoDB"); // Log successful connection
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message); // Log any connection errors
        process.exit(1); // Exit the process with failure
    }
};

export default connectToMongoDB; // Export the connection function
