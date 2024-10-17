import comicBook from '../models/ComicBook.js'; // Import the comic book model
import { createBook, updateBook, deleteBook, getBooks, getBookById } from '../services/comicBookService.js'; // Import service functions for database operations

// Create a new comic book
export const createComicBook = async (req, res) => {
    try {
        const { bookName, authorName } = req.body; // Destructure the request body for bookName and authorName

        // Check if a comic book with the same name and author already exists
        const existingComicBook = await comicBook.findOne({ bookName, authorName });
        if (existingComicBook) {
            return res.status(400).json({ message: 'Comic book already exists' }); // Return 400 if comic book exists
        }

        // If not present, create a new comic book
        const newComicBook = await createBook(req.body); // Call the service function to create the comic book
        res.status(201).json(newComicBook); // Return 201 and the created comic book
    } catch (error) {
        res.status(500).json({ message: 'Error creating comic book', error }); // Handle errors
    }
};

// Update an existing comic book
export const updateComicBook = async (req, res) => {
    try {
        const updatedComicBook = await updateBook(req.params.id, req.body); // Call the service function to update the comic book
        res.status(200).json(updatedComicBook); // Return 200 and the updated comic book
    } catch (error) {
        res.status(500).json({ message: 'Error updating comic book', error }); // Handle errors
    }
};

// Delete a comic book
export const deleteComicBook = async (req, res) => {
    try {
        const deletedComicBook = await deleteBook(req.params.id); // Call the service function to delete the comic book
        
        // If the comic book was not found, return 404
        if (!deletedComicBook) {
            return res.status(404).json({ message: 'Comic book not found' }); // Return 404 if not found
        }

        // If the comic book was found and deleted, return 200 with a message
        res.status(200).json({ message: 'Comic book deleted successfully' }); // Return success message
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comic book', error }); // Handle errors
    }
};

// Get comic books with filtering, sorting, and pagination
export const getComicBooks = async (req, res) => {
    try {
        const options = {
            filter: {}, // Initialize filter object
            sort: {},   // Initialize sort object
            page: parseInt(req.query.page) || 1, // Get page number from query or default to 1
            limit: parseInt(req.query.limit) || 10 // Get limit from query or default to 10
        };

        // Build the filter based on query parameters
        if (req.query.author) {
            options.filter.authorName = req.query.author; // Filter by author
        }
        if (req.query.year) {
            options.filter.yearOfPublication = parseInt(req.query.year); // Filter by year
        }
        if (req.query.price) {
            const priceFilter = req.query.price.split('-'); // Assuming price is in a range format like "10-50"
            options.filter.price = {
                $gte: parseInt(priceFilter[0]), // Minimum price
                $lte: parseInt(priceFilter[1])  // Maximum price
            };
        }
        if (req.query.condition) {
            options.filter.condition = req.query.condition; // Filter by condition
        }

        // Handle sorting based on query parameters
        if (req.query.sort === 'name') {
            options.sort = { bookName: 1 }; // Sort by name (ascending)
        } else if (req.query.sort === 'year') {
            options.sort = { yearOfPublication: 1 }; // Sort by year (ascending)
        } else if (req.query.sort === 'price') {
            options.sort = { price: 1 }; // Sort by price (ascending)
        } else if (req.query.sort === '-price') {
            options.sort = { price: -1 }; // Sort by price (descending)
        }

        // Fetch comic books with filtering, sorting, and pagination
        const comicBooks = await getBooks(options.filter, options); // Call the service function to get comic books

        // Check if the list of comic books is empty
        if (comicBooks.length === 0) {
            return res.status(404).json({ message: 'No comic books available' }); // Return 404 if no books found
        }

        res.status(200).json(comicBooks); // Return the list of comic books
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comic books', error }); // Handle errors
    }
};

// Get comic book by ID
export const getComicBookById = async (req, res) => {
    try {
        const comicBook = await getBookById(req.params.id); // Call the service function to get comic book by ID
        if (!comicBook) {
            return res.status(404).json({ message: 'Comic book not found' }); // Return 404 if not found
        }
        res.status(200).json(comicBook); // Return the comic book details
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comic book', error }); // Handle errors
    }
};
