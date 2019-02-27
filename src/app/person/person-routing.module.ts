import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { PersonCreateEditComponent } from './person-create-edit/person-create-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: PersonListComponent },
  { path: 'new', component: PersonCreateEditComponent },
  { path: ':id', component: PersonCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
