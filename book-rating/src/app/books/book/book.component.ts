import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book: Book;

  constructor(private rs: BookRatingService) { }

  ngOnInit() {
  }

  getStars() {
    return new Array(this.book.rating);
  }

  rateUp() {
    // TODO: Dashboard informieren!
    this.book = this.rs.rateUp(this.book);
  }

  rateDown() {
    // TODO: Dashboard informieren!
    this.book = this.rs.rateDown(this.book);
  }

}
