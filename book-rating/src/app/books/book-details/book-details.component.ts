import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$: Observable<Book>;

  constructor(private route: ActivatedRoute, private bss: BookStoreService) { }

  ngOnInit() {
    // Synchroner Weg:
    // this.isbn = this.route.snapshot.paramMap.get('isbn');
    
    // Asynchroner Weg:
    
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      switchMap(isbn => this.bss.getSingle(isbn))
    );
  }

}
