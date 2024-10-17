import comicBook from '../models/ComicBook.js'; // Import the comic book model

// Function to create a new comic book
export const createBook = async (data) => {
    const newComicBook = new comicBook(data); // Create a new comic book instance
    await newComicBook.save(); // Save the comic book to the database
    return newComicBook; // Return the created comic book
};

// Function to update an existing comic book
export const updateBook = async (id, data) => {
    const updatedComicBook = await comicBook.findByIdAndUpdate(id, data, { new: true }); // Update the comic book and return the updated document
    return updatedComicBook; // Return the updated comic book
};

// Function to delete a comic book
export const deleteBook = async (id) => {
    const deletedComicBook = await comicBook.findByIdAndDelete(id); // Find and delete the comic book by ID
    return deletedComicBook; // Return the deleted comic book
};

// Function to get a list of comic books with filtering, sorting, and pagination
export const getBooks = async (filter, options) => {
    const comicBooks = await comicBook.find(filter) // Fetch comic books based on filter
        .skip((options.page - 1) * options.limit) // Skip documents based on pagination
        .limit(options.limit) // Limit the number of results returned
        .sort(options.sort); // Sort the results
    return comicBooks; // Return the list of comic books
};

// Function to get a comic book by ID
export const getBookById = async (id) => {
    const comicBookDetails = await comicBook.findById(id); // Find the comic book by ID
    return comicBookDetails; // Return the comic book details
};
