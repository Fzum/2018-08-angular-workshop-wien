import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'book/:isbn', component: BookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
