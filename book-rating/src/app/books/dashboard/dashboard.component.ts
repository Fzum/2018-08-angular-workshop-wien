import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { FormState } from '../shared/form-state.enum';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  createFormState = FormState.Default;

  constructor(private bss: BookStoreService) { }

  ngOnInit() {
    // this.books = this.bss.getAllStatic();  
    this.bss.getAll()
      .subscribe(books => this.books = books);
  }

  createBook(book: Book) {
    this.createFormState = FormState.Submitted;
    this.bss.create(book).subscribe(() => {
      this.books = [...this.books, book]; // oder bestehende updateBook() verwenden
      this.createFormState = FormState.Success;
    },
    () => {
      this.createFormState = FormState.Fail;
    });
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