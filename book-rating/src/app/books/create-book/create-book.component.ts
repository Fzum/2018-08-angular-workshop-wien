import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { FormState } from '../shared/form-state.enum';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit, OnChanges {

  bookForm: FormGroup;
  @Output() create = new EventEmitter<Book>();
  @Input() state: FormState;

  constructor() { }

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
