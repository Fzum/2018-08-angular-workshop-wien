import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { MapOperator } from '../../../../node_modules/rxjs/internal/operators/map';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './fromevent.component.html',
  styles: []
})
export class FromeventComponent implements OnInit {

  currentWidth: number = 0;

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map((e: any) => e.currentTarget.innerWidth),
      startWith(window.innerWidth),
    ).subscribe(width => this.currentWidth = width);
  }

}
