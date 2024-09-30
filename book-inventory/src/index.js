"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const readline = __importStar(require("readline"));
const library_1 = require("./library");
const models_1 = require("./models");
const library = new library_1.Library();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Function to prompt for user input
const promptUser = () => {
    rl.question('Enter a command (add, list, update, delete, search, exit): ', (command) => {
        switch (command.toLowerCase()) {
            case 'add':
                addBook();
                break;
            case 'list':
                library.listBooks();
                promptUser(); // Prompt again after listing
                break;
            case 'update':
                updateBook();
                break;
            case 'delete':
                deleteBook();
                break;
            case 'search':
                searchBooks();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log('Unknown command, please try again.');
                promptUser();
                break;
        }
    });
};
// Function to add a book
const addBook = () => {
    rl.question('Enter book title: ', (title) => {
        rl.question('Enter book author: ', (author) => {
            rl.question('Enter book genre (Fiction, Non-Fiction, Science Fiction, etc.): ', (genreInput) => {
                const genre = models_1.Genre[genreInput];
                rl.question('Enter published year: ', (publishedYear) => {
                    rl.question('Enter availability (available, checked out, reserved): ', (availability) => {
                        const book = {
                            id: Date.now(), // Simple unique ID based on current timestamp
                            title,
                            author,
                            genre,
                            publishedYear: parseInt(publishedYear),
                            availability: availability,
                        };
                        library.addBook(book);
                        console.log(`Book "${title}" added successfully.`);
                        promptUser(); // Prompt again after adding
                    });
                });
            });
        });
    });
};
// Function to update a book
const updateBook = () => {
    rl.question('Enter book ID to update: ', (idInput) => {
        const id = parseInt(idInput);
        rl.question('Enter new title (leave blank to keep unchanged): ', (title) => {
            rl.question('Enter new availability (available, checked out, reserved, leave blank to keep unchanged): ', (availability) => {
                const updatedInfo = {};
                if (title)
                    updatedInfo.title = title;
                if (availability)
                    updatedInfo.availability = availability;
                library.updateBook(id, updatedInfo);
                console.log(`Book with ID ${id} updated successfully.`);
                promptUser(); // Prompt again after updating
            });
        });
    });
};
// Function to delete a book
const deleteBook = () => {
    rl.question('Enter book ID to delete: ', (idInput) => {
        const id = parseInt(idInput);
        library.deleteBook(id);
        console.log(`Book with ID ${id} deleted successfully.`);
        promptUser(); // Prompt again after deletion
    });
};
// Function to search for a book
const searchBooks = () => {
    rl.question('Enter property to search by (title, author, genre): ', (property) => {
        rl.question('Enter search value: ', (value) => {
            library.searchBooks(property, value);
            promptUser(); // Prompt again after searching
        });
    });
};
// Start the prompt
promptUser();
