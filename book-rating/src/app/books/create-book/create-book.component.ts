import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;
  @Output() create = new EventEmitter<Book>();

  constructor() { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('')
    });
  }

  logForm() {
    console.log(this.bookForm);
  }

  submitForm() {
    const value = this.bookForm.value;
    const newBook: Book = {
      isbn: value.isbn,
      title: value.title,
      description: value.description,
      rating: 1
    }

    this.create.emit(newBook);
  }

}
