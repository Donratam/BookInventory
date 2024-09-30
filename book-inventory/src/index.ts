// src/index.ts
import { Library } from './library';
import { Book } from './models';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const library = new Library();

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
                        const book: Book = {
                            id: Date.now().toString(), // Use timestamp as a unique string ID
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
        const id = idInput; // Keep ID as string or number as per your design
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
        const id = idInput; // Keep ID as string or number as per your design
        library.deleteBook(id);
        promptUser();
    });
};

const searchBooks = () => {
    rl.question('Enter property to search (title, author, genre): ', (property) => {
        rl.question('Enter value to search: ', (value) => {
            library.searchBooks(property as keyof Book, value);
            promptUser();
        });
    });
};

// Start the application
promptUser();