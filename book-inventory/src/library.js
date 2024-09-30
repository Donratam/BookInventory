"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
// src/library.ts
const inventory_1 = require("./inventory");
class Library {
    constructor() {
        this.inventory = new inventory_1.Inventory();
    }
    addBook(book) {
        this.inventory.addBook(book);
    }
    updateBook(id, updatedInfo) {
        this.inventory.updateBook(id, updatedInfo);
    }
    deleteBook(id) {
        this.inventory.deleteBook(id);
    }
    listBooks() {
        this.inventory.listBooks();
    }
    searchBooks(property, value) {
        const results = this.inventory.searchBooks(property, value);
        if (results.length > 0) {
            results.forEach(book => {
                console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Published Year: ${book.publishedYear}, Availability: ${book.availability}`);
            });
        }
        else {
            console.log(`No books found for the search criteria: ${value}`);
        }
    }
}
exports.Library = Library;
