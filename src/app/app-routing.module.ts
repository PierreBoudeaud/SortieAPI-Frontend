import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'people', loadChildren: './person/person.module#PersonModule' },
  { path: 'activities', loadChildren: './activity/activity.module#ActivityModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
