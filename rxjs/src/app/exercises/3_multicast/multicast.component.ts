import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { MeasureValuesService } from './measure-values.service';
import { share } from 'rxjs/operators';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
  styles: []
})
export class MulticastComponent implements OnInit {

  measureValues$: ReplaySubject<number>;


  listeners = [];
  logStream$ = new Subject();

  constructor(private mvs: MeasureValuesService) { }

  ngOnInit() {
    /*******************************/

    this.measureValues$ = new ReplaySubject(5);
    this.mvs.getValues().subscribe(this.measureValues$);

    // für BehaviorSubject
    // this.measureValues$.value

    // nur Observable (nur Datenstrom) ausgeben
    // this.measureValues$.asObservable()

    /*const sub$ = new Subject();
    sub$.next('Hallo');
    
    sub$.subscribe(e => console.log('A', e));
    sub$.subscribe(e => console.log('B', e));
    sub$.subscribe(e => console.log('C', e));
    
    sub$.next('Hallo 2');*/


    // Variante 1: Share
    /*this.measureValues$ = this.mvs.getValues().pipe(
      share()
    );*/

    /*******************************/
  }

  addListener() {
    this.listeners.push(this.mvs.generateRandomString(5));
  }

  addConsoleListener() {
    const randomString = this.mvs.generateRandomString(5);
    // this.measureValues$.subscribe(e => console.log(randomString, e));
    this.measureValues$.subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

}
