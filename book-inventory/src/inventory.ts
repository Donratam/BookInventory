// src/inventory.ts
import { Book } from './models';
import * as fs from 'fs';
import * as path from 'path';

const DATA_FILE = path.join(__dirname, 'books.json');

export class Inventory {
    private books: Book[] = [];

    constructor() {
        this.loadBooks();
    }

    private loadBooks() {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            this.books = JSON.parse(data);
        }
    }

    private saveBooks() {
        fs.writeFileSync(DATA_FILE, JSON.stringify(this.books, null, 2));
    }

    addBook(book: Book) {
        this.books.push(book);
        this.saveBooks();
    }

    updateBook(id: number | string, updatedInfo: Partial<Book>) { // Accept id as number or string
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = { ...this.books[index], ...updatedInfo };
            this.saveBooks();
        } else {
            console.log(`Book with ID ${id} not found.`);
        }
    }

    deleteBook(id: number | string) { // Accept id as number or string
        this.books = this.books.filter(book => book.id !== id);
        this.saveBooks();
    }

    listBooks() {
        if (this.books.length === 0) {
            console.log("No books in inventory.");
            return;
        }
        console.log("Books in Inventory:");
        this.books.forEach(book => {
            console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Published Year: ${book.publishedYear}, Availability: ${book.availability}`);
        });
    }

    searchBooks(property: keyof Book, value: string) {
        const results = this.books.filter(book => book[property].toString().toLowerCase().includes(value.toLowerCase()));
        return results;
    }
}
