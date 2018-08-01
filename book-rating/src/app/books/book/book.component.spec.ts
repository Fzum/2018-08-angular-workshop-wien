import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { Book } from '../shared/book';


describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      providers: [BookRatingService]
    })
    .overrideComponent(BookComponent, {
      set: { // Strategy manuell auf default setzen, sonst funktioniert CD nicht
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;

    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 3
    }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward the rateUp call to the rating service', () => {
    const rs = TestBed.get(BookRatingService);
    spyOn(rs, 'rateUp');

    component.rateUp();
    expect(rs.rateUp).toHaveBeenCalled();
  });

  it('should throw "rate" event for rateUp', () => {
    let emittedBook: Book = null;
    
    component.rate.subscribe(book => {
      emittedBook = book;
    });

    component.rateUp();

    expect(emittedBook).not.toBeNull('No emitted book found');
  });

  it('should display the correct rating', () => {
    const ratingBox = fixture.debugElement
      .query(By.css('.testing-rating-box')) // import { By } from '@angular/platform-browser';
      .nativeElement;

    expect(ratingBox.textContent).toBe('3');
    
    // component.book.rating = 5;
    component.book = { ...component.book, rating: 5 };
    fixture.detectChanges();

    expect(ratingBox.textContent).toBe('5');
  });

  it('should call rateUp() when button is clicked', () => {
    spyOn(component, 'rateUp');

    const rateUpBtn = fixture.debugElement
      .query(By.css('button.testing-rate-up-btn'))
      .nativeElement;

    rateUpBtn.click();

    expect(component.rateUp).toHaveBeenCalled();
  });
});





