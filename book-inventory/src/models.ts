// src/models.ts
export interface Book {
    id: number | string; // Allow id to be either number or string
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
    availability: boolean;
}

export type Genre = 'Fiction' | 'Non-Fiction' | 'Fantasy' | 'Science Fiction' | 'Biography'; // Add as needed
