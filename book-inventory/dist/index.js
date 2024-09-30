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
const library_1 = require("./library");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const library = new library_1.Library();
const promptUser = () => {
    console.log("\nChoose an action:");
    console.log("1. Add Book");
    console.log("2. Update Book");
    console.log("3. Delete Book");
    console.log("4. List Books");
    console.log("5. Search Books");
    console.log("6. Exit");
    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                addBook();
                break;
            case '2':
                updateBook();
                break;
            case '3':
                deleteBook();
                break;
            case '4':
                library.listBooks();
                promptUser();
                break;
            case '5':
                searchBooks();
                break;
            case '6':
                console.log('Exiting the application. Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice, please try again.');
                promptUser();
        }
    });
};
const addBook = () => {
    rl.question('Enter book title: ', (title) => {
        if (!title) {
            console.log("Title cannot be empty.");
            return addBook();
        }
        rl.question('Enter book author: ', (author) => {
            if (!author) {
                console.log("Author cannot be empty.");
                return addBook();
            }
            rl.question('Enter book genre: ', (genre) => {
                rl.question('Enter book published year: ', (yearInput) => {
                    const year = parseInt(yearInput);
                    if (isNaN(year)) {
                        console.log("Invalid year. Please enter a number.");
                        return addBook();
                    }
                    rl.question('Is the book available? (true/false): ', (availabilityInput) => {
                        const availability = availabilityInput.toLowerCase() === 'true';
                        const book = {
                            id: Date.now().toString(),
                            title,
                            author,
                            genre,
                            publishedYear: year,
                            availability,
                        };
                        library.addBook(book);
                        promptUser();
                    });
                });
            });
        });
    });
};
const updateBook = () => {
    rl.question('Enter book ID to update: ', (idInput) => {
        const id = idInput;
        rl.question('Enter updated book title (leave empty to skip): ', (title) => {
            rl.question('Enter updated book author (leave empty to skip): ', (author) => {
                library.updateBook(id, {
                    title: title || undefined,
                    author: author || undefined,
                });
                promptUser();
            });
        });
    });
};
const deleteBook = () => {
    rl.question('Enter book ID to delete: ', (idInput) => {
        const id = idInput;
        library.deleteBook(id);
        promptUser();
    });
};
const searchBooks = () => {
    rl.question('Enter property to search (title, author, genre): ', (property) => {
        rl.question('Enter value to search: ', (value) => {
            library.searchBooks(property, value);
            promptUser();
        });
    });
};
promptUser();
//# sourceMappingURL=index.js.map