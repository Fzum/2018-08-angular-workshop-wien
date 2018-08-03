import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { FormState } from '../shared/form-state.enum';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { BookStoreService } from '../shared/book-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit, OnChanges {

  bookForm: FormGroup;
  @Output() create = new EventEmitter<Book>();
  @Input() state: FormState;

  results$: Observable<string[]>;

  constructor(private bss: BookStoreService) { }

  ngOnChanges() {
    switch(this.state) {
      case FormState.Success: {
        alert('SUCCESS');
        this.resetForm();
        break;
      }

      case FormState.Fail: {
        alert('FAIL :-(');
        break;
      }
    }
  }

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


    this.results$ = this.bookForm.get('title').valueChanges.pipe(
      filter(title => title.length > 3),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(title => this.bss.search(title)),
      map(books => books.map(book => book.title))
    );

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
  
  resetForm() {
    this.bookForm.reset({
      isbn: '',
      title: '',
      description: ''
    });
  }

}
