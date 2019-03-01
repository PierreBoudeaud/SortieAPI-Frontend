import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcursionListComponent } from './excursion-list/excursion-list.component';
import { ExcursionShowComponent } from './excursion-show/excursion-show.component';
import { ExcursionCreateEditComponent } from './excursion-create-edit/excursion-create-edit.component';

const routes: Routes = [
  { path: 'list', component: ExcursionListComponent },
  { path: 'new', component: ExcursionCreateEditComponent },
  { path: 'edit/:id', component: ExcursionCreateEditComponent },
  { path: ':id', component: ExcursionShowComponent },
  { path: '**', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExcursionRoutingModule { }
