export interface Book {
    id: number | string;
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
    availability: boolean;
}
export type Genre = 'Fiction' | 'Non-Fiction' | 'Fantasy' | 'Science Fiction' | 'Biography';
