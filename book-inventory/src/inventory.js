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
exports.Inventory = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DATA_FILE = path.join(__dirname, 'books.json');
class Inventory {
    constructor() {
        this.books = [];
        this.loadBooks();
    }
    loadBooks() {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            this.books = JSON.parse(data);
        }
    }
    saveBooks() {
        fs.writeFileSync(DATA_FILE, JSON.stringify(this.books, null, 2));
    }
    addBook(book) {
        this.books.push(book);
        this.saveBooks();
    }
    updateBook(id, updatedInfo) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = Object.assign(Object.assign({}, this.books[index]), updatedInfo);
            this.saveBooks();
        }
        else {
            console.log(`Book with ID ${id} not found.`);
        }
    }
    deleteBook(id) {
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
    searchBooks(property, value) {
        const results = this.books.filter(book => book[property].toString().toLowerCase().includes(value.toLowerCase()));
        return results;
    }
}
exports.Inventory = Inventory;
