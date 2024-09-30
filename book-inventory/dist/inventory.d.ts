import { Book } from './models';
export declare class Inventory {
    private books;
    constructor();
    private loadBooks;
    private saveBooks;
    addBook(book: Book): void;
    updateBook(id: number | string, updatedInfo: Partial<Book>): void;
    deleteBook(id: number | string): void;
    listBooks(): void;
    searchBooks(property: keyof Book, value: string): Book[];
}
