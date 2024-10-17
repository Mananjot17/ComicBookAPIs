import mongoose from "mongoose";

// Define the schema for the comic book collection
const comicBookSchema = new mongoose.Schema({
    bookName: { type: String, required: true }, // Name of the comic book
    authorName: { type: String, required: true }, // Author of the comic book
    yearOfPublication: { type: Number, required: true }, // Year the comic book was published
    price: { type: Number, required: true }, // Price of the comic book
    discount: { type: Number, default: 0 }, // Discount on the comic book
    numberOfPages: { type: Number, required: true }, // Number of pages in the comic book
    condition: { type: String, enum: ['new', 'used'], default: 'new' }, // Condition of the comic book
    description: { type: String }, // Description of the comic book
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the comic book was created
    updatedAt: { type: Date, default: Date.now } // Timestamp for when the comic book was last updated
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

// Update the updatedAt field before saving the document
comicBookSchema.pre('save', function(next) {
    this.updatedAt = Date.now(); // Set updatedAt to the current date and time
    next(); // Proceed to the next middleware
});

// Create a model from the schema and export it
const comicBook = mongoose.model("comicBook", comicBookSchema);
export default comicBook;
