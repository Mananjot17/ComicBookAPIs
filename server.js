import express from "express"; // Import express framework
import dotenv from "dotenv"; // Import dotenv for environment variable management
import connectToMongoDB from "./db/connectToMongoDB.js"; // Import MongoDB connection function
import comicBookRoutes from "./routes/comicBookRoutes.js"; // Import routes for comic book API

// Initialize express application
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
dotenv.config(); // Load environment variables from .env file

// Define the port to run the server
const PORT = process.env.PORT || 3000;

// Set up routes for comic book API
app.use('/api', comicBookRoutes);

// Error handling for invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' }); // Return 404 for undefined routes
});

// Start the server and connect to MongoDB
app.listen(PORT, () => {
    connectToMongoDB(); // Connect to MongoDB
    console.log(`Server running on port ${PORT}`); // Log server status
});
