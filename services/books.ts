import { apiClient } from '@/utils/api';
import { Book, Genre } from '@/types/api';

export class BookService {
  static async getBooks(filters?: {
    genre?: string;
    ville?: string;
    etat?: string;
    search?: string;
  }): Promise<Book[]> {
    const params = new URLSearchParams();
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.ville) params.append('ville', filters.ville);
    if (filters?.etat) params.append('etat', filters.etat);
    if (filters?.search) params.append('search', filters.search);
    
    const response = await apiClient.get<Book[]>(`/api/books?${params.toString()}`);
    return response.data;
  }

  static async getBook(id: string): Promise<Book> {
    const response = await apiClient.get<Book>(`/api/books/${id}`);
    return response.data;
  }

  static async createBook(bookData: Omit<Book, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Book> {
    const response = await apiClient.post<Book>('/api/books', bookData);
    return response.data;
  }

  static async updateBook(id: string, bookData: Partial<Book>): Promise<Book> {
    const response = await apiClient.put<Book>(`/api/books/${id}`, bookData);
    return response.data;
  }

  static async deleteBook(id: string): Promise<void> {
    await apiClient.delete(`/api/books/${id}`);
  }

  static async getMyBooks(): Promise<Book[]> {
    const response = await apiClient.get<Book[]>('/api/my-books');
    return response.data;
  }

  static async getGenres(): Promise<Genre[]> {
    const response = await apiClient.get<Genre[]>('/api/genres');
    return response.data;
  }

  static async uploadBookImage(bookId: string, imageUri: string): Promise<string> {
    const response = await apiClient.uploadImage(`/api/books/${bookId}/image`, imageUri);
    return response.data.imageUrl;
  }
}