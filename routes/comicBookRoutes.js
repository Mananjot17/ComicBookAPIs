import express from "express"; // Import express framework
import { 
    createComicBook, 
    updateComicBook, 
    deleteComicBook, 
    getComicBooks, 
    getComicBookById 
} from "../controllers/comicBookController.js"; // Import controller functions for handling requests

const router = express.Router(); // Create a new router

// Define routes for comic book operations
router.post('/comic-books', createComicBook); // Route to create a new comic book
router.put('/comic-books/:id', updateComicBook); // Route to update an existing comic book by ID
router.delete('/comic-books/:id', deleteComicBook); // Route to delete a comic book by ID
router.get('/comic-books', getComicBooks); // Route to get a list of comic books
router.get('/comic-books/:id', getComicBookById); // Route to get a comic book by ID

export default router; // Export the router
