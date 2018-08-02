import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'br-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*interval(500).subscribe(
      e => console.log('NEXT', e),
      err => console.error(err),
      () => console.log('COMPLETE')
    );*/


    const obs$ = new Observable((observer) => {
      observer.next('A');
      observer.next('B');
      observer.next('C');

      observer.complete();
    });


    const observer1 = {
      next: e => console.log('NEXT', e),
      error: err => console.error(err),
      complete: () => console.log('COMPLETE')
    }

    // obs$.subscribe(observer1);

    const sub = interval(500).pipe(
      map(e => e + 3),
      filter(e => e % 2 === 0)
    ).subscribe(observer1);

    setTimeout(() => sub.unsubscribe(), 4000);


  }

}
