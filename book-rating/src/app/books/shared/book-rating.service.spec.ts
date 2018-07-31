import { TestBed, inject } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';

describe('BookRatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookRatingService]
    });
  });

  it('should be created', inject([BookRatingService], (service: BookRatingService) => {
    expect(service).toBeTruthy();
  }));
});
