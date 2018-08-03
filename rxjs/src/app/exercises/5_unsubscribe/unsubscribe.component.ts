import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer, Subscription, Observable } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { takeUntil } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'rxw-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styles: []
})
export class UnsubscribeComponent implements OnInit, OnDestroy {

  logStream$ = new Subject<string | number>();
  destroy$ = new Subject();

  interval$: Observable<number>;

  constructor(private es: ExerciseService) {}

  ngOnInit() {
    const interval$ = timer(0, 1000);
    this.interval$ = interval$;

    interval$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      msg => this.log(msg),
      err => this.log('ERROR: ' + err),
      () => this.log('COMPLETED')
    );
  }

  destroy() {
    this.logStream$.next('DESTROY');
    this.destroy$.next();
  }


  log(msg: string | number) {
    console.log(msg);
    this.logStream$.next(msg);
  }

  ngOnDestroy() {
    this.destroy();
  }

}
