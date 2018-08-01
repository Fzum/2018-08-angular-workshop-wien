import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];

  constructor() { }

  ngOnInit() {
    this.books = [
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

  updateBook(book: Book) {
    // Liste bereinigen
    const filteredList = this.books.filter(b => b.isbn !== book.isbn);

    // neues Buch einfügen // ggf. push() verwenden
    this.books = [...filteredList, book]
      .sort((a, b) => b.rating - a.rating);
  }

  trackBook(index: number, item: Book) {
    return item.isbn;
  }

}