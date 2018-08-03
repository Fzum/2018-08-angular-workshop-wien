import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Book } from './book';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`).pipe(
      retry(3),
      catchError(err => of([{
        isbn: '',
        title: 'Fehlerbuch',
        description: 'Böser Fehler aufgetreten',
        rating: 1
      }]))
    );
    // TODO: Mappen auf echtes Book
  }
  
  getSingle(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/book/${isbn}`);
    // TODO: Mappen auf echtes Book
  }

  create(book: Book): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/book`, book, { responseType: 'text' });
  }

  update(book: Book): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/book`, book, { responseType: 'text' });
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
