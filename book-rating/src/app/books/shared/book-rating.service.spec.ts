import { TestBed, inject } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let book: Book;
  let rs: BookRatingService;

  beforeEach(() => {
    book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3
    }
  });
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookRatingService]
    });

    rs = TestBed.get(BookRatingService);
  });

  it('should be created', inject([BookRatingService], (service: BookRatingService) => {
    expect(service).toBeTruthy();
  }));

  it('should rate up a book by 1', () => {
    const ratedBook = rs.rateUp(book);
    expect(ratedBook.rating).toBe(4);
    // expect(ratedBook.rating).toBe(book.rating + 1);
  });

  it('should rate down a book by 1', () => {
    const ratedBook = rs.rateDown(book);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not be allowed to rate higher than 5', () => {
    book.rating = 5;
    const ratedBook = rs.rateUp(book);
    expect(ratedBook.rating).toBe(5);
  });
  
  it('should not be allowed to rate lower than 1', () => {
    book.rating = 1;
    const ratedBook = rs.rateDown(book);
    expect(ratedBook.rating).toBe(1);
  });

  it('should return a new book', () => {
    const ratedBook = rs.rateUp(book);
    expect(ratedBook).not.toBe(book);
    expect(book.rating).toBe(3);
  });
});