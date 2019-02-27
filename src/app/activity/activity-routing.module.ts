import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateEditComponent } from './activity-create-edit/activity-create-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: ActivityListComponent },
  { path: 'new', component: ActivityCreateEditComponent },
  { path: ':id', component: ActivityCreateEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
