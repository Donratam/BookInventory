// src/library.ts
import { Inventory } from './inventory';
import { Book } from './models';

export class Library {
    private inventory: Inventory;

    constructor() {
        this.inventory = new Inventory();
    }

    addBook(book: Book) {
        this.inventory.addBook(book);
        console.log(`Book "${book.title}" added to the inventory.`);
    }

    updateBook(id: number | string, updatedInfo: Partial<Book>) { // Allow id to be number or string
        this.inventory.updateBook(id, updatedInfo);
        console.log(`Book with ID ${id} updated.`);
    }

    deleteBook(id: number | string) { // Allow id to be number or string
        this.inventory.deleteBook(id);
        console.log(`Attempted to delete book with ID ${id}.`);
    }

    listBooks() {
        this.inventory.listBooks(); // This already handles printing
    }

    searchBooks(property: keyof Book, value: string) {
        const results = this.inventory.searchBooks(property, value);
        if (results.length > 0) {
            results.forEach(book => {
                console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Published Year: ${book.publishedYear}, Availability: ${book.availability}`);
            });
        } else {
            console.log(`No books found for the search criteria: ${value}`);
        }
    }
}
