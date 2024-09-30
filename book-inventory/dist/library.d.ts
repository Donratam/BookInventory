import { Book } from './models';
export declare class Library {
    private inventory;
    constructor();
    addBook(book: Book): void;
    updateBook(id: number | string, updatedInfo: Partial<Book>): void;
    deleteBook(id: number | string): void;
    listBooks(): void;
    searchBooks(property: keyof Book, value: string): void;
}
