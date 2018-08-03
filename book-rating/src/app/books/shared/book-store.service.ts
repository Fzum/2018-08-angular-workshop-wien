import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Book } from './book';
import { retry, catchError, map } from 'rxjs/operators';
import { BookResponse } from './book-response';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<BookResponse[]>(`${this.apiUrl}/books`).pipe(
      retry(3),
      catchError(err => of([{
        isbn: '',
        title: 'Fehlerbuch',
        description: 'Böser Fehler aufgetreten',
        rating: 1,
        subtitle: ''
      }])),
      map(rawBooks => rawBooks.map(
        rawBook => this.mapToBook(rawBook))
      )
    );
  }
  
  getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookResponse>(`${this.apiUrl}/book/${isbn}`).pipe(
      map(res => this.mapToBook(res))
    );
  }

  create(book: Book): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/book`, book, { responseType: 'text' });
  }

  update(book: Book): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/book`, book, { responseType: 'text' });
  }

  private mapToBook(res: BookResponse): Book {
    return {
      isbn: res.isbn,
      title: res.title,
      description: res.description,
      rating: res.rating
    }
  }

  getAllStatic(): Book[] {
    return [
      {
        isbn: '000',
        title: 'Angular',
        description: 'Grundlagen, fortgeschrittene Techniken',
        rating: 5
      },
      {
        isbn: '111',
        title: 'React',
        description: 'Ein anderes Framework',
        rating: 3
      }
    ];
  }
}
